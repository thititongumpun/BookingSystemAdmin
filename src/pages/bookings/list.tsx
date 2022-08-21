import {
  IResourceComponentsProps,
  useExport,
  usePermissions,
  useShow,
} from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  TagField,
  ShowButton,
  ExportButton,
  Modal,
  Show,
  Tag,
  MarkdownField,
  Typography,
} from "@pankod/refine-antd";

import { IBooking } from "interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const BookingList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IBooking>({ hasPagination: true });
  const { triggerExport, isLoading: exportLoading } = useExport<IBooking>({
    mapData: (item) => {
      return {
        จองวันที่: item.bookDate,
        เวลาที่จอง: item.bookTime,
        รหัสเด็ก: item.childCode,
        รหัสเชียร์: item.cheerCode,
        จองเมื่อ: item.createDated,
        จองโดย: item.createBy,
      };
    },
  });
  const { data: permissionsData } = usePermissions();
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);
  const { queryResult, setShowId } = useShow<IBooking>();
  const { data: showQueryResult, isLoading } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <List
        headerProps={{
          extra: (
            <Space>
              <ExportButton onClick={triggerExport} loading={exportLoading} />
            </Space>
          ),
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="bookDate"
            key="bookDate"
            title="จองวันที่"
            render={(value) => <DateField value={value} format="LL" />}
            sorter
          />
          <Table.Column
            dataIndex="bookTime"
            key="bookTime"
            title="เวลาที่จอง"
            render={(value) => <TagField value={value} />}
            sorter
          />
          <Table.Column
            dataIndex="childCode"
            key="childCode"
            title="รหัสเด็ก"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="cheerCode"
            key="cheerCode"
            title="รหัสเชียร์"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="createBy"
            key="createBy"
            title="จองโดย"
            render={(value) => <TextField value={value} />}
            sorter
          />
          <Table.Column<IBooking>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                {permissionsData?.includes("Admin") && (
                  <EditButton hideText size="small" recordItemId={record.id} />
                )}
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setVisibleShowModal(true);
                  }}
                />
                {permissionsData?.includes("Admin") && (
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                )}
              </Space>
            )}
          />
        </Table>
      </List>
      <Modal
        visible={visibleShowModal}
        onCancel={() => setVisibleShowModal(false)}
        title="Show Book"
      >
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
      </Modal>
    </>
  );
};
