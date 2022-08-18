import { IResourceComponentsProps } from "@pankod/refine-core";
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
} from "@pankod/refine-antd";
import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IUser>({
    hasPagination: true,
    dataProviderName: "users",
  });

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
        {/* <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        /> */}
        <Table.Column<IUser>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
