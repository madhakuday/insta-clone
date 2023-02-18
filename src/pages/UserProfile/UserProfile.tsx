import { Card } from "antd";
import Typography from "antd/es/typography/Typography";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.scss";

const UserProfile = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log("Id", id);
  }, []);

  return (
    <>
      <section className="min-h-screen bg-transparent flex flex-col w-full h-full">
        <div className="p-3 border-b-2 border-cyan-200">
          <div className="flex justify-evenly ">
            <img
              src="https://i1.wp.com/cdn.auth0.com/avatars/ad.png?ssl=1"
              alt="UserLog..."
              className="rounded-full"
            />
            <div>
              <Typography className="text-white p-2 font-family">
                UserName
              </Typography>
              <Typography className="text-white p-2 font-family">
                Some data Some data Some data{" "}
              </Typography>
            </div>
          </div>
          <div></div>
        </div>
        <div className="p-3 ">
          <section className="overflow-hidden text-gray-700 ">
            <div className="container   mx-auto pt-5 ">
              <div className="flex flex-wrap -m-1 md:-m-2 justify-center">
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
