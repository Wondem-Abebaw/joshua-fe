import React, { useContext, useEffect, useState } from "react";
import { Image, Menu, Spin } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  NotificationOutlined,
  SolutionOutlined,
  FundOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import AuthContext from "../../shared/auth/context/authContext";

const SideNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate
  const [selectedKey, setSelectedKey] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const sideItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/">Dashboard</Link>,
      children: [
        // {
        //   key: "home",
        //   label: <Link to="/">Main</Link>,
        // },
        // {
        //   key: "dashboard/employee",
        //   label: <Link to="/dashboard/employee">Employee</Link>,
        // },
        // {
        //   key: "dashboard/employer",
        //   label: <Link to="/dashboard/employer">Employer</Link>,
        // },
        // {
        //   key: "dashboard/job",
        //   label: <Link to="/dashboard/job">Jobs</Link>,
        // },
      ],
    },

    {
      key: "room",
      icon: <SolutionOutlined />,
      label: <Link to="/room">Rooms</Link>,
    },

    {
      key: "notification",
      icon: <NotificationOutlined />,
      label: <Link to="/notification">Notifications</Link>,
    },

    {
      key: "activity",
      icon: <FundOutlined />,
      label: <Link to="/activity">Activities</Link>,
    },
    {
      key: "feedback",
      icon: <InboxOutlined />,
      label: <Link to="/feedback">Feedbacks</Link>,
    },
    {
      key: "Usermanagement",
      icon: <UserOutlined />,
      label: "User Management",
      children: [
        {
          key: "user",
          label: <Link to="/user">Users</Link>,
        },
        {
          key: "role-management",
          label: <Link to="/role-management">Role and Permission</Link>,
        },
      ],
    },
    {
      key: "configuration",
      icon: <SettingOutlined />,
      label: <Link to="/configuration">Configuration</Link>,
    },
  ];

  function filterItemsByUser() {
    if (user?.role?.key !== "super_admin") {
      return sideItems.filter(
        (item) =>
          item?.key !== "Usermanagement" && item?.key !== "configuration"
      );
    } else return sideItems;
  }

  useEffect(() => {
    const currentPath =
      location.pathname.split("/")[1] == "dashboard"
        ? `${location.pathname.split("/")[1]}/${
            location.pathname.split("/")[2]
          }`
        : location.pathname.split("/")[1];

    setSelectedKey(currentPath === "" ? "home" : currentPath);
  }, [location]);

  return (
    <>
      <div
        style={{ height: "50px" }}
        className="logo py-1 mb-8 flex justify-center items-center "
      >
        <Image
          preview={false}
          className={`transition duration-300 ease-in-out ${
            collapsed ? "mt-4" : "mt-4 h-12"
          }`}
          src="/vintage.svg"
        />
      </div>
      {user?.role?.key === null || user?.role?.key === undefined ? (
        <div className="w-full h-full flex justify-center items-center ">
          <Spin />
        </div>
      ) : (
        <Menu
          mode="inline"
          className="pt-7"
          theme="dark"
          selectedKeys={[selectedKey]}
          onSelect={(selectInfo) => setSelectedKey(selectInfo.key)}
          items={filterItemsByUser().map((item) => {
            if (item.children) {
              return {
                ...item,
                children: item.children.map((subItem) => ({
                  ...subItem,
                  className:
                    selectedKey === subItem.key ? "bg-primary text-white" : "",
                })),
              };
            }
            return {
              ...item,
              className:
                selectedKey === item.key ? "bg-primary text-white" : "",
            };
          })}
        />
      )}
    </>
  );
};

export default SideNav;
