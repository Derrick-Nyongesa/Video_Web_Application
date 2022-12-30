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

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  // console.log(response.data.name);

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
