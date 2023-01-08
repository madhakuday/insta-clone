import { db, storage } from "../../firebase";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
  UploadProps,
} from "antd";

import "./Modal.css";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const PostModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>("");

  const [form] = Form.useForm();
  const logdInUser = useSelector((state: any) => state?.user?.user?.user);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    maxCount: 1,
  };

  const handleOk = () => {
    form.submit();
  };

  const onFormFinish = async (e: any) => {
    try {
      if (imageUpload != "" || imageUpload != undefined) {
        const imageRef = ref(storage, `images/${uuid()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            const data = {
              description: e.description,
              imageUrl: url,
              username: logdInUser?.nickname
                ? logdInUser?.nickname
                : logdInUser?.name,
            };
            let a = await setDoc(doc(db, "post", uuid()), data);
            setIsModalOpen(false);
            message.success("Done");
            form.resetFields();
          });
        });
      } else {
      }
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UploadOutlined onClick={showModal} />
      <Modal
        title="Post..."
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "#4096FF" } }}
        okText="Post"
      >
        <Form form={form} onFinish={onFormFinish}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item
                name="description"
                rules={[{ required: true, message: "This is required" }]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="upload">
                <Upload
                  {...props}
                  beforeUpload={(file) => {
                    setImageUpload(file);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default PostModal;
