/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { ContextProvider } from "@/lib/MyContextProvider";
import { ConfigProvider, Drawer, Layout, Menu, Space, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext, useState, useEffect, useRef } from "react";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoClose, IoMenu, IoNotificationsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineAnalytics } from "react-icons/md";
import { PiStarThin } from "react-icons/pi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const context = useContext(ContextProvider);
  const windowWidth = context ? context.windowWidth : 0;
  const isSmallScreen = windowWidth < 1024;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activeKey, setActiveKey] = useState("");
  const menuList = [
    {
      key: "1",
      icon: <RxDashboard size={25} className="text-text-light" />,
      label: (
        <Link href={"/dashboard"}>
          <span
            className={`${
              activeKey === "1" ? "text-white font-bold" : "text-text-light"
            }`}
          >
            Dashboard
          </span>
        </Link>
      ),
    },
    {
      key: "2",
      icon: <MdOutlineAnalytics size={25} />,
      label: (
        <Link href={"/dashboard/test"}>
          <span
            className={`${
              activeKey === "2" ? "text-white font-bold" : "text-text-light"
            }`}
          >
            Tests
          </span>
        </Link>
      ),
    },
    {
      key: "3",
      icon: <RiShoppingBag3Line size={25} />,
      label: (
        <Link href={"/dashboard/purchase-history"}>
          <span
            className={`${
              activeKey === "3" ? "text-white font-bold" : "text-text-light"
            }`}
          >
            Purchase History
          </span>
        </Link>
      ),
    },
    {
      key: "4",
      icon: <BsPerson size={25} />,
      label: (
        <Link href={"/dashboard/profile"}>
          <span
            className={`${
              activeKey === "4" ? "text-white font-bold" : "text-text-light"
            }`}
          >
            Profile
          </span>
        </Link>
      ),
    },
    {
      key: "5",
      icon: <PiStarThin size={25} />,
      label: (
        <Link href={"/dashboard/feedback"}>
          <span
            className={`${
              activeKey === "5" ? "text-white font-bold" : "text-text-light"
            }`}
          >
            Feedback
          </span>
        </Link>
      ),
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: { key: string }) => {
    setActiveKey(e.key);
  };

  const handleSubmit = async (formData: any, reset: any) => {
    console.log(formData, reset);
    // Add your logic for form submission here
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* mobile menu start */}
      <>
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setIsShowDrawer(false)}
          open={isShowDrawer}
          closeIcon={false}
          extra={
            <Space>
              <button onClick={() => setIsShowDrawer(false)}>
                <IoClose className="hover:text-red-500 " size={25} />
              </button>
            </Space>
          }
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemSelectedBg: "#2280EE",
                  itemSelectedColor: "white",
                  itemHeight: 50,
                },
              },
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[activeKey]}
              onClick={handleMenuClick}
              items={menuList}
              className="!border-none"
            />
          </ConfigProvider>
        </Drawer>
      </>
      {/* mobile menu end */}
      <Layout className="h-[calc(100vh-0px)] ">
        <Header className="bg-white flex items-center justify-between px-3 lg:px-6 py-3 lg:py-0 h-fit">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <div className="flex items-center gap-6">
              {isSmallScreen && (
                <button onClick={() => setIsShowDrawer(true)}>
                  <IoMenu size={22} />
                </button>
              )}
              <h4 className="text-[16px] md:text-[20px] font-semibold whitespace-nowrap">
                Hamnat-Probetest.de
              </h4>
              <h4 className="text-[24px] font-semibold hidden lg:block">
                Dashboard
              </h4>
            </div>

            <div className="flex flex-wrap-reverse items-center justify-between gap-4">
              <MyFormWrapper onSubmit={handleSubmit}>
                <div className="w-full relative">
                  <MyFormInput
                    name={"search"}
                    placeHolder="Search test..."
                    inputClassName="ps-8"
                  />
                  <BiSearch
                    size={20}
                    type="submit"
                    className="absolute top-[10px] left-2 text-text-light"
                  />
                </div>
              </MyFormWrapper>

              <div className="flex items-center gap-4">
                <button
                  className="relative  hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <IoNotificationsOutline className="h-7 w-7 text-gray-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-colors"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                      <Image
                        height={100}
                        width={100}
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <MdKeyboardArrowDown className="h-5 w-5 text-gray-600" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                      <div className="flex items-center gap-3 mx-3 border-b border-dashed cursor-pointer">
                        <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                          <Image
                            height={100}
                            width={100}
                            src="/placeholder.svg?height=32&width=32"
                            alt="User avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium">Martin De</h3>
                      </div>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiUser className="h-4 w-4 text-blue-primary" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <BiLogOut className="h-4 w-4 text-blue-primary" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <div className="bg-white lg:border-t-[1px] lg:pt-9 overflow-hidden overflow-y-auto slim-scroll">
            {!isSmallScreen && (
              <Sider
                trigger={null}
                collapsible
                className="!bg-white"
                width={280}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        itemSelectedBg: "#2280EE",
                        itemSelectedColor: "white",
                        itemHeight: 50,
                      },
                    },
                  }}
                >
                  <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[activeKey]}
                    onClick={handleMenuClick}
                    items={menuList}
                  />
                </ConfigProvider>
              </Sider>
            )}
          </div>

          <Content
            style={{
              margin: "16px 16px",
              padding: 24,
              // minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="overflow-hidden overflow-y-auto w-full h-[calc(100vh-92px)]"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
