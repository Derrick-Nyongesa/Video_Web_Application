import type { NextPage } from "next";
import axios from "axios";
import { Video } from "./types";
import VideoComponent from "../components/VideoComponent";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div>
      <h1 className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoComponent post={video} key={video._id}></VideoComponent>
          ))
        ) : (
          <NoResults text={"No Videos"}></NoResults>
        )}
      </h1>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  // console.log(response.data.name);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
