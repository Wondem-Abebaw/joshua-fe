import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Activity } from "../../../models/activity.model";
import { CollectionQuery, Order } from "../../../models/collection.model";
import {
  EntityConfig,
  entityViewMode,
} from "../../../models/entity-config.model";
import EntityList from "../../../shared/component/entity-list/entity-list.component";
import { useLazyGetActivitiesQuery } from "../store/activity.query";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useLazyGetAccountsQuery } from "../../../shared/store/query/sharedQuery";
import { User } from "../../../models/user.model";

export default function ActivityPage() {
  const params = useParams();
  const [check, setCheck] = useState(false);
  const [viewMode, setViewMode] = useState<entityViewMode>("list");
  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  const [accountsCollection, setAccountsCollection] = useState<CollectionQuery>(
    {
      orderBy: [{ field: "createdAt", direction: "desc" }],
    }
  );
  const [getActivities, activities] = useLazyGetActivitiesQuery();
  const [getAccounts, accountsresponse] = useLazyGetAccountsQuery();
  const onArchivedChecked = (e: CheckboxChangeEvent) => {
    setCollection({ ...collection, withArchived: e.target.checked });
  };

  useEffect(() => {
    getActivities(collection);
  }, [collection]);

  useEffect(() => {
    if (params?.id !== undefined) {
      setViewMode("detail");
    } else {
      setViewMode("list");
    }
  }, [setViewMode, params?.id, location]);

  const data: Activity[] | undefined = activities.data?.data;
  const config: EntityConfig<Activity> = {
    primaryColumn: { key: "action", name: "Action" },
    showDetail: false,
    rootUrl: "/activity",
    identity: "id",

    visibleColumn: [
      {
        key: "action",
        name: "Action",
        render: (action: Activity) => {
          return (
            <div
              className={
                action.deletedAt && "bg-danger p-1  text-white rounded-lg"
              }
            >
              <span>{`${action?.action ?? ""} 
              `}</span>
            </div>
          );
        },
      },
      { key: ["user", "name"], name: "Done By", hideSort: true },
      { key: "modelName", name: "Acted On" },
      { key: "createdAt", name: "Date/Time", isDate: true },
    ],
  };

  return (
    <div className="flex">
      <EntityList
        showArchived={false}
        parentStyle="w-full"
        viewMode={viewMode}
        check={check}
        title={"Activities"}
        tableKey="activity"
        showNewButton={false}
        showSelector={false}
        total={activities?.data?.count}
        collectionQuery={collection}
        itemsLoading={activities?.isLoading || activities?.isFetching}
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
          getAccounts({
            searchFrom: ["name", "phoneNumber"],
            search: data,
          }).then((response: any) => {
            const f: any = [];
            response?.data?.data?.map((r: User) => {
              f.push(r.id);
            });
            if (f && f.length > 0) {
              setCollection({
                ...collection,
                skip: 0,
                filter: [[{ field: "userId", operator: "in", value: f }]],
              });
            } else {
              setCollection({
                ...collection,
                filter: [
                  [
                    {
                      field: "modelName",
                      operator: "=",
                      value: "000000000000000000",
                    },
                  ],
                ],
              });
            }
          });
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
