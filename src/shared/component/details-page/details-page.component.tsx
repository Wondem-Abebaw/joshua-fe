import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Empty, Image, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { VerifiedOutlined, EditOutlined } from "@ant-design/icons";
import DetailsPageSkeleton from "./details-page-skeleton.component";

const { Title, Text } = Typography;

export interface DataType {
  key: string;
  label: string;
  value: any;
  type?: "string" | "date" | "number" | "boolean";
}

const columns: ColumnsType<DataType> = [
  {
    title: "Property",
    dataIndex: "label",
    rowScope: "row",
    width: "30%",
  },
  {
    title: "Value",
    dataIndex: "value",
  },
];

interface ProfileHeaderDataType {
  image: string | false;
  name: any;
  type: string;
  address: string;
  phone: string;
  email: string;
  isVerified: boolean;
}

interface ProfileHeaderProps {
  profile: ProfileHeaderDataType;
  editUrl: string;
  hideEditButton: boolean;
  children?: ReactNode;
}

interface DetailsConfig {
  isProfile: boolean;
  title: any;
  editUrl?: string;
  widthClass?: string;
  hideEditButton?: boolean;
}

interface Props {
  dataSource: Array<{
    title: string;
    source: DataType[];
  }>;
  config: DetailsConfig;
  profileData?: ProfileHeaderDataType;
  additionalActions?: ReactNode;
  isLoading: boolean;
}

export default function DetailsPage(props: Props): JSX.Element {
  const { dataSource, profileData, additionalActions, config, isLoading } =
    props;
  const {
    isProfile,
    title,
    editUrl = "",
    widthClass = "max-w-2xl",
    hideEditButton = false,
  } = config;

  if (isLoading) {
    return (
      <DetailsPageSkeleton showProfile={isProfile} widthClass={widthClass} />
    );
  }

  if (!isLoading && dataSource.length === 0) {
    return <Empty />;
  }

  return (
    <div className={`p-4 mx-auto font-roboto ${widthClass}`}>
      {isProfile && profileData !== undefined ? (
        <ProfileHeader
          profile={profileData}
          editUrl={editUrl}
          hideEditButton={hideEditButton}
        >
          {additionalActions}
        </ProfileHeader>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <Title level={4} className="mb-0">
            {title}
          </Title>
          {!hideEditButton && <EditButton editUrl={editUrl} />}
          {additionalActions}
        </div>
      )}

      <Divider />

      {dataSource.map(({ title, source }) => (
        <section className="mb-8 last:mb-0" key={title}>
          <Title level={5}>{title}</Title>
          <Table
            dataSource={source}
            columns={columns}
            showHeader={false}
            bordered
            pagination={false}
            size="middle"
          />
        </section>
      ))}
    </div>
  );
}

function ProfileHeader(props: ProfileHeaderProps): JSX.Element {
  const { profile, editUrl, children = null, hideEditButton } = props;
  const { image, name, type, address, phone, email, isVerified } = profile;

  return (
    <section
      id="profile-header"
      className="flex gap-2 bg-gray-100 p-4 rounded-sm"
    >
      {image !== false && (
        <div className="w-24 h-24 flex-shrink-0 bg-gray-200 flex items-center justify-center rounded-full">
          <Image className="rounded-full" src={image} />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-0.5">
          {name}
          {isVerified && <VerifiedOutlined color="slateblue" />}
        </h1>
        <h2 className="text-xl">{type}</h2>

        <div className="mt-3">
          <Text className="block">{address}</Text>
          <Text className="block">{phone}</Text>
          <Text className="block">{email}</Text>
        </div>
      </div>

      <div className="ml-auto self-start flex items-center gap-2">
        {!hideEditButton && <EditButton editUrl={editUrl} />}
        {children}
      </div>
    </section>
  );
}

function EditButton({ editUrl }: { editUrl: string }): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button
      shape="round"
      icon={<EditOutlined size={12} />}
      className="w-max ml-auto flex items-center gap-0.5 bg-white"
      onClick={() => {
        navigate(editUrl);
      }}
    >
      Edit
    </Button>
  );
}
