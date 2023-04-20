import React, { useState } from "react";
import {
  CreateForm1,
  CreateForm2,
  CreateForm3,
  CreateForm4,
  FormSteps,
} from "../../components";
import { useMutation } from "@apollo/client";
import {
  CREATE_SPECIALIST,
  UPDATE_PROFILE,
  UPDATE_SPECIALIST,
} from "../../graphql/mutations";
import { message, Modal, Input, Progress, Typography } from "antd";
import { Auth } from "aws-amplify";

const { Title } = Typography;

const CreateSpecialist = () => {
  const key = "updatable";
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [insert_specialist] = useMutation(CREATE_SPECIALIST);
  const [update_specialist] = useMutation(UPDATE_SPECIALIST);
  const [update_profile] = useMutation(UPDATE_PROFILE);

  const handleSubmit = async (e) => {
    console.log("🚀 ~ file: index.js ~ line 69 ~ handleSubmit ~ e", e);

    message.loading({ content: "Loading...", key, duration: 3 });
    setLoading(true);
    try {
      message.loading({ content: "Loading...", key });
      insert_specialist({
        variables: {
          ...e,
          ...e.documents,
        },
      })
        .then((res) => {
          setValues({});
          setCount(0);
          setPercentage(0);
          setLoading(false);
          message.success({ content: "Successfully Created", key });
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.js:54 ~ handleSubmit ~ err", err);
          const filterErr = "unexpected null value for type 'String'";
          let Error = err.message;
          if (filterErr === Error) {
            Error = "Please Fill all the input fields with values";
          }

          setLoading(false);
          handleCancel();
          message.error({ content: err.message, key, duration: 3 });
        });
    } catch (err) {
      console.log("🚀 ~ file: index.js ~ line 69 ~ handleSubmit ~ err", err);
      message.error({ content: err.message, key, duration: 3 });
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    message.loading({ content: "Loading...", key });
    try {
      await Auth.confirmSignUp(values.username, otp, {
        forceAliasCreation: true,
      });
      setIsModalVisible(false);
      setValues({});
      setCount(0);
      setPercentage(0);
      setLoading(false);
      message.success({ content: "Successfully Created", key });
    } catch (err) {
      setLoading(false);
      message.error({ content: err.message, key });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div style={{ position: "absolute", right: 40, top: 150 }}>
        <Progress percent={percentage} showInfo={true} type="circle" />
      </div>
      <div
        style={{
          alignItem: "center",
          justifyContent: "center",
          display: "flex",
          paddingTop: 20,
        }}
      >
        <Title level={2}>Specialist Registration</Title>
      </div>
      <FormSteps count={count} />
      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        {count === 0 && (
          <CreateForm1
            onNext={(e) => {
              setCount(1);
              setValues({ ...values, ...e });
              setPercentage(25);
            }}
            values={values}
          />
        )}
        {count === 1 && (
          <CreateForm2
            onNext={(e) => {
              setValues({ ...values, ...e });
              setCount(2);
              setPercentage(50);
            }}
            onBack={() => {
              setCount(0);
              setPercentage(0);
            }}
            values={values}
          />
        )}
        {count === 2 && (
          <CreateForm3
            onNext={(e) => {
              setValues({ ...values, ...e });
              setCount(3);
              setPercentage(75);
            }}
            onBack={() => {
              setCount(1);
              setPercentage(50);
            }}
            values={values}
          />
        )}
        {count === 3 && (
          <CreateForm4
            onNext={(e) => {
              handleSubmit({ ...values, ...e });
              setPercentage(100);
            }}
            onBack={() => {
              setCount(2);
              setPercentage(75);
            }}
            values={values}
            loading={loading}
          />
        )}
      </div>
      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !otp }}
        okText={"CONFIRM"}
      >
        <Input
          placeholder="Confirm code"
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CreateSpecialist;
