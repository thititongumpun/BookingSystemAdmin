import { IResourceComponentsProps, usePermissions } from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  DateField,
  Space,
  EditButton,
  // DeleteButton,
  TagField,
  ShowButton,
  DeleteButton,
} from "@pankod/refine-antd";
import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IUser>({
    hasPagination: true,
    dataProviderName: "users",
  });

  const { data: permissionsData } = usePermissions();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="username"
          key="username"
          title="username"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="role"
          key="role"
          title="role"
          render={(value) => <TagField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="createDated"
          key="createDated"
          title="create Dated"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column<IUser>
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
