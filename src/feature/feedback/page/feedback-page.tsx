import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Feedback } from "../../../models/feedback.model";
import { CollectionQuery, Order } from "../../../models/collection.model";
import {
  EntityConfig,
  entityViewMode,
} from "../../../models/entity-config.model";
import EntityList from "../../../shared/component/entity-list/entity-list.component";
import {
  useDeleteFeedbackMutation,
  useLazyGetFeedbacksQuery,
  useReviewFeedbackMutation,
} from "../store/feedback.query";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button, Popover, Tooltip, Typography } from "antd";
import { feedbackSubjects } from "../../../shared/constants/enum/feedback-subjects.enum";
import Confirmation from "../../../shared/component/confirmation/action-confirmation";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { CredentialType } from "../../../shared/constants/enum/credentialType.enum";
import FeedbackNotificationModalComponenet from "../componenet/notification-modal-component";

export default function FeedbackPage() {
  const params = useParams();
  const [check, setCheck] = useState(false);
  const [viewMode, setViewMode] = useState<entityViewMode>("list");
  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  const [getFeedbacks, Feedbacks] = useLazyGetFeedbacksQuery();
  const [deleteFeedbacks, deleteResponse] = useDeleteFeedbackMutation();
  const [completeFeedbacks, completeResponse] = useReviewFeedbackMutation();
  const onArchivedChecked = (e: CheckboxChangeEvent) => {
    setCollection({ ...collection, withArchived: e.target.checked });
  };

  useEffect(() => {
    getFeedbacks(collection);
  }, [collection]);

  useEffect(() => {
    if (params?.id !== undefined) {
      setViewMode("detail");
    } else {
      setViewMode("list");
    }
  }, [setViewMode, params?.id, location]);
  const descriptionContent = (eachFeedback: Feedback) => (
    <div style={{ width: "400px" }}>{eachFeedback?.description}</div>
  );
  const data: Feedback[] | undefined = Feedbacks.data?.data;
  const config: EntityConfig<Feedback> = {
    primaryColumn: { key: "name", name: "Name" },
    showDetail: false,
    rootUrl: "/feedback",
    identity: "id",

    visibleColumn: [
      { key: "name", name: "Name" },
      { key: "phoneNumber", name: "phone Number", hideSort: true },
      {
        key: "userType",
        name: "Type",
        hideSort: true,
        render: (eachFeedback: Feedback) => {
          return (
            <>
              {eachFeedback?.userType === CredentialType.EmployeeUser
                ? "Employee"
                : eachFeedback?.userType === CredentialType.Employer
                ? "Employer"
                : "--"}
            </>
          );
        },
      },
      { key: "subject", name: "Subject", hideSort: true },
      {
        key: "description",
        name: "description",
        hideSort: true,
        render: (eachFeedback: Feedback) => {
          return (
            <>
              {(eachFeedback?.description &&
                eachFeedback?.description !== null) ||
              eachFeedback?.description?.length !== 0 ? (
                <Popover
                  content={descriptionContent(eachFeedback)}
                  title={"Description"}
                  placement="bottom"
                >
                  <Typography.Text className="cursor-pointer flex items-center text-xs">
                    {eachFeedback?.description &&
                    eachFeedback?.description?.length > 25
                      ? eachFeedback?.description?.substring(0, 22) + "..."
                      : eachFeedback?.description}
                  </Typography.Text>
                </Popover>
              ) : (
                "--"
              )}
            </>
          );
        },
      },
      { key: "isReviewed", name: "Is Reviewed" },
      { key: "createdAt", name: "Received At", isDate: true },
      {
        key: "id",
        name: "Actions",
        hideSort: true,
        render: (value: Feedback) => {
          return (
            <div className="flex space-x-2">
              <FeedbackNotificationModalComponenet
                receiverId={value?.customerId ?? ""}
              />
              {value?.isReviewed === false ? (
                <Confirmation
                  type={"notify"}
                  message={"Are you sure you want to complete it?"}
                  onYes={() => completeFeedbacks(`${value?.id}`)}
                  header={`Complete Confirmation `}
                >
                  <Tooltip title={<span className="text-sm">Complete</span>}>
                    {" "}
                    <Button
                      size="small"
                      type="primary"
                      className={
                        " text-white text-xs flex  items-center justify-center"
                      }
                      htmlType="button"
                      loading={
                        completeResponse?.isLoading &&
                        completeResponse?.originalArgs === value.id
                      }
                      icon={<CheckOutlined />}
                    ></Button>
                  </Tooltip>
                </Confirmation>
              ) : (
                ""
              )}
              <Confirmation
                type={"danger"}
                message={"Are you sure you want to delete it permanently?"}
                onYes={() => deleteFeedbacks(`${value?.id}`)}
                header={`Permanent Delete Confirmation `}
              >
                <Tooltip title={<span className="text-sm">Delete</span>}>
                  {" "}
                  <Button
                    size="small"
                    type="primary"
                    className={
                      "bg-danger text-white text-xs flex  items-center justify-center"
                    }
                    htmlType="button"
                    loading={
                      deleteResponse?.isLoading &&
                      deleteResponse?.originalArgs === value.id
                    }
                    icon={<DeleteOutlined />}
                  ></Button>
                </Tooltip>
              </Confirmation>
            </div>
          );
        },
      },
    ],
    filter: [
      [
        {
          field: "subject",
          value: feedbackSubjects.thankYou,
          operator: "=",
          name: feedbackSubjects.thankYou,
        },
        {
          field: "subject",
          value: feedbackSubjects.compliant,
          operator: "=",
          name: feedbackSubjects.compliant,
        },
        {
          field: "subject",
          value: feedbackSubjects.appCrush,
          operator: "=",
          name: feedbackSubjects.appCrush,
        },
        {
          field: "subject",
          value: feedbackSubjects.other,
          operator: "=",
          name: feedbackSubjects.other,
        },
      ],
      [
        {
          field: "userType",
          value: CredentialType.EmployeeUser,
          operator: "=",
          name: "Employee",
        },
        {
          field: "userType",
          value: CredentialType.Employer,
          operator: "=",
          name: "Employer",
        },
      ],
      [
        { field: "isReviewed", value: true, operator: "=", name: "Reviewed" },
        {
          field: "isReviewed",
          value: false,
          operator: "=",
          name: "unreviewed",
        },
      ],
    ],
  };

  return (
    <div className="flex">
      <EntityList
        showArchived={false}
        parentStyle="w-full"
        viewMode={viewMode}
        check={check}
        title={"Feedbacks"}
        tableKey="Feedback"
        showNewButton={false}
        showSelector={false}
        total={Feedbacks?.data?.count}
        collectionQuery={collection}
        itemsLoading={Feedbacks?.isLoading || Feedbacks?.isFetching}
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
