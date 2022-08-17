import { IResourceComponentsProps, useOne, useShow } from "@pankod/refine-core";
import { Show, Typography, Tag, MarkdownField } from "@pankod/refine-antd";

import { IBooking } from "interfaces";

const { Title, Text } = Typography;

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBooking>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.bookDate}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.bookTime}</Tag>
      </Text>

      {/* <Title level={5}>Category</Title>
      <Text>{.data.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} /> */}
    </Show>
  );
};
