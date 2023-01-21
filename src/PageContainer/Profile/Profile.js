import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    const name = localStorage.getItem("name");
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}profile?name=${name}`)
      .then(function (response) {
        // handle success
        if (response?.data !== "") {
          setProfile(response?.data);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <section className="w-[700px] px-10 bg-white shadow-inner mx-auto my-10 py-10 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <div className="flex w-[80%] mx-auto justify-center align-items-center bg-blue-200 p-10 rounded-md">
          <ul className=" text-black w-full ">
            <li>Name</li>
            <li>Sector</li>
            <li>Terms</li>
          </ul>
          <ul className=" text-black w-full">
            <li>
              {profile !== null || "" || undefined
                ? profile?.name
                : "Not provided yet"}
            </li>
            <li>
              {profile !== null || "" || undefined
                ? profile?.sector
                : "Not Seleted yet"}
            </li>
            <li>{profile !== null || "" || undefined ? "True" : "False"}</li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="flex justify-end mx-auto items-center my-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-[150px] text-left"
        >
          {profile !== null ? `Update Profile ` : `Create Profile `}
          <CgProfile className="inline-block" />
        </Link>
      </section>
    </div>
  );
};

export default Profile;
