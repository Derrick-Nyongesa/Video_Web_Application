import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoComponent from "../../components/VideoComponent";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../types";
import { BASE_URL } from "../../utils";
import { BsFillCollectionPlayFill } from "react-icons/bs";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

function Profile({ data }: IProps) {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>

        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center capitalize">
            <span>{user.userName} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium lowercase _name italic">
            {" "}
            @{user.userName.replace(/\s+/g, "")}
          </p>
          <div>
            <div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-gray-500 rounded">
              <p className="text-2xl">
                <BsFillCollectionPlayFill></BsFillCollectionPlayFill>
              </p>
              <span className="capitalize text-xl ">
                {videosList?.length || 0} Videos
              </span>
            </div>

            <p className="_videosNo"> </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoComponent key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
