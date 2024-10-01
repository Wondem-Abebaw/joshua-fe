import { Timeline, Tooltip, Spin, Typography, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  PlusSquareOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Collection } from "../../../models/collection.model";
import { Activity } from "../../../models/activity.model";
import dateFormat from "dateformat";

interface ActivityLogProps {
  displayLog: boolean;
  setDisplayLog: Function;
  activities?: Collection<Activity>;
  loading?: boolean;
  item?: any;
}
const { Text } = Typography;
const ActivityLog = (props: ActivityLogProps) => {
  return props.displayLog ? (
    <div className="w-72 border px-2">
      <div className="h-12 border-0 border-b flex items-center justify-between mb-2 w-full">
        <div className="h-full flex dark:text-white items-center font-semibold ">
          Activity Logger
        </div>
        <div>
          <Tooltip title={<span className="text-xs">Close logger</span>}>
            <span onClick={() => props.setDisplayLog(false)}>
              <CloseOutlined size={15} />
            </span>
          </Tooltip>
        </div>
      </div>
      {props.item && (
        <Timeline>
          {props.loading && (
            <Timeline.Item>
              <div className={"h-32 w-full"}>
                <Spin className={"mx-auto my-10"} />
              </div>
            </Timeline.Item>
          )}
          {props.activities?.data?.map((activity) => (
            <Timeline.Item
              key={activity.id}
              color={(() => {
                switch (activity.action) {
                  case "Create":
                    return "green";
                  case "Update":
                    return "green";
                  case "Archive":
                    return "red";
                  case "Activate":
                    return "green";
                  case "Block":
                    return "gray";
                  default:
                    return "green";
                }
              })()}
              dot={(() => {
                switch (activity.action) {
                  case "Create":
                    return <PlusSquareOutlined />;
                  case "Update":
                    return <EditOutlined />;
                  case "Archive":
                    return <DeleteOutlined />;
                  case "Activate":
                    return <CheckOutlined />;
                  case "Block":
                    return <StopOutlined />;
                  default:
                    return <HistoryOutlined />;
                }
              })()}
            >
              <Space direction="vertical" size={0.3}>
                <Text strong>{activity.action}</Text>
                <Text type="secondary">
                  {activity.action === "Block"
                    ? `${activity.action}ed by `
                    : `${activity.action}d by `}
                  <Text type="secondary">{activity?.user?.name}</Text>
                </Text>
                <Text>
                  {dateFormat(activity?.createdAt, "ddd, mmm d, yyyy, h:MM TT")}
                </Text>
              </Space>
            </Timeline.Item>
          ))}
          {props.item.data.deletedAt && (
            <Timeline.Item color="red" dot={<DeleteOutlined />}>
              <Space direction="vertical" size={0.3}>
                <Text type="secondary">
                  <Text type="secondary">
                    {" "}
                    Deleted by {props.item.data?.user?.name}
                  </Text>
                </Text>
                <Text>
                  {dateFormat(
                    props.item.data?.deletedAt,
                    "ddd, mmm d, yyyy, h:MM TT"
                  )}
                </Text>
              </Space>
            </Timeline.Item>
          )}
        </Timeline>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ActivityLog;
