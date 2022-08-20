import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import { Show, Typography, Tag, MarkdownField, DateField } from "@pankod/refine-antd";

import { IBooking } from "interfaces";

const { Title, Text } = Typography;

export const BookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBooking>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>วันที่จอง</Title>
      <DateField value={record?.bookDate} format="LL" />

      <Title level={5}>จองเวลา</Title>
      <Text>
        <Tag>{record?.bookTime}</Tag>
      </Text>

      <Title level={5}>รหัสเด็ก</Title>
      <Text>{record?.childCode}</Text>

      <Title level={5}>รหัสเชียร์</Title>
      <MarkdownField value={record?.cheerCode} />

      <Title level={5}>จองโดย</Title>
      <MarkdownField value={record?.createBy} />

      <Title level={5}>แก้ไขเมื่อ</Title>
      {record?.updateDated ? (
        <DateField value={record?.updateDated} format="LLL" />
      ) : (
        <Text>-</Text>
      )}

      <Title level={5}>แก้ไขโดย</Title>
      {record?.updateBy ? (
        <MarkdownField value={record?.updateBy} />
      ) : (
        <Text>-</Text>
      )}
    </Show>
  );
};
