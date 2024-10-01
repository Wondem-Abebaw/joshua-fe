import { ReactElement, useState } from "react";
import { Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import Card from "../Card/card-component";
import ActivityLog from "./activityLog.component";
import { useLazyGetActivitiesQuery } from "../../store/query/sharedQuery";
interface WrapperProps {
  title: string | ReactElement;
  className?: string;
  classNames?: { header: string; body: string };
  children: any;
  path: string;
  id: string;
  item: any;
}
const ActivityLogWrapperComponent = (props: WrapperProps) => {
  const { title, className, classNames, children, path, id, item } = props;
  const location = useLocation();
  const [getActivities, activities] = useLazyGetActivitiesQuery();
  const [displayLog, setDisplayLog] = useState<boolean>(false);
  const actions = location.pathname === path && (
    <div className="flex items-center justify-end">
      <Tooltip title={<span className="text-xs">Activity logger</span>}>
        <span
          onClick={() => {
            setDisplayLog(true);
            getActivities({
              orderBy: [{ field: "createdAt", direction: "desc" }],
              filter: [[{ field: "modelId", value: id, operator: "=" }]],
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 fill-current dark:fill-white"
            viewBox="0 0 16 16"
          >
            <path d="M7.5 1C6.851563 1 6.300781 1.421875 6.09375 2L3.5 2C2.675781 2 2 2.675781 2 3.5L2 12.5C2 13.324219 2.675781 14 3.5 14L11.5 14C12.324219 14 13 13.324219 13 12.5L13 3.5C13 2.675781 12.324219 2 11.5 2L8.90625 2C8.699219 1.421875 8.148438 1 7.5 1 Z M 7.5 2C7.78125 2 8 2.21875 8 2.5L8 3L9 3L9 4L6 4L6 3L7 3L7 2.5C7 2.21875 7.21875 2 7.5 2 Z M 3.5 3L5 3L5 5L10 5L10 3L11.5 3C11.78125 3 12 3.21875 12 3.5L12 12.5C12 12.78125 11.78125 13 11.5 13L3.5 13C3.21875 13 3 12.78125 3 12.5L3 3.5C3 3.21875 3.21875 3 3.5 3 Z M 4 7L4 8L5 8L5 7 Z M 6 7L6 8L11 8L11 7 Z M 4 10L4 11L5 11L5 10 Z M 6 10L6 11L11 11L11 10Z" />
          </svg>
        </span>
      </Tooltip>
    </div>
  );
  return (
    <>
      <Card
        children={children}
        title={title}
        className={className}
        classNames={classNames}
        action={actions}
      />
      <ActivityLog
        displayLog={displayLog}
        setDisplayLog={setDisplayLog}
        activities={activities.data}
        loading={activities.isFetching}
        item={item}
      />
    </>
  );
};

export default ActivityLogWrapperComponent;
