import React, { useState } from "react";
import { Form, Button, Upload, Input, message, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileUploadToS3 } from "../../services/media";
import S3FileUpload from "react-s3";
import { layout, tailLayout } from "../../utils/index";

window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "appinionapp-stag",
  dirName: "users" /* optional */,
  region: "eu-west-2",
  accessKeyId: "amazon accessKeyId",
  secretAccessKey: "amazon secretAccessKey",
};

const CreateForm2 = ({ onNext, onBack, values }) => {
  const [data, setData] = useState([]);

  const addressTooltip = `- The following may be used as proof and should be dated within the last 3 months 
  \n- Recent utility bill (gas, electricity, water, or landline phone)  
  \n- Council tax bill
  \n- Recent credit card or bank statement
  \n- Recent Building Society or Credit Union statement`;

  const onFinish = (e) => {
    const documents = {};
    const qualificationLength =
      e?.qualificationCertificateURL?.fileList?.length || 0;
    const qualificationArr = [];

    for (var i = 0; i < qualificationLength; i++) {
      const url =
        e?.qualificationCertificateURL?.fileList[i]?.response?.url || "";
      qualificationArr.push(url);
      if (qualificationArr.length === qualificationLength) {
        documents.qualificationCertificateURL = qualificationArr;
      }
    }

    documents.licenceURL = e?.licenceURL?.fileList[0]?.response?.url || "";
    documents.addressOneURL =
      e?.addressOneURL?.fileList[0]?.response?.url || "";
    documents.addressTwoURL =
      e?.addressTwoURL?.fileList[0]?.response?.url || "";
    documents.medicalCertificateURL =
      e?.medicalCertificateURL?.fileList[0]?.response?.url || "";
    documents.CCTURL = e?.CCTURL?.fileList[0]?.response?.url || "";
    documents.CVURL = e?.CVURL?.fileList[0]?.response?.url || "";
    documents.GMCURL = e?.GMCURL?.fileList[0]?.response?.url || "";
    documents.CRBDBSURL = e?.CRBDBSURL?.fileList[0]?.response?.url || "";
    documents.SafeguardingURL =
      e?.SafeguardingURL?.fileList[0]?.response?.url || "";
    documents.governanceURL =
      e?.governanceURL?.fileList[0]?.response?.url || "";
    documents.AppraisalEvidenceURL =
      e?.AppraisalEvidenceURL?.fileList[0]?.response?.url || "";

    onNext({ ...e, documents });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const multipleImages = (file, key) => {
    message.loading({ content: "Loading...", key });
    const arr = [];
    for (var i = 0; i < file.length; i++) {
      fileUploadToS3({ file: file[i] })
        .then((res) => {
          arr.push(res);
          message.loading({ content: "Loading...", key });
          if (arr.length === file.length) {
            const formdata = {};
            message.success({ content: "Successfully", key });

            formdata[key] = arr;
            setData({ ...data, ...formdata });
          }
        })
        .catch((err) => {
          message.error({ content: err.message, key });
        });
    }
  };

  const _UploadImage = (file, key) => {
    message.loading({ content: "Loading...", key });
    const formdata = {};
    const obj = {
      file: file,
    };
    fileUploadToS3(obj)
      .then((res) => {
        console.log(
          "🚀 ~ file: CreateForm2.js ~ line 28 ~ fileUploadToS3 ~ res",
          res
        );
        message.success({ content: "Successfully", key });
        formdata[key] = res;

        setData({ ...data, ...formdata });
      })
      .catch((err) => {
        message.error({ content: err.message, key });
        console.log(
          "🚀 ~ file: CreateForm2.js ~ line 31 ~ fileUploadToS3 ~ err",
          err
        );
      });
  };

  const props = {
    name: "file",
    action:
      "https://qfir03b29k.execute-api.eu-west-2.amazonaws.com/images/imageupload",
    headers: {
      "Content-Type": "image/*",
      "Access-Control-Allow-Origin": "*",
    },
    listType: "picture",
    accept: ".png,.jpg,.jpeg",
    maxCount: 1,

    async onChange(info) {
      try {
        await S3FileUpload.uploadFile(
          { ...info.file, name: `${Date.now()}_${info.file.name}` },
          config
        );
      } catch (e) {
        console.log("🚀 ~ file: CreateForm2.js:130 ~ onChange ~ e", e);
        message.error(`${info.file.name} image upload failed.`);
      }
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} image uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} image upload failed.`);
      }
    },
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
        label="Passport/driving licence"
        name="licenceURL"
        rules={[
          {
            required: true,
            message: "Please input your passport/driving licence.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.licenceURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="addressOneURL"
        label="Proof of address 1"
        rules={[
          {
            required: true,
            message: "Please upload proof of address.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.addressOneURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="addressTwoURL"
        label="Proof of address 2"
        rules={[
          {
            required: true,
            message: "Please upload proof of address 2.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.addressTwoURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="medicalCertificateURL"
        label="Professional medical certificate"
        rules={[
          {
            required: true,
            message: "Please upload your professional medical certificate.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.medicalCertificateURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="qualificationCertificateURL"
        label="Other Qualification Certificates"
        rules={[
          {
            required: true,
            message: "Please upload your other qualification certificates.",
          },
        ]}
      >
        <Upload
          {...props}
          maxCount={10}
          beforeUpload={() => false}
          defaultFileList={[
            ...(values?.qualificationCertificateURL?.fileList || []),
          ]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="CCTURL"
        label="Certificate of Completion of Training (CCT) or equivalent"
        rules={[
          {
            required: true,
            message:
              "Please upload your certificate of completion of training (CCT) or equivalent.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.CCTURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="CVURL"
        label="CV"
        rules={[
          {
            required: true,
            message: "Please upload your CV.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.CVURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="GMCURL"
        label="GMC certificate"
        rules={[
          {
            required: true,
            message: "Please upload your GMC certificate.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.GMCURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="CRBDBSURL"
        label="CRB/DBS status"
        rules={[
          {
            required: true,
            message: "Please upload your CRB/DBS status.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.CRBDBSURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="SafeguardingURL"
        label="Safeguarding adult"
        rules={[
          {
            required: true,
            message: "Please upload your safeguarding adult.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.SafeguardingURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="governanceURL"
        label="Information governance (GDPR)"
        rules={[
          {
            required: true,
            message: "Please upload your Information governance (GDPR).",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.governanceURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="AppraisalEvidenceURL"
        label="Appraisal evidence"
        rules={[
          {
            required: true,
            message: "Please upload your appraisal evidence.",
          },
        ]}
      >
        <Upload
          {...props}
          beforeUpload={() => false}
          defaultFileList={[...(values?.AppraisalEvidenceURL?.fileList || [])]}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

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

export default CreateForm2;
