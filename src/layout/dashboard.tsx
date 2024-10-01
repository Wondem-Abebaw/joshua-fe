import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Spin, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderNav from "./component/header.component";
import { useSelector } from "react-redux";
import { RootState } from "../store/app.store";
import SideNav from "./component/side-nav.component";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isLoading = useSelector(
    (state: RootState) => state.authReducer.loading
  );
  ////////////----theme-----////////
  const themeClass = useSelector(
    (state: RootState) => state.themeReducer.class
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen flex">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        className="h-screen overflow-auto"
        width={227}
      >
        <SideNav />
      </Sider>
      <Layout className="site-layout overflow-auto">
        <Header style={{ padding: 10, height: "58px" }} className="text-white">
          <div className="flex h-full w-full justify-between items-center">
            <div className="ml-2">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger ",
                  onClick: () => setCollapsed(!collapsed),
                  style: { fontSize: "20px" },
                }
              )}
            </div>

            <div className="pr-2 flex  items-center space-x-5">
              <HeaderNav />
              {/* <span className="cursor-pointer" onClick={() => logOut()}>
                {user.name}Sign out
              </span> */}
            </div>
          </div>
        </Header>
        <Content
          className={`overflow-auto my-3 mx-2 px-2 pb-6 pt-1 ${
            themeClass === "dark" && "dark"
          } `}
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {isLoading === true ? (
            <Spin>
              <Outlet />
            </Spin>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
