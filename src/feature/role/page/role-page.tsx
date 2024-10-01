import React, { useEffect, useState } from "react";
import {
  Button,
  Spin,
  Table,
  Modal,
  Tooltip,
  TableColumnsType,
  Input,
  PaginationProps,
} from "antd";
import { DoubleRightOutlined, DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import {
  useCreateRolePermissionsMutation,
  useLazyGetPermissionsQuery,
  useLazyGetRolePermissionsQuery,
  useLazyGetRolesQuery,
  useRemoveRolePermissionsMutation,
} from "../store/role.query";
import { Role } from "../../../models/role.model";
import { CollectionQuery } from "../../../models/collection.model";
import Card from "../../../shared/component/Card/card-component";
import { Permission } from "../../../models/permission.model";
import { debounce } from "lodash-es";

function RolePage() {
  const [getPermissions, permissions] = useLazyGetPermissionsQuery();
  const [createRolePermission, createResponse] =
    useCreateRolePermissionsMutation();

  const [getRoles, roles] = useLazyGetRolesQuery();
  const [removeRolePermission, removeResponse] =
    useRemoveRolePermissionsMutation();

  const [checkedPermissions, setCheckedPermissions] = useState<any>();
  const [checkedPermissionKeys, setCheckedPermissionKeys] = useState<any>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [permissionModalOpen, setPermissionModalOpen] =
    useState<boolean>(false);
  const [getRolePermissions, rolePermissions] =
    useLazyGetRolePermissionsQuery();
  const [getCheckedRolePermissions, checkedRolePermissions] =
    useLazyGetRolePermissionsQuery();

  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
  });
  const [collectionRequest, setCollectionRequest] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
  });

  const onPermissionSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: Permission[]
  ) => {
    setCheckedPermissionKeys(newSelectedRowKeys);
    const selectedKeys = selectedRows?.map((permission) => permission?.id);
    setCheckedPermissions(selectedKeys);
  };

  const permissionRowSelection = {
    selectedRowKeys: checkedPermissionKeys,
    onChange: onPermissionSelectChange,
  };

  const permissionAssignment = () => {
    createRolePermission({
      roleId: selectedRole?.id,
      permissions: checkedPermissions,
    });
  };

  useEffect(() => {
    getRoles({
      skip: 0,
      orderBy: [{ field: "name", direction: "asc" }],
      filter: [[{ field: "protected", value: false, operator: "=" }]],
    });
  }, [getRoles]);

  useEffect(() => {
    getPermissions(collection);
    async function getRoleData() {
      const role = await getRoles({
        skip: 0,
        orderBy: [{ field: "name", direction: "asc" }],
        filter: [[{ field: "protected", value: false, operator: "=" }]],
      });
      if (role.data && !selectedRole) {
        setSelectedRole(role.data?.data[0]);
      }
    }
    getRoleData();
  }, [collection]);
  useEffect(() => {
    if (selectedRole) {
      getCheckedRolePermissions({
        roleId: selectedRole?.id,
      }).then((response: any) => {
        if (response?.data) {
          const selectedPermissionList = response?.data?.data?.map(
            (permission: Permission) => {
              return permission.key;
            }
          );
          setCheckedPermissionKeys(selectedPermissionList);
        }
      });
    }
  }, [selectedRole]);

  useEffect(() => {
    if (selectedRole) {
      getRolePermissions({
        roleId: selectedRole?.id,
        collection: collectionRequest,
      }).then((response) => {
        if (response?.data) {
          //
        }
      });
    }
  }, [selectedRole, collectionRequest]);

  const title = (
    <div className="w-full h-12 items-center px-4 bg-primary text-white flex  space-x-4 justify-between">
      <div>Permissions</div>
      <div>
        <Button
          icon={<DoubleRightOutlined />}
          onClick={() => setPermissionModalOpen(true)}
          className="bg-primary border text-white border-white"
        >
          Assign
        </Button>
      </div>
    </div>
  );

  const roleDataSource = roles?.data?.data?.map((role, index) => ({
    key: index.toString(),
    role: role.name,
  }));

  const roleColumns: TableColumnsType<any> = [
    {
      title: <span className="bg-primary w-full inline-block ">Role</span>,
      dataIndex: "role",
      key: "role",
      onCell: (record, rowIndex) => {
        return {
          className: `cursor-pointer hover:bg-primary hover:text-white ${
            record.role === selectedRole?.name ? "bg-primary text-white" : ""
          }`,
        };
      },
    },
  ];
  const permissionModalColumns: ColumnsType<Permission> = [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const permissionColumns: ColumnsType<Permission> = [
    {
      title: <span className="inline-block w-full"> {title}</span>,
      dataIndex: "name",
      key: "name",
    },

    {
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      align: "right",
      render: (_, record) => {
        return (
          <Tooltip className="text-danger" placement="right" title="delete">
            <Button
              onClick={() => {
                onDeletePermissions(record);
              }}
              icon={<DeleteOutlined />}
              loading={
                removeResponse?.isLoading &&
                record.id === removeResponse?.originalArgs?.permissionId
              }
              color={"red"}
            />
          </Tooltip>
        );
      },
    },
  ];

  const onDeletePermissions = (record: any) => {
    removeRolePermission({
      roleId: selectedRole?.id,
      permissionId: record?.id,
    });
  };

  function filterRoles(key: number) {
    return roles.data?.data?.find((role, index) => index == key);
  }
  const handleRowClick = (record: any) => {
    return setSelectedRole(filterRoles(record?.key));

    //  we can add more functions here if they are callable while row click
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    const after = (current - 1) * pageSize;
    setCollection({
      ...collection,
      skip: after,
      top: pageSize,
    });
  };
  const onShowSizeChangeForEachRole: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    const after = (current - 1) * pageSize;
    setCollectionRequest({
      ...collectionRequest,
      skip: after,
      top: pageSize,
    });
  };
  const paginationConfig = {
    total: rolePermissions?.data?.count,
    showLessItems: true,
    // pageSize: 10, // Initial number of items per page
    pageSizeOptions: ["10", "20", "30", "50"], // Options for the user to choose from
    showSizeChanger: true,
    onChange: onShowSizeChangeForEachRole,
    showTotal: (total: number, range: any) =>
      `${range[0]}-${range[1]} of ${total} Permissions`,
  };
  const modalPaginationConfig = {
    total: permissions?.data?.count,
    showLessItems: true,
    // pageSize: 10, // Initial number of items per page
    pageSizeOptions: ["10", "20", "30", "50"], // Options for the user to choose from
    showSizeChanger: true,
    onChange: onShowSizeChange,
    showTotal: (total: number, range: any) =>
      `${range[0]}-${range[1]} of ${total} Permissions`,
  };
  const handleSearch = debounce((key: string) => {
    setCollection({
      ...collection,
      search: key,
      searchFrom: ["name", "key"],
    });
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };
  return (
    <div className="m-4">
      <Card
        title={"Add Permission to roles"}
        classNames={{ header: "w-full bg-primary text-white", body: "" }}
      >
        <div className="w-full flex justify-center space-x-8 py-4 px-14">
          <div className="w-full h-full">
            <div className="w-full h-12 items-center px-4 bg-primary border-b-4 text-white flex  space-x-4 justify-between">
              Role
            </div>
            <Table
              pagination={false}
              loading={roles.isLoading}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              dataSource={roleDataSource}
              columns={roleColumns}
              showHeader={false}
            />
          </div>
          <div className="w-full border">
            <div className="border-b-4">{title}</div>
            <Table
              loading={
                rolePermissions?.isLoading || rolePermissions?.isFetching
              }
              columns={permissionColumns}
              dataSource={rolePermissions?.data?.data ?? undefined}
              showHeader={false}
              pagination={paginationConfig}
            />
          </div>

          <Modal
            title="Permission Assignment"
            open={permissionModalOpen}
            onCancel={() => {
              setPermissionModalOpen(false);
            }}
            footer={[]}
          >
            <div className="flex-col p-2 space-y-2">
              <div className="flex space-x-2">
                <Input.Search onChange={handleChange} />
              </div>
              <Spin
                spinning={permissions?.isLoading || permissions?.isFetching}
              >
                <div className="overflow-y-auto max-h-80">
                  <Table
                    loading={createResponse?.isLoading}
                    rowSelection={permissionRowSelection}
                    columns={permissionModalColumns}
                    dataSource={permissions?.data?.data}
                    pagination={false}
                  />
                </div>
              </Spin>
              <div className="flex justify-end items-center">
                <Button
                  type="primary"
                  className="bg-primary text-white rounded shadow-none border border-white hover:shadow-lg"
                  htmlType="button"
                  // icon={<KeyOutlined />}
                  loading={createResponse?.isLoading}
                  onClick={() => {
                    createRolePermission({
                      roleId: selectedRole?.id,
                      permissions: checkedPermissions,
                    }).then((response) => {
                      if (response) {
                        setPermissionModalOpen(false);
                      }
                    });
                  }}
                >
                  Assign
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </Card>
    </div>
  );
}

export default RolePage;
