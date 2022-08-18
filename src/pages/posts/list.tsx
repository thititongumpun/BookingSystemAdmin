import { IResourceComponentsProps } from "@pankod/refine-core";
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
} from "@pankod/refine-antd";
import { IBooking } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IBooking>({dataProviderName: "dev"});

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="status"
          key="status"
          title="Status"
          render={(value) => <TagField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="createdAt"
          key="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column<IBooking>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
