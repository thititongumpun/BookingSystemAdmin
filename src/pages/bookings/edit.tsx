import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  DatePicker,
  TimePicker,
  Edit,
  Form,
  Input,
  useForm,
} from "@pankod/refine-antd";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBooking } from "interfaces";

import dayjs from "dayjs";

export const BookEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IBooking>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="วันที่จอง"
          name="bookDate"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : "",
          })}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker  />
        </Form.Item>
        {/* <Form.Item
          label="เวลาที่จอง"
          name="bookTime"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : "",
          })}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker />
        </Form.Item> */}

        <Form.Item
          label="รหัสเด็ก"
          name="childCode"
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="รหัสเชียร์"
          name="cheerCode"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
