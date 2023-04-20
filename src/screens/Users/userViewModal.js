import { Col, Image, Modal, Row } from "antd";
import React from "react";

const UserViewModal = ({ userData, visible, setVisible }) => {
  const titleSpan = 10;
  const valueSpan = 14;
  return (
    <Modal
      title={`${userData?.firstName} ${userData?.lastName}`}
      // centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={500}
    >
      <Row>
        <Col span={titleSpan}>Name:</Col>
        <Col span={valueSpan}>
          {userData?.title} {userData?.firstName} {userData?.lastName}
        </Col>
      </Row>
      <Row>
        <Col span={titleSpan}>GMC No#:</Col>
        <Col span={valueSpan}>{userData?.GMCno}</Col>
      </Row>
      <Row>
        <Col span={titleSpan}>Email:</Col>
        <Col span={valueSpan}>{userData?.email}</Col>
      </Row>
      <Row>
        <Col span={titleSpan}>Mobile No:</Col>
        <Col span={valueSpan}>{userData?.phone}</Col>
      </Row>
      <Row>
        <Col span={titleSpan}>Private Practice Address:</Col>
        <Col span={valueSpan}>{userData?.practiceAddress}</Col>
      </Row>
      <Row>
        <Col span={titleSpan}>Private Secretary Email:</Col>
        <Col span={valueSpan}>{userData?.secretaryEmail}</Col>
      </Row>
      <Row>
        <Col span={titleSpan}>Private Practice Address:</Col>
        <Col span={valueSpan}>{userData?.practiceAddress}</Col>
      </Row>
      <Image width={200} src={userData?.certificate} />
    </Modal>
  );
};

export default UserViewModal;
