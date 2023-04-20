import { useMutation, useSubscription } from "@apollo/client";
import { Space, Table, Tag, message, Spin, Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { UPDATE_STATUS } from "../../graphql/mutations";
import { GET_SPECIALIST } from "../../graphql/subscriptions";
import UserViewModal from "./userViewModal";
import { CopyToClipboard } from "react-copy-to-clipboard";

const { Title } = Typography;
const Users = () => {
  const { data, loading } = useSubscription(GET_SPECIALIST);

  const [update_status] = useMutation(UPDATE_STATUS);

  const [visible, setVisible] = useState(false);
  const [viewData, setViewData] = useState({});
  const [tableYScroll, setTableYScroll] = useState(900);

  useEffect(() => {
    const bodyHeight = document.body.clientHeight;
    setTableYScroll(bodyHeight - 215);
  }, []);

  const onStatusUpdate = (id, status) => {
    const key = "updatable";

    message.loading({ content: "Loading...", key });
    update_status({
      variables: {
        id: id,
        status: status,
      },
    })
      .then((res) => {
        message.success({ content: "Successfully Updated", key });
      })
      .catch((err) => {
        message.error({ content: err?.message, key });
      });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Button
          onClick={() => {
            setViewData(record);
            setVisible(true);
          }}
          type="link"
        >{`${record?.title} ${record?.firstName} ${record?.lastName}`}</Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let colorString = "green";
        if (status === "Pending") {
          colorString = "blue";
        } else if (status === "Rejected") {
          colorString = "red";
        }
        return (
          <span>
            <Tag color={colorString} key={"tag"}>
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <CopyToClipboard
          text={text}
          onCopy={() => message.success(`${text} copy to clipboard`)}
        >
          <Button type="link">{text}</Button>
        </CopyToClipboard>
      ),
    },
    {
      title: "Speciality",
      dataIndex: "specialityBySpeciality",
      key: "id",
      width: 170,
      render: (data) => {
        return (
          <span>
            <Tag color={"blue"} key={"tag"}>
              {data?.name.toUpperCase() || ""}
            </Tag>
          </span>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      width: 270,
      render: (record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                setViewData(record);
                setVisible(true);
              }}
              type="primary"
            >
              View
            </Button>
            <Button
              onClick={() => onStatusUpdate(record?.id, "Approved")}
              type="primary"
            >
              Approve
            </Button>
            <Button
              onClick={() => onStatusUpdate(record?.id, "Rejected")}
              danger
            >
              Reject
            </Button>
          </Space>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          paddingTop: "200px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div
        className="users-title"
        style={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Title level={2}>Specialist Data</Title>
      </div>
      <Table
        rowKey="id"
        style={{ margin: "auto", maxWidth: 1400 }}
        columns={columns}
        dataSource={data?.specialist_web}
        scroll={{
          x: 800,
          y: tableYScroll,
        }}
      />
      <UserViewModal
        userData={viewData}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default Users;
