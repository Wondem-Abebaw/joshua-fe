import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { Button, Modal, Popover, Tooltip, Typography } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { Notification } from "../../../models/notification.model";
import EntityList from "../../../shared/component/entity-list/entity-list.component";
import { Constants } from "../../../shared/constants/constant";

import {
  useArchiveNotificationMutation,
  useDeleteNotificationMutation,
  useLazyGetNotificationsQuery,
  useRestoreNotificationMutation,
} from "../store/notification.query";
import { useParams } from "react-router-dom";
import {
  EntityConfig,
  entityViewMode,
} from "../../../models/entity-config.model";
import { CollectionQuery, Order } from "../../../models/collection.model";
import NewNotificationComponent from "../component/new-notification-component";
import {
  DeleteOutlined,
  SendOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import Confirmation from "../../../shared/component/confirmation/action-confirmation";
import SharedNewNotificationComponent from "../../../shared/component/notification/component/new-notification-component";
import { CredentialType } from "../../../shared/constants/enum/credentialType.enum";

export default function NotificationListPage() {
  //react-router-hooks
  const params = useParams();

  //Component states
  const [check, setCheck] = useState(false);
  const [viewMode, setViewMode] = useState<entityViewMode>("list");
  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
    orderBy: [{ field: "createdAt", direction: "desc" }],
    includes: ["accountReceiver"],
  });

  //Rtk hooks
  const [getNotifications, allNotifications] = useLazyGetNotificationsQuery();
  const [archiveNotification, archiveResponse] =
    useArchiveNotificationMutation();
  const [restoreNotification, restoreResponse] =
    useRestoreNotificationMutation();
  const [deleteNotification, deleteResponse] = useDeleteNotificationMutation();

  const onArchivedChecked = (e: CheckboxChangeEvent) => {
    setCollection({ ...collection, withArchived: e.target.checked });
  };

  useEffect(() => {
    getNotifications(collection);
  }, [collection]);

  useEffect(() => {
    if (params?.id !== undefined) {
      setViewMode("detail");
    } else {
      setViewMode("list");
    }
  }, [setViewMode, params?.id]);
  const descriptionContent = (eachNotification: Notification) => (
    <div style={{ width: "400px" }}>{eachNotification?.body}</div>
  );

  const config: EntityConfig<Notification> = {
    primaryColumn: {
      key: "title",
      name: "Title",
      render: (eachNotification: Notification) => {
        return (
          <div className="flex space-x-1 items-center">
            <span>{`${eachNotification?.title ?? ""}`}</span>
          </div>
        );
      },
      hideSort: true,
    },
    rootUrl: "/notification",
    identity: "id",
    showDetail: false,
    visibleColumn: [
      {
        key: "title",
        name: "Title",
        render: (eachNotification: Notification) => {
          return (
            <div className="flex space-x-1 items-center">
              <span
                className={
                  eachNotification.deletedAt &&
                  "bg-danger p-1  text-white rounded-lg"
                }
              >{`${eachNotification?.title ?? ""} 
              `}</span>
            </div>
          );
        },
        hideSort: true,
      },
      {
        key: "description",
        name: "description",
        hideSort: true,
        render: (eachNotification: Notification) => {
          return (
            <Popover
              content={descriptionContent(eachNotification)}
              title={eachNotification?.title}
              placement="bottom"
            >
              <Typography.Text className="cursor-pointer flex items-center text-xs">
                {eachNotification?.body && eachNotification?.body?.length > 25
                  ? eachNotification?.body?.substring(0, 22) + "..."
                  : eachNotification?.body}
              </Typography.Text>
            </Popover>
          );
        },
      },
      {
        key: "type",
        name: "Sent To",
        render: (eachNotification: Notification) => (
          <Typography.Text className="flex items-center text-xs">
            {eachNotification?.receiver !== null ? (
              <span>
                {eachNotification.accountReceiver?.name ?? "Archived User"}
                {eachNotification.accountReceiver?.phoneNumber &&
                  ` (${eachNotification.accountReceiver?.phoneNumber})`}
              </span>
            ) : eachNotification?.type === "employer" ? (
              <>
                {" "}
                <span>
                  {eachNotification?.isCompany === "all"
                    ? "All "
                    : eachNotification?.isCompany === "true"
                    ? "Company "
                    : "Individual "}
                </span>
                <span className="pl-1">Employers</span>
              </>
            ) : eachNotification?.type === "all" ? (
              <span>{"All"}</span>
            ) : eachNotification?.type === CredentialType.EmployeeUser ? (
              <span>
                {eachNotification.employmentType === "all"
                  ? "All Employees"
                  : `${eachNotification.employmentType} ${eachNotification.employmentStatus} Employees`}
              </span>
            ) : (
              "---"
            )}
          </Typography.Text>
        ),
        hideSort: true,
      },
      {
        key: "createdAt",
        name: "created At",
        isDate: true,
      },
      {
        key: "id",
        name: "Actions",
        hideSort: true,
        render: (value: Notification) => {
          return (
            <>
              <div className="flex space-x-1">
                {value?.deletedAt ? (
                  <>
                    {/* //////////////restore/////////////////// */}

                    <Confirmation
                      header={"Restore Confirmation"}
                      message={"Are you sure you want to restore it?"}
                      type={"notify"}
                      onYes={() => restoreNotification(`${value?.id}`)}
                    >
                      <Tooltip title="Restore">
                        <Button
                          size="small"
                          type="primary"
                          className={
                            "bg-green-500 flex items-center justify-center"
                          }
                          htmlType="button"
                          loading={
                            restoreResponse?.isLoading &&
                            restoreResponse?.originalArgs === value.id
                          }
                          icon={<RollbackOutlined />}
                          style={{ padding: "4px 8px", fontSize: "10px" }}
                        ></Button>
                      </Tooltip>
                    </Confirmation>

                    {/* /////////delete permanently/////////// */}

                    <Confirmation
                      type={"danger"}
                      message={
                        "Are you sure you want to delete it permanently?"
                      }
                      onYes={() =>
                        deleteNotification(`${value?.id}`).then((response) => {
                          if (response) {
                            // navigate(-1);
                          }
                        })
                      }
                      header={`Permanent Delete Confirmation `}
                    >
                      <Tooltip title="Delete">
                        {" "}
                        <Button
                          size="small"
                          type="primary"
                          className={
                            "bg-danger text-white flex  items-center justify-center"
                          }
                          htmlType="button"
                          loading={
                            deleteResponse?.isLoading &&
                            deleteResponse?.originalArgs === value.id
                          }
                          icon={<DeleteOutlined />}
                          style={{ padding: "4px 8px", fontSize: "10px" }}
                        ></Button>
                      </Tooltip>
                    </Confirmation>
                  </>
                ) : (
                  <>
                    <NotificationModalComponenet value={value} />
                    <Confirmation
                      message="Archive Notification"
                      type="danger"
                      header="Choose a reason to archive this notification"
                      result={"single"}
                      resultRequired={true}
                      selectorLabel={"Please select a reason"}
                      labelDescription={
                        "Why are you archiving this notification?"
                      }
                      options={Constants.ArchiveReason.map((reason) => {
                        return { label: reason, value: reason };
                      })}
                      customInput={true}
                      yesText="Archive"
                      onYes={(data: string) => {
                        archiveNotification({
                          id: `${value.id}`,
                          reason: data,
                        });
                      }}
                    >
                      <Tooltip title="Archive">
                        {" "}
                        <Button
                          size="small"
                          type="primary"
                          className="text-white bg-danger shadow-none rounded flex items-center justify-center"
                          htmlType="button"
                          loading={
                            archiveResponse?.isLoading &&
                            archiveResponse?.originalArgs?.id === value?.id
                          }
                          icon={<DeleteOutlined />}
                          style={{ padding: "4px 8px", fontSize: "10px" }}
                        ></Button>
                      </Tooltip>
                    </Confirmation>
                  </>
                )}
              </div>
            </>
          );
        },
      },
    ],
  };

  const data = allNotifications?.data?.data;
  return (
    <div className="flex">
      <EntityList
        header={<NotificationModalComponenet />}
        parentStyle="w-full"
        viewMode={viewMode}
        check={check}
        title={"Notifications"}
        tableKey="notification"
        showNewButton={false}
        showSelector={false}
        total={allNotifications?.data?.count}
        collectionQuery={collection}
        itemsLoading={
          allNotifications?.isLoading || allNotifications?.isFetching
        }
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
              searchFrom: [
                "title",
                "accountReceiver.name",
                "accountReceiver.phoneNumber",
              ],
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

interface Props {
  value?: Notification;
}
export function NotificationModalComponenet(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {props?.value ? (
        <Tooltip title="Resend">
          <Button
            size="small"
            type="primary"
            className="shadow-none rounded flex items-center justify-center"
            onClick={showModal}
            style={{ padding: "4px 8px", fontSize: "10px" }}
            icon={<SendOutlined />}
          ></Button>
        </Tooltip>
      ) : (
        <Button
          type="primary"
          onClick={showModal}
          icon={<NotificationOutlined />}
        >
          New Notification
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[]}
      >
        {props?.value?.receiver ? (
          <SharedNewNotificationComponent
            editMode="detail"
            notificationData={props?.value}
            handleCancel={handleCancel}
          />
        ) : props?.value?.type ? (
          <NewNotificationComponent
            editMode="detail"
            notificationData={props?.value}
            handleCancel={handleCancel}
          />
        ) : (
          <NewNotificationComponent
            editMode="new"
            handleCancel={handleCancel}
          />
        )}
      </Modal>
    </>
  );
}
