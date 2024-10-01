export interface ReportCardData {
  title: string;
  description?: string;
  count?: number | string;
  icon: any;
  loading?: boolean;
  key?: number;
  obj?: any;
  onClick?: () => void;
}

export function formatCurrency(val: number) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ReportCard: React.FC<ReportCardData> = (props: ReportCardData) => {
  return (
    <div
      key={props.key}
      className="rounded-lg cursor-pointer hover:shadow-primary border  shadow-lg w-full h-24 px-2 flex items-center space-x-2"
      onClick={() => props.onClick?.()}
    >
      <div className="rounded-full border h-12 w-12 flex items-center p-3 border-primary">
        {props.icon}
      </div>
      <div className=" flex-col ">
        <p className="text-gray-500">{props.title}</p>
        <p className="text-2xl font-medium">{props.count ?? "--"}</p>
      </div>
    </div>
  );
};
