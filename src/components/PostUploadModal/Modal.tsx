import { db, storage } from "../../firebase";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { serverTimestamp } from "firebase/firestore";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import FileUploading from "react-files-uploading";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const PostModal = ({ content }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>("");
  const [isDisble, setIsDisble] = useState<boolean>(true);
  const [files, setFiles] = React.useState<File[]>([]);

  const [form] = Form.useForm();
  const logdInUser = useSelector((state: any) => state?.user?.user?.user);
  const onChange = (file: File[]) => {
    const isJPG =
      file[0].type === "image/jpeg" ||
      file[0].type === "image/jpg" ||
      file[0].type === "image/png";
    if (!isJPG) {
      message.error("You can only upload JPG or PNG file!");
      setImageUpload("");
      return false;
    } else {
      setImageUpload(file[0]);
      setIsDisble(false);
      return true;
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
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
            const userSubId = logdInUser?.sub.slice(
              logdInUser?.sub.indexOf("|") + 1
            );

            const data = {
              description: e.description,
              imageUrl: url,
              timeStamp: serverTimestamp(),
              // userProfile: logdInUser.picture,
              array: [""],
              userAuthId: userSubId,
            };

            //  User Configration Table
            const q = query(
              collection(db, "UserConfigurations"),
              where("userAuthId", "==", userSubId)
            );

            getDocs(q)
              .then(async (querySnapshot) => {
                const documents: any = [];
                querySnapshot.forEach((doc) => {
                  documents.push(doc.data());
                });
                const UserConfigurationsData = {
                  userAuthId: userSubId,
                  postId: [],
                };
                if (documents.length == 0) {
                  let a = await setDoc(
                    doc(db, "UserConfigurations", uuid()),
                    UserConfigurationsData
                  );
                }
              })
              .catch((error) => {
                console.log("Error getting documents:", error);
              });

            // --
            let a = await setDoc(doc(db, "post", uuid()), data);
            message.success("Done");
            setIsModalOpen(false);
            form.resetFields();
          });
        });
      } else {
      }
    } catch (error) {
      setIsDisble(true);
      message.error("Somethin wrong !");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-full" onClick={showModal}>
        {content}
      </div>
      <Modal
        title="Post..."
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { background: "#4096FF", color: "white" },
          disabled: isDisble,
        }}
        okText="Post"
      >
        <Form form={form} onFinish={onFormFinish}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item
                name="description"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="upload">
                <FileUploading
                  multiple={false}
                  value={files}
                  maxNumber={1}
                  onChange={onChange}
                >
                  {({
                    fileList,
                    errors,
                    isDragging,
                    onFileUpload,
                    dragProps,
                  }) => {
                    return (
                      <div className="upload__file-wrapper">
                        <Button
                          icon={<UploadOutlined />}
                          id="btn-upload"
                          // type="button"
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onFileUpload}
                          {...dragProps}
                        >
                          Upload
                        </Button>

                        <div id="list-files">
                          {fileList.map((file, index) => (
                            <div key={`file-${index}`} className="file-item">
                              <p>{file.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }}
                </FileUploading>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default PostModal;
