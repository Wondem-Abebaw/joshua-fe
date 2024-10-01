import { useState, useEffect, useContext } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown } from "antd";
import { useDispatch } from "react-redux";

import {
  useLazyGetUserRolePermissionsQuery,
  useLazyGetUserRolesQuery,
} from "../../feature/user/store/user.query";
import { Role } from "../../models/role.model";
import AuthContext from "../../shared/auth/context/authContext";
import { switchRole } from "../../shared/auth/api/auth.api";
import { Link } from "react-router-dom";
import { setRole } from "../../shared/auth/auth-slice/auth-slice";
const HeaderNav = () => {
  const dispatch = useDispatch();

  const { user, logOut } = useContext(AuthContext);
  const [currentRole, setCurrentRole] = useState<Role>();
  const [getUserRoles, userRoles] = useLazyGetUserRolesQuery();
  const [getUserRolePermissions, userRolePermissions] =
    useLazyGetUserRolePermissionsQuery();

  const validateJson = () => {
    if (localStorage?.currentRole) {
      try {
        return JSON.parse(localStorage.currentRole)?.id;
      } catch (e) {
        return null;
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "role",
      label: (
        <div className="flex-col space-y-4">
          {userRoles?.data?.data?.map((role: Role, index) => (
            <div
              onClick={() => {
                setCurrentRole(role);
                switchRole(role?.id);
                localStorage.setItem("currentRole", JSON.stringify(role));
              }}
              className={`px-2 rounded ${
                currentRole?.id === role?.id ? "bg-primary text-white" : ""
              }`}
              key={index}
            >
              {role?.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "1",
      icon: <EditOutlined />,
      label: (
        <Link to="/accounts/change-password">
          <span>Change Password</span>
        </Link>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: (
        <button onClick={() => logOut()}>
          <span>Sign Out</span>
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (user?.id) {
      getUserRoles(user?.id, true).then((response) => {
        if (response) {
          if (
            localStorage.currentRole &&
            response?.data?.data?.some((role) => role.id === validateJson())
          ) {
            setCurrentRole(JSON.parse(localStorage?.currentRole));
          } else {
            setCurrentRole(response?.data?.data?.[0]);
            localStorage.setItem(
              "currentRole",
              JSON.stringify(response?.data?.data?.[0])
            );
          }
        }
      });
    }
  }, [user, getUserRoles]);
  useEffect(() => {
    if (currentRole?.id) {
      dispatch(setRole(currentRole));
      getUserRolePermissions({
        roleId: currentRole?.id,
        accountId: user?.id,
      }).then((response) => {
        if (response) {
          localStorage.setItem(
            "userRolePermissions",
            JSON.stringify(response?.data)
          );
        }
      });
    }
  }, [currentRole, getUserRolePermissions, user?.id]);
  return (
    <>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow
        className="bg-primary p-1 rounded-full text-xl"
      >
        <UserOutlined className="text-xl" />
      </Dropdown>
      <span className="cursor-pointer">{user.name}</span>
    </>
  );
};

export default HeaderNav;
