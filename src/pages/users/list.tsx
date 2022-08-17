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
  const { tableProps } = useTable<IUser>({ hasPagination: true });

  return (
    <List>
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
          dataIndex="cheerCode"
          key="cheerCode"
          title="รหัสเชียร์"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="childCode"
          key="childCode"
          title="รหัสเด็ก"
          render={(value) => <TextField value={value} />}
          sorter
        />
        <Table.Column
          dataIndex="createBy"
          key="createBy"
          title="จองโดย"
          render={(value) => <TextField value={value} />}
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
