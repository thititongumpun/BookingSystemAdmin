import {
  IResourceComponentsProps,
  useExport,
  usePermissions,
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
} from "@pankod/refine-antd";
import { IBooking } from "interfaces";

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

  return (
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
              <ShowButton hideText size="small" recordItemId={record.id} />
              {permissionsData?.includes("Admin") && (
                <DeleteButton hideText size="small" recordItemId={record.id} />
              )}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
