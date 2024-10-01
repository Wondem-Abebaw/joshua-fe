import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { User } from "../../../models/user.model";
import EntityList from "../../../shared/component/entity-list/entity-list.component";
import { useLazyGetUsersQuery } from "../store/user.query";
import { useParams } from "react-router-dom";
import {
  EntityConfig,
  entityViewMode,
} from "../../../models/entity-config.model";
import { CollectionQuery, Order } from "../../../models/collection.model";

export default function UserListPage() {
  //react-router-hooks
  const params = useParams();

  //Component states
  const [check, setCheck] = useState(false);
  const [viewMode, setViewMode] = useState<entityViewMode>("list");
  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  //Rtk hooks
  const [getUsers, users] = useLazyGetUsersQuery();

  const onArchivedChecked = (e: CheckboxChangeEvent) => {
    setCollection({ ...collection, withArchived: e.target.checked });
  };

  useEffect(() => {
    getUsers({
      ...collection,
      filter: [
        [
          {
            field: "id",
            value: JSON.parse(localStorage?.userInfo).id,
            operator: "!=",
          },
        ],
      ],
    });
  }, [collection]);

  useEffect(() => {
    if (params?.id !== undefined) {
      setViewMode("detail");
    } else {
      setViewMode("list");
    }
  }, [setViewMode, params?.id]);

  const config: EntityConfig<User> = {
    primaryColumn: {
      key: "name",
      name: "name",
      render: (user: User) => {
        return (
          <div className="flex space-x-1 items-center">
            <span>{`${user?.name ?? ""}`}</span>
          </div>
        );
      },
    },
    rootUrl: "/user",
    identity: "id",
    visibleColumn: [
      {
        key: "name",
        name: "name",
        render: (user: User) => {
          return (
            <div className="flex space-x-1 items-center">
              <span
                className={
                  user.deletedAt && "bg-danger p-1  text-white rounded-lg"
                }
              >{`${user?.name ?? ""} 
              `}</span>
            </div>
          );
        },
      },
      {
        key: "email",
        name: "Email",
        hideSort: true,
      },

      { key: "phoneNumber", name: "Phone", hideSort: true },
      { key: "gender", name: "Gender", hideSort: true },
      {
        key: ["emergencyContact", "phoneNumber"],
        name: "Emergency Contact",
        hideSort: true,
        render: (eachUser: User) => {
          return (
            <div className="flex space-x-1 items-center">
              <span>
                {eachUser?.emergencyContact?.name &&
                  eachUser?.emergencyContact?.name}
                {eachUser?.emergencyContact?.phoneNumber &&
                  `(${eachUser.emergencyContact?.phoneNumber})`}
              </span>
            </div>
          );
        },
      },
      {
        key: "createdAt",
        name: "Registered At",
        isDate: true,
      },

      {
        key: "enabled",
        name: "Status",
      },
    ],
    filter: [
      [
        { field: "gender", value: "male", operator: "=", name: "Male" },
        { field: "gender", value: "female", operator: "=", name: "Female" },
      ],
      [
        { field: "enabled", value: true, operator: "=", name: "Active" },
        { field: "enabled", value: false, operator: "=", name: "InActive" },
      ],
    ],
  };

  const data = users?.data?.data;

  return (
    <div className="flex">
      <EntityList
        parentStyle="w-full"
        viewMode={viewMode}
        check={check}
        title={"Users"}
        tableKey="user"
        newButtonText="New User"
        showSelector={false}
        total={users?.data?.count}
        collectionQuery={collection}
        itemsLoading={users?.isLoading || users?.isFetching}
        config={config}
        items={data}
        initialPage={1}
        onShowArchived={(e) => onArchivedChecked(e)}
        defaultPageSize={collection.top}
        pageSize={[10, 20, 50]}
        onShowSelector={(e) => setCheck(e)}
        onPaginationChange={(skip: number, top: number) => {
          const after = (skip - 1) * top;
          setCollection({ ...collection, skip: after, top: top });
        }}
        onSearch={(data: any) => {
          if (data === "") {
            setCollection({
              ...collection,
              search: "",
              searchFrom: [],
            });
          } else {
            setCollection({
              ...collection,
              skip: 0,
              search: data,
              searchFrom: ["name", "phoneNumber"],
            });
          }
        }}
        onFilterChange={(data: any) => {
          if (collection?.filter || data.length > 0) {
            setCollection({ ...collection, filter: data });
          }
        }}
        onOrder={(data: Order) =>
          setCollection({ ...collection, orderBy: [data] })
        }
      />
    </div>
  );
}
