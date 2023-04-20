import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useState } from "react";

import { fileUploadToS3 } from "../../services/media";

const { Dragger } = Upload;

const UploadImage = ({ onChange, value }) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const props = {
    name: "file",
    customRequest: dummyRequest,
    onRemove() {
      onChange && onChange(null);
    },
    onChange(info) {
      const { status, originFileObj } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        fileUploadToS3({ file: originFileObj })
          .then((res) => {
            onChange && onChange(res);
          })
          .catch((err) => {
            message.error({ content: err.message });
          });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger {...props}>
        {value ? (
          <img
            src={value}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </>
        )}
      </Dragger>
    </div>
  );
};

export default UploadImage;
