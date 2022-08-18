import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import { Show, Typography, Tag, DateField } from "@pankod/refine-antd";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>({ dataProviderName: "users" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Username</Title>
      <Text>{record?.username}</Text>

      <Title level={5}>Roles</Title>
      <Text>
        <Tag>{record?.role}</Tag>
      </Text>

      <Title level={5}>สร้างเมื่อ</Title>
      <DateField value={record?.createDated} format="LLL" />
    </Show>
  );
};
