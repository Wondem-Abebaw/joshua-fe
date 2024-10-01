import {
  Table,
  Button,
  Spin,
  Space,
  Modal,
  Input,
  ConfigProvider,
  Tooltip,
  PaginationProps,
} from "antd";
import {
  DeleteOutlined,
  KeyOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash-es";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionQuery } from "../../../models/collection.model";
import { Permission } from "../../../models/permission.model";
import { Role } from "../../../models/role.model";
import {
  useAddAccountRolePermissionsMutation,
  useAddRoleToAccountMutation,
  useLazyGetRolePermissionsListQuery,
  useLazyGetRolesQuery,
  useLazyGetUserRolePermissionsQuery,
  useLazyGetUserRolesQuery,
  useRemoveAccountRoleMutation,
} from "../store/user.query";
import { ColumnsType } from "antd/es/table";

const UserRoleComponent = () => {
  const params = useParams();
  const [selectedRoleKeys, setSelectedRoleKeys] = useState<React.Key[]>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [hoverdRole, setHoveredRole] = useState<Role>();
  const [roleModalOpen, setRoleModalOpen] = useState<boolean>(false);
  const [checkedPermissions, setCheckedPermissions] = useState<
    (string | undefined)[]
  >([]);
  const [collectionQuery, setCollectionQuery] = useState<CollectionQuery>({
    skip: 0,
    filter: [[{ field: "protected", value: false, operator: "=" }]],
  });
  const [permissionCollection, setPermissionCollection] =
    useState<CollectionQuery>({
      skip: 0,
    });
  const [getRoles, roles] = useLazyGetRolesQuery();
  const [getUserRoles, userRoles] = useLazyGetUserRolesQuery();
  const [addRoleToAccount, addRoleResponse] = useAddRoleToAccountMutation();
  const [removeAccountRole, removeAccountRoleResponse] =
    useRemoveAccountRoleMutation();
  const [getRolePermissions, rolePermissions] =
    useLazyGetRolePermissionsListQuery();
  const [getUserRolePermissions, userRolePermissions] =
    useLazyGetUserRolePermissionsQuery();
  const [addAccountRolePermission, addPermissionResponse] =
    useAddAccountRolePermissionsMutation();

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  //   current,
  //   pageSize
  // ) => {
  //   const after = (current - 1) * pageSize;
  //   setPermissionCollection({
  //     ...permissionCollection,
  //     skip: after,
  //     top: pageSize,
  //   });
  // };
  const onlyUnAssignedRoles = roles?.data?.data.filter((role) => {
    return (
      !userRoles?.data?.data?.find((userRole) => {
        return userRole.id === role.id;
      }) && role.name !== "Super Admin"
    );
  });
  useEffect(() => {
    getRoles(collectionQuery);
  }, [collectionQuery, addRoleToAccount, getRoles]);

  useEffect(() => {
    getUserRoles(`${params.id}`).then((response) => {
      if (response?.data?.data) {
        const keys = response.data.data.map((role) => {
          return role?.key;
        });
        setSelectedRoleKeys(keys);
        setSelectedRole(response?.data?.data[0]);
      }
    });
    return () => {
      // console.log("component  unmount");
      // setSelectedRoleKeys([]);
    };
  }, [params?.id, addRoleToAccount, getUserRoles]);

  useEffect(() => {
    if (selectedRole) {
      getRolePermissions({
        collection: permissionCollection,
        roleId: selectedRole?.id,
      });
    }
  }, [
    selectedRole,
    addRoleToAccount,
    permissionCollection,
    getRolePermissions,
    removeAccountRole,
  ]);

  useEffect(() => {
    if (selectedRole?.id) {
      getUserRolePermissions({
        roleId: selectedRole?.id,
        accountId: `${params.id}`,
      }).then((permissions) => {
        if (permissions?.data) {
          const checked = permissions?.data?.map((permission: Permission) => {
            return permission?.id;
          });
          // console.log(
          //   "🚀 ~ file: user-role-component.tsx:96 ~ checked ~ checked:",
          //   checked
          // );

          setCheckedPermissions(checked);
        }
      });
    }
  }, [selectedRole, getUserRolePermissions, addRoleToAccount, params?.id]);
  // const permmissionsPaginationConfig = {
  //   total: rolePermissions?.data?.count,
  //   showLessItems: true,
  //   // pageSize: 10, // Initial number of items per page
  //   pageSizeOptions: ["10", "20", "30", "50"], // Options for the user to choose from
  //   showSizeChanger: true,
  //   onChange: onShowSizeChange,
  //   showTotal: (total: number, range: any) =>
  //     `${range[0]}-${range[1]} of ${total} Permissions`,
  // };
  const onPermissionSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: Permission[]
  ) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    const selectedPermissionKeys = selectedRows?.map(
      (permission) => permission?.id
    );

    setCheckedPermissions(selectedPermissionKeys);
  };

  const permissionRowSelection = {
    selectedRowKeys: checkedPermissions,
    onChange: onPermissionSelectChange,
  };

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: Role[]
  ) => {
    const UserPreviousRole: string[] = [];
    userRoles?.data?.data.map((item) => UserPreviousRole.push(item.id));
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    // console.log("user previous role", UserPreviousRole);

    const selectedKeys = selectedRows?.map((role) => role?.id);
    setSelectedRoleKeys([...selectedKeys, ...UserPreviousRole]);
  };

  const rowSelection = {
    selectedRoleKeys,
    onChange: onSelectChange,
  };

  const permissionColumns: ColumnsType<Permission> = [
    {
      title: "Permission",
      dataIndex: "name",
      key: "id",
    },
  ];

  const roleModalColumns: ColumnsType<Role> = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const roleColumns: ColumnsType<Role> = [
    {
      title: <span className="bg-primary w-full inline-block ">Role</span>,
      dataIndex: "name",
      key: "name",
      onCell: (record, rowIndex) => {
        return {
          className: `cursor-pointer hover:bg-primary_light hover:text-white ${
            record.name === selectedRole?.name ? "bg-primary text-white" : ""
          }`,
          onClick: () => {
            setSelectedRole(record);
          },
        };
      },
    },
    {
      dataIndex: "action",
      key: "action",
      fixed: "right",
      //className: "bg-primary",
      width: 20,
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex justify-between">
            <Tooltip className="text-danger" placement="right" title={`Delete`}>
              <Button
                className={` cursor-pointer hover:bg-primary hover:text-white  `}
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDeletePermissions(record);
                }}
                loading={
                  removeAccountRoleResponse?.isLoading &&
                  record.id === removeAccountRoleResponse?.originalArgs?.roleId
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const onDeletePermissions = (record: any) => {
    removeAccountRole({
      roleId: record?.id,
      accountId: params?.id,
    });
    // if (record?.id === selectedRole?.id) {
    //   console.log("form delete ldslf sdf");
    //   // Reset permissions if the deleted role is the currently selected role
    //   setCheckedPermissions([]);
    //   setSelectedRole(undefined); // Or set to a default/initial state if preferred
    // }
  };
  const onRoleAssignment = () => {
    if (selectedRoleKeys && selectedRoleKeys?.length > 0) {
      // console.log("selected role keys from onRoleAssignment", selectedRoleKeys);
      // console.log("user previous role form onRoleAssignemt", roles.key);
      addRoleToAccount({
        accountId: `${params.id}`,
        roles: selectedRoleKeys,
      }).then((response: any) => {
        if (response?.data) {
          setRoleModalOpen(false);
        }
      });
    }
  };

  return (
    <div className="w-full flex space-x-4 p-4">
      <div className="w-2/4 h-full">
        <div className="w-full h-12 items-center px-4 bg-primary border-b-4 text-white flex  space-x-4 justify-between">
          <div>Role</div>
          <Button
            onClick={() => setRoleModalOpen(true)}
            className="bg-primary border-white hover:bg-white text-white hover:text-primary"
          >
            <Space>
              <PlusOutlined className="" />
              Add Role
            </Space>
          </Button>
        </div>
        <Table
          pagination={false}
          loading={roles.isLoading}
          rowClassName={(record) =>
            `${record.name === selectedRole?.name && "bg-primary "}${
              record.name === hoverdRole?.name && "bg-primary "
            }`
          }
          //hover:bg-primary
          dataSource={userRoles?.data?.data ?? undefined}
          columns={roleColumns}
          showHeader={false}
        />
      </div>
      <div className="w-full h-full border">
        {rolePermissions?.isLoading ? (
          <Spin />
        ) : (
          <>
            <div className="flex-col p-2 space-y-2">
              <div className="flex space-x-2">
                <Input.Search
                  onSearch={debounce((key: string) => {
                    setPermissionCollection({
                      ...permissionCollection,
                      search: key,
                      searchFrom: ["name"],
                    });
                  }, 1000)}
                />{" "}
                <div>
                  <Button
                    type="primary"
                    className="bg-primary text-white rounded shadow-none border border-white hover:shadow-lg"
                    htmlType="button"
                    icon={<KeyOutlined />}
                    onClick={() => {
                      addAccountRolePermission({
                        roleId: selectedRole?.id,
                        permissions: checkedPermissions,
                        accountId: `${params.id}`,
                      });
                    }}
                    loading={addPermissionResponse?.isLoading}
                  >
                    Assign
                  </Button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-80">
                {" "}
                <Table
                  // @ts-ignore
                  rowSelection={permissionRowSelection}
                  loading={
                    rolePermissions?.isLoading ||
                    rolePermissions?.isFetching ||
                    addPermissionResponse?.isLoading
                  }
                  columns={permissionColumns}
                  dataSource={rolePermissions?.data?.data}
                  // @ts-ignore
                  rowKey={(record) => record.id}
                  pagination={false}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              /* here is your component tokens */
            },
          },
        }}
      >
        <Modal
          title="Role Assignment"
          open={roleModalOpen}
          // onOk={() => onRoleAssignment()}
          okType="primary"
          okButtonProps={{ className: "bg-blue-500" }}
          onCancel={() => {
            setRoleModalOpen(false);
          }}
          footer={[
            <div className="flex items-center justify-end">
              <Button
                type="primary"
                className="bg-primary text-white rounded shadow-none border border-white  hover:shadow-2xl"
                htmlType="button"
                icon={<SaveOutlined />}
                onClick={() => {
                  onRoleAssignment();
                }}
                disabled={
                  onlyUnAssignedRoles && onlyUnAssignedRoles?.length < 1
                }
                loading={addRoleResponse?.isLoading}
              >
                Ok
              </Button>
            </div>,
          ]}
        >
          <Table
            loading={addRoleResponse?.isLoading}
            rowSelection={rowSelection}
            columns={roleModalColumns}
            dataSource={onlyUnAssignedRoles}
            pagination={false}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};
export default UserRoleComponent;
