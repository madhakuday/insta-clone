import React from "react";
import { HeartFilled, CommentOutlined, EditOutlined, } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";

import "./card.scss";
import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
const { Meta } = Card;
const Cards: React.FC<any> = ({ postsData }) => {
  React.useEffect(() => {
    console.log("PostD : ", postsData);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {postsData?.map(
        (x: {
          id: string;
          data: { username: string; imageUrl: string; description: string };
        }) => {
          const { data } = x;
          return (
            <React.Fragment key={x?.id}>
              <Card
                title={
                  <>
                    <Meta
                      avatar={
                        <Avatar src="https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png" />
                      }
                      title={data?.username}
                    />
                  </>
                }
                extra={<MoreMenuDropDown id={x.id} />}
                cover={<div className="flex items-center justify-center "><img alt="image..." className="w-10/12 sm:w-full m-auto" src={data?.imageUrl} width='85%' /></div>}
                actions={[
                  <>
                    <div className="flex justify-around">
                      <span className="text-lg text-red-600">
                        <HeartFilled />
                      </span>
                      <span className="text-lg text-red-600">
                        <CommentOutlined />
                      </span>
                      <span className="text-lg text-red-600">
                        <EditOutlined />
                      </span>
                    </div>
                  </>,
                ]}

                className="my-3 w-full sm:w-72	"
              >
                <p className="font-semibold  text-xs"> {data?.description}</p>
              </Card>
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};

export default Cards;
