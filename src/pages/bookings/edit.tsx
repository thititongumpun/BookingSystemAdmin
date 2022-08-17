import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  Edit,
  Form,
  Input,
  Select,
  useForm,
  // useSelect,
} from "@pankod/refine-antd";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IBooking } from "interfaces";

export const BookEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { formProps, saveButtonProps } = useForm<IBooking>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          // name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          // name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "published",
                value: "published",
              },
              {
                label: "draft",
                value: "draft",
              },
              {
                label: "rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          // name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Select {...categorySelectProps} /> */}
        </Form.Item>
        <Form.Item
          label="Content"
          // name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ReactMde
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
