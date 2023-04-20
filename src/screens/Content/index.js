import { Card, List, Button, Typography, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddEditModal from "./AddEditModal";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EDUCATIONAL_CONTENT } from "../../graphql/queries";
import { DELETE_EDUCATIONAL_CONTENT } from "../../graphql/mutations";
const { Title } = Typography;

function Index(props) {
  const [modalShown, showModal] = useState(false);
  const [isEdit, setEdit] = useState(null);
  const {
    loading,
    data: { educational_content = [] } = {},
    refetch,
  } = useQuery(GET_EDUCATIONAL_CONTENT);
  const [delete_edu_content] = useMutation(DELETE_EDUCATIONAL_CONTENT);

  const handleModal = () => {
    showModal(!modalShown);
    setEdit(null);
  };
  return (
    <div style={{}}>
      <AddEditModal
        handleModal={handleModal}
        isModalShown={modalShown}
        isEdit={isEdit}
        refetch={refetch}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            margin: "0 auto",
            marginTop: 50,
            flex: 1,
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Educational Content
          </Title>
          <Card
            style={{
              margin: "0 auto",
              marginTop: 10,
              maxWidth: 800,
              flex: 1,
              marginBottom: 30,
            }}
          >
            {!loading ? (
              <List
                className="my-list"
                itemLayout="vertical"
                size="small"
                dataSource={educational_content}
                pagination={{
                  onChange: (page) => {},
                  pageSize: 10,
                }}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <Button
                        shape="circle"
                        style={{
                          marginRight: 20,
                          marginTop: "auto",
                        }}
                        onClick={(e) => {
                          handleModal();
                          setEdit(item);
                          refetch();
                        }}
                      >
                        <EditOutlined />
                      </Button>,
                      <Button
                        danger
                        shape="circle"
                        style={{
                          marginRight: 20,
                          marginTop: "auto",
                        }}
                        onClick={async (e) => {
                          await delete_edu_content({
                            variables: {
                              id: item.id,
                            },
                          });
                          refetch();
                          message.success({ content: "Deleted Created" });
                        }}
                      >
                        <DeleteOutlined />
                      </Button>,
                    ]}
                    extra={<img width={272} alt="logo" src={item.image} />}
                  >
                    <List.Item.Meta
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            ) : (
              ""
            )}
          </Card>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 30,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            style={{
              marginRight: 20,
              marginTop: "90vh",
              marginBottom: "30px",
              width: "70px",
              height: "70px",
            }}
            onClick={() => {
              handleModal();
            }}
          >
            <PlusOutlined style={{ fontSize: "35px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Index;
