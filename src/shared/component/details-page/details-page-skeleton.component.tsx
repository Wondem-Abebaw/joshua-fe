import { Skeleton, Table } from "antd";

interface Props {
  showProfile: boolean;
  widthClass?: string;
}

export default function DetailsPageSkeleton(props: Props): JSX.Element {
  const { showProfile, widthClass = "max-w-2xl" } = props;

  return (
    <div className={`mx-auto ${widthClass}`}>
      {showProfile && (
        <section className="flex gap-2 bg-gray-100 p-4 rounded-sm">
          <Skeleton.Avatar active size={96} />
          <Skeleton paragraph={{ rows: 4 }} active className="w-1/2" />
        </section>
      )}
      <section className="mt-8 last:mb-0">
        <Skeleton.Input active />
        <Table
          dataSource={[...new Array(5)].map((_, index) => ({
            key: index + 1,
            title: <Skeleton.Input block active />,
          }))}
          columns={[
            {
              dataIndex: "title",
              key: "title",
            },
          ]}
          showHeader={false}
          bordered
          pagination={false}
          size="middle"
        />
      </section>
    </div>
  );
}
