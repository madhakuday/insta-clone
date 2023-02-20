import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./profile.scss";
import { useSelector } from "react-redux";
import { Row, Col, Form, Input, Divider, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { db } from "../../firebase";
import getUserId from "../../function/getUserId";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useForm } from "rc-field-form";

const Profile = () => {
  const [userData, setUserData] = useState<any>();
  const [form] = Form.useForm();
  const { logout } = useAuth0();
  const { user } = useSelector(
    (state: { user: { user: any } }) => state?.user?.user
  );

  const getUserData = async () => {
    const userId: any = await getUserId(user?.sub);
    const userSubId = user?.sub.slice(user?.sub.indexOf("|") + 1);
    const q = query(
      collection(db, "userDetails"),
      where("userAuthId", "==", userSubId)
    );

    getDocs(q)
      .then((querySnapshot) => {
        const documents: any = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });

        form.setFieldsValue({
          username: documents[0]?.username,
          email: documents[0]?.email,
          firstname: documents[0]?.firstname,
          lastname: documents[0]?.lastname,
          aboutmyself: documents[0]?.aboutmyself,
        });
        console.log("documents", documents[0]);

        setUserData(documents[0]);
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  };

  const onFinish = async (values: any) => {
    const userId: any = await getUserId(user?.sub);
    const postRef = doc(db, "userDetails", userId);

    const dataToUpdate = {
      username: values.username ? values.username : "",
      email: values.email ? values.email : "",
      firstname: values.firstname ? values.firstname : "",
      lastname: values.lastname ? values.lastname : "",
      aboutmyself: values.aboutmyself ? values.aboutmyself : "",
    };
    console.log(dataToUpdate);

    updateDoc(postRef, dataToUpdate)
      .then(() => {
        message.success("Done!");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="profile-main-div">
      <div className="main-content">
        <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <button
              className="btn bg-slate-100 text-zinc-800 "
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </nav>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            // backgroundImage:
            // "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">
                  Hello, {userData?.username}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>
                {/* <a href=" " className="btn btn-info">
                  Edit profile
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href=" ">
                        <img
                          src={userData?.userProfile}
                          className="rounded-circle"
                          alt="..."
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <a href=" " className="btn btn-sm btn-info mr-4">
                      Connect
                    </a>
                    <a href=" " className="btn btn-sm btn-default float-right">
                      Message
                    </a>
                  </div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {userData?.username}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    {/* <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2"></i>Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2"></i>
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2"></i>University of
                      Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href=" ">Show more</a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0"> {userData?.username}'s account</h3>
                    </div>
                    <div className="col-4 text-right">
                      <a href=" " className="btn btn-sm btn-primary">
                        Settings
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelAlign="left"
                    labelWrap
                    requiredMark={false}
                    labelCol={{ span: 24 }}
                    colon={false}
                    form={form}
                  >
                    <Row gutter={[8, 8]}>
                      <Col xs={24}>
                        <h6 className="heading-small text-muted mb-4">
                          Your information
                        </h6>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Username" name="username">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Email" name="email">
                          <Input type="email" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="First Name" name="firstname">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Last Name" name="lastname">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Divider />

                      <Col xs={24}>
                        <h6 className="heading-small text-muted mb-4">
                          ABOUT ME
                        </h6>
                      </Col>

                      <Col xs={12} lg={24}>
                        <Form.Item
                          label="Write Aboyt your self!"
                          name="aboutmyself"
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <button className="btn btn-info float-right">
                          Save
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
