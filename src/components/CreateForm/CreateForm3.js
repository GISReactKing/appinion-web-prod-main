import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  Typography,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { layout, tailLayout } from "../../utils/index";

import { GET_SPECIALITY } from "../../graphql/queries";

const { Title } = Typography;
const { Option } = Select;

const CreateForm3 = ({ onNext, onBack, values }) => {
  const { loading, data } = useQuery(GET_SPECIALITY);
  const onFinish = (e) => {
    console.log("Success:", e);
    const obj = {
      ...e,
    };
    onNext(obj);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        ...values,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        padding: "10px 10px",
      }}
    >
      <div
        style={{
          alignItem: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Title level={5}>Reference 1</Title>
      </div>

      <Form.Item
        label="Name"
        name="nameRef1"
        rules={[
          {
            required: true,
            message: "Enter name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="NHS email :"
        name="emailRef1"
        rules={[
          {
            required: true,
            message: "Enter email.",
          },
          {
            type: "email",
            message: "Invalid email",
          },
        ]}
      >
        <Input type={"email"} />
      </Form.Item>

      <Form.Item
        label="Mobile no."
        name="phoneRef1"
        rules={[
          {
            required: true,
            message: "Enter mobile number.",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          {
            max: 10,
            min: 10,
            message: "Invalid mobile number",
          },
        ]}
      >
        <Input type={"number"} prefix="+44" />
      </Form.Item>

      <Form.Item
        label="Capacity in which known to referee"
        name="referee1"
        rules={[
          {
            required: true,
            message: "Enter capacity in which known to referee.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div
        style={{
          alignItem: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Title level={5}>Reference 2</Title>
      </div>

      <Form.Item
        label="Name"
        name="nameRef2"
        rules={[
          {
            required: true,
            message: "Enter name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="NHS email :"
        name="emailRef2"
        rules={[
          {
            required: true,
            message: "Enter email.",
          },
          {
            type: "email",
            message: "Invalid email",
          },
        ]}
      >
        <Input type={"email"} />
      </Form.Item>

      <Form.Item
        label="Mobile no."
        name="phoneRef2"
        rules={[
          {
            required: true,
            message: "Enter mobile number.",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          {
            max: 10,
            min: 10,
            message: "Invalid mobile number",
          },
        ]}
      >
        <Input type={"number"} prefix="+44" />
      </Form.Item>

      <Form.Item
        label="Capacity in which known to referee"
        name="referee2"
        rules={[
          {
            required: true,
            message: "Enter capacity in which known to referee.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="GMC Number#"
        name="GMCno"
        rules={[
          {
            required: true,
            message: "Enter GMC Number.",
          },
        ]}
      >
        <Input type={"number"} />
      </Form.Item> */}

      {/* <Form.Item
        label="Speciality"
        name="speciality"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          {data && data.speciality && data.speciality.length
            ? data.speciality.map((item, index) => (
                <Select.Option key={index} value={item?.id}>{item?.name}</Select.Option>
              ))
            : null}
        </Select>
      </Form.Item> */}

      {/* <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Enter description.",
          },
        ]}
      >
        <Input />
      </Form.Item> */}

      {/* <Form.Item
        label="Post Code"
        name="postCode"
        rules={[
          {
            required: true,
            message: "Enter post code.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Private Clinic URL"
        name="clinicURL"
        rules={[
          {
            required: true,
            message: "Enter private clinic URL.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="availableStartDay"
        label="Start Day"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a start day" allowClear>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="availableEndDay"
        label="End Day"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a end day" allowClear>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
        </Select>
      </Form.Item>

      <Form.Item name="availableStartTime" label="Start Time" {...config}>
        <TimePicker placeholder="Start Time" />
      </Form.Item>

      <Form.Item name="availableEndTime" label="End Time" {...config}>
        <TimePicker placeholder="End Time" />
      </Form.Item> */}

      <Form.Item {...tailLayout} style={{ paddingTop: 20, paddingRight: 20 }}>
        <Button
          htmlType="button"
          onClick={() => onBack()}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm3;
