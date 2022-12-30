import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Discover from "../components/Discover";
import SuggestedAccounts from "../components/SuggestedAccounts";
import Footer from "../components/Footer";
import useAuthStore from "../store/authStore";
import { createOrGetUser } from "../utils/index";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);

  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const { userProfile, addUser, removeUser } = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#D31027] rounded";

  const { pathname } = useRouter();

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome></AiFillHome>
                </p>
                <span className="capitalize text-xl hidden xl:block">HOME</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="_text_">
                Log in to Upload, Like and Comment on videos
              </p>
              <br />
              <div className="pr-4 ">
                <GoogleLogin
                  onSuccess={(response) => createOrGetUser(response, addUser)}
                  onError={() => console.log("Error")}
                ></GoogleLogin>
                {/* <GoogleLogin
                  clientId=""
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#F51997]
                      border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log In
                    </button>
                  )}
                ></GoogleLogin> */}
              </div>
            </div>
          )}
          <Discover></Discover>
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          ></SuggestedAccounts>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
