import React from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SPECIALITY } from "../../graphql/queries";
import { layout, tailLayout } from "../../utils/index";
const { Option } = Select;

const CreateForm1 = ({ onNext, values }) => {
  const { loading, data } = useQuery(GET_SPECIALITY);

  const onFinish = (e) => {
    console.log("Success:", e);
    onNext(e);
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
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Select your title.",
          },
        ]}
      >
        <Select placeholder="Select a option " allowClear>
          <Option value="Dr">Dr</Option>
          <Option value="Mr">Mr</Option>
          <Option value="Miss">Miss</Option>
          <Option value="Mrs">Mrs</Option>
          <Option value="Ms">Ms</Option>
          <Option value="Prof">Prof</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="GMC #"
        name="GMCno"
        rules={[
          {
            required: true,
            message: "Enter your GMC #.",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          {
            max: 7,
            min: 7,
            message: "Invalid GMC number",
          },
        ]}
      >
        <Input type={"number"} />
      </Form.Item>

      <Form.Item
        label="First name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Enter your first name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Enter your last name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Enter your username.",
          },
          {
            pattern: /^[A-Za-z0-9_]+$/,
            message: `Invalid username.`,
          },
          {
            min: 4,
            message: "Username too short.",
          },
          {
            max: 25,
            message: "Username too long.",
          },
        ]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item
        label="Mobile no."
        name="phone"
        rules={[
          {
            required: true,
            message: "Enter your mobile number.",
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
        label="NHS email :"
        name="email"
        rules={[
          {
            required: true,
            message: "Enter your email.",
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
        label="Speciality"
        name="speciality"
        rules={[
          {
            required: true,
            message: "Please select speciality",
          },
        ]}
      >
        <Select>
          {data && data.speciality && data.speciality.length
            ? data.speciality.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.name}
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item
        label="Private practice address"
        name="practiceAddress"
        rules={[
          {
            required: false,
            message: "Enter your private practice address.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Private secretary email :"
        name="secretaryEmail"
        rules={[
          {
            required: false,
            message: "Enter your private secretary email.",
          },
          {
            type: "email",
            message: "Invalid email",
          },
        ]}
      >
        <Input type={"email"} />
      </Form.Item>

      {/* <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Enter your password.",
          },
          {
            pattern:
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/,
            message: `Minimum eight characters, at least one letter and one number, space are not allowed.`,
          },
          {
            min: 6,
            message: "Password is too short",
          },
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item {...tailLayout} style={{ paddingTop: 20 }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm1;
