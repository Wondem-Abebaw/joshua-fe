import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";

import { Room } from "../../../models/room.model";
import EntityList from "../../../shared/component/entity-list/entity-list.component";

import { useLazyGetRoomsQuery } from "../store/room.query";
import { useParams } from "react-router-dom";
import {
  EntityConfig,
  entityViewMode,
} from "../../../models/entity-config.model";
import { CollectionQuery, Order } from "../../../models/collection.model";

export default function RoomListPage() {
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
  const [getRooms, allRooms] = useLazyGetRoomsQuery();

  const onArchivedChecked = (e: CheckboxChangeEvent) => {
    setCollection({ ...collection, withArchived: e.target.checked });
  };

  useEffect(() => {
    getRooms(collection);
  }, [collection]);

  useEffect(() => {
    if (params?.id !== undefined) {
      setViewMode("detail");
    } else {
      setViewMode("list");
    }
  }, [setViewMode, params?.id]);

  const config: EntityConfig<Room> = {
    primaryColumn: {
      key: "name",
      name: "Name",
      render: (eachRoom: Room) => {
        return (
          <div className="flex space-x-1 items-center">
            <span>{`${eachRoom?.name ?? ""}`}</span>
          </div>
        );
      },
    },
    rootUrl: "/room",
    identity: "id",
    visibleColumn: [
      {
        key: "name",
        name: "Name",
        render: (eachRoom: Room) => {
          return (
            <div className="flex space-x-1 items-center">
              <span
                className={eachRoom.deletedAt && "text-danger p-1  rounded-lg"}
              >{`${eachRoom?.name ?? ""} 
              `}</span>
            </div>
          );
        },
      },
      {
        key: "price",
        name: "price",
        hideSort: true,
      },
      {
        key: "description",
        name: "Description",
        hideSort: true,
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
        { field: "enabled", value: true, operator: "=", name: "Active" },
        { field: "enabled", value: false, operator: "=", name: "InActive" },
      ],
    ],
  };

  const data = allRooms?.data?.data;

  return (
    <div className="flex">
      <EntityList
        parentStyle="w-full"
        viewMode={viewMode}
        check={check}
        title={"Rooms"}
        tableKey="Room"
        newButtonText="New Room"
        showSelector={false}
        total={allRooms?.data?.count}
        collectionQuery={collection}
        itemsLoading={allRooms?.isLoading || allRooms?.isFetching}
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
              searchFrom: ["name"],
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
