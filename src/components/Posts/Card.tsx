import React from "react";
import { HeartFilled, CommentOutlined, EditOutlined, } from "@ant-design/icons";
import { Avatar, Card } from "antd";

import "./card.scss";
import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
const { Meta } = Card;
const Cards: React.FC<any> = ({ postsData }) => {

  return (
    <div className="w-full flex flex-col items-center">
      {postsData?.map(
        (x: {
          id: string;
          data: { username: string; imageUrl: string; description: string, userProfile: string };
        }) => {
          const { data } = x;
          return (
            <React.Fragment key={x?.id}>
              <Card
                title={
                  <>
                    <Meta
                      avatar={
                        // <Avatar src="https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png" />
                        <Avatar src={x.data.userProfile} />
                      }
                      title={data?.username}
                    />
                  </>
                }
                extra={<MoreMenuDropDown data={x} />}
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

                className="my-3 w-full sm:w-80	"
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
