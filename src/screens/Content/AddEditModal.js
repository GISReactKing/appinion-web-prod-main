import React, { useEffect, useState } from "react";
import UploadImage from "../../components/uploadImage/Index.js";
import { Modal, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import {
  CREATE_EDUCATIONAL_CONTENT,
  UPDATE_EDUCATIONAL_CONTENT,
} from "../../graphql/mutations";

const { TextArea } = Input;

function AddEditModal({ handleModal, isModalShown, isEdit, refetch }) {
  const [contents, setContent] = useState({
    title: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    setContent({
      title: isEdit?.title,
      description: isEdit?.description,
      image: isEdit?.image,
    });
  }, [isEdit]);

  const [create_edu_content] = useMutation(CREATE_EDUCATIONAL_CONTENT);
  const [update_edu_content] = useMutation(UPDATE_EDUCATIONAL_CONTENT);

  const modalTitle = isEdit ? "Edit Content" : "Add Content";
  const handleOk = (e) => {
    if (isEdit) {
      update_edu_content({
        variables: { ...contents, id: isEdit.id },
      })
        .then(() => {
          message.success({ content: "Item EDITED successfully" });
          refetch();
          handleModal();
        })
        .catch((err) => {
          message.error({ content: err?.message });
        })
        .finally(() => {
          handleModal();
        });
    } else {
      create_edu_content({
        variables: {
          ...contents,
        },
      })
        .then((res) => {
          message.success({ content: "Successfully Created" });
          refetch();
          handleModal();
        })
        .catch((err) => {
          message.error({ content: err?.message });
        })
        .finally(() => {
          handleModal();
        });
    }
  };

  const handleCancel = (e) => {
    handleModal();
  };

  const uploadImage = (value) => {
    setContent({
      ...contents,
      image: value,
    });
  };

  const handleChange = (e) => {
    const {
      target: { title, value },
    } = e;
    setContent({
      ...contents,
      [title]: value,
    });
  };
  return (
    <div>
      <Modal
        title={modalTitle}
        visible={isModalShown}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
          <UploadImage onChange={uploadImage} value={contents["image"]} />
          <div style={{ margin: "5px 0 5px 0" }}>
            <h4>Some contents...</h4>
            <Input
              placeholder="Title"
              onChange={handleChange}
              title="title"
              value={contents["title"]}
            />
          </div>

          <h4>Some contents...</h4>

          <TextArea
            rows={4}
            placeholder="Description"
            onChange={handleChange}
            title="description"
            value={contents["description"]}
          />
        </div>
      </Modal>
    </div>
  );
}

export default AddEditModal;
