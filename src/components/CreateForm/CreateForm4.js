import React from "react";
import { Form, Input, Button, message } from "antd";
import { bankAccount } from "../../services/bankAccount";
import { layout, tailLayout } from "../../utils/index";

const CreateForm4 = ({ onNext, onBack, loading, values }) => {
  const key = "bankKey";
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const onFinish = (e) => {
    console.log("Success:", e);
    message.loading({ content: "Loading...", key, duration: 3 });
    bankAccount(e)
      .then((res) => {
        // message.success({ content: res?.message, key });
        const obj = {
          ...e,
          code: makeid(6),
          bankAccountToken: res?.bank_account,
        };
        onNext(obj);
      })
      .catch((err) => {
        message.error({ content: err.message, key, duration: 3 });
        console.log("🚀 ~ file: CreateForm4.js:22 ~ bankAccount ~ err", err);
      });
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
        label="Bank name"
        name="bankName"
        rules={[
          {
            required: true,
            message: "Enter your bank name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Account name"
        name="accountTilte"
        rules={[
          {
            required: true,
            message: "Enter your account name.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Account #"
        name="accountNo"
        rules={[
          {
            required: true,
            message: "Enter your account number.",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          {
            max: 8,
            min: 8,
            message: "Invalid account number.",
          },
        ]}
      >
        <Input type={"number"} />
      </Form.Item>

      <Form.Item
        label="Sort code"
        name="shortCode"
        rules={[
          {
            required: true,
            message: "Enter your sort code.",
          },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          {
            max: 6,
            min: 6,
            message: "Invalid sort code",
          },
        ]}
      >
        <Input type={"number"} />
      </Form.Item>

      {/* <Form.Item name="ExpireDate" label="Expire Date" {...config}>
        <TimePicker placeholder="Expire Date" />
      </Form.Item> */}

      <Form.Item {...tailLayout} style={{ paddingTop: 20, paddingRight: 40 }}>
        <Button
          htmlType="button"
          onClick={() => onBack()}
          style={{ marginRight: 10 }}
          disabled={loading}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm4;
