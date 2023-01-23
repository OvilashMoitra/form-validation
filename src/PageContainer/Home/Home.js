import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [profile, setProfile] = useState(null);
  const [sector, setSector] = useState([]);

  //   get all sec(tors from db
  const getSector = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}sector`)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        console.log(response.data?.[0]?.sector);
        setSector(response.data?.[0]?.sector);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  //   get user's data from db if there is any
  useEffect(() => {
    const name = localStorage.getItem("name");
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}profile?name=${name}`)
      .then(function (response) {
        // handle success
        if (response.data !== "") {
          setProfile(response.data);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    getSector();
  }, []);
  //   post function to store data to db
  const postData = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}profile/post`, {
        data,
      })
      .then(function (response) {
        toast.success("Your profile has been created successfully");
      })
      .catch(function (error) {
        toast.error("Something went wrong try again");
        return;
      });
  };
  //   create profile
  const onSubmit = async (data) => {
    // check if the name is already in the db
    if (profile?.name?.toUpperCase() === data?.name.toUpperCase()) {
      toast.error("Already exist.Try differnt name");
      return;
    }
    console.log(data);
    localStorage.setItem("name", data.name);
    await postData(data);
    reset();
  };
  //   update profile
  const onUpdate = async (data) => {
    localStorage.setItem("name", data.name);
    await axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}profile/update?id=${profile._id}`,
        {
          data,
        }
      )
      .then(function (response) {
        toast.success("Your profile has been updated successfully");
      })
      .catch(function (error) {
        toast.error("Something went wrong try again");
        return;
      });
    reset();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home || Form</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-[700px] w-[90%] px-10 bg-white shadow-inner mx-auto my-10 py-10 rounded-lg border-solid border-black border-[1px]"
      >
        <h1 className="text-2xl font-bold text-center">Form</h1>

        <fieldset className="text-left">Enter your name here</fieldset>
        <input
          className="block bg-blue-200 text-black w-full py-2 px-rounded rounded-md pl-2"
          {...register("name", { required: true })}
          aria-invalid={errors.name ? "true" : "false"}
          placeholder="Enter your name"
          defaultValue={profile?.name ? profile.name : ""}
        />
        {errors.name?.type === "required" && (
          <p className="text-red-400" role="alert">
            Name is required
          </p>
        )}
        <fieldset className="text-left">Select the sector</fieldset>
        <select
          className="block bg-blue-200 text-black w-full py-2 px-rounded rounded-md pl-2"
          {...register("sector", { required: true })}
          aria-invalid={errors.sector ? "true" : "false"}
        >
          <option
            value={profile?.sector ? profile.sector : ""}
            disabled
            selected
          >
            Select the sector
          </option>
          {sector.map((elem) => (
            <option key={uuidv4()} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        {errors.sector?.type === "required" && (
          <p className="text-red-400" role="alert">
            Sector is required
          </p>
        )}

        <fieldset className="flex justify-start my-2">
          <input
            {...register("terms", { required: "Terms is required" })}
            aria-invalid={errors.terms ? "true" : "false"}
            type="checkbox"
            className="inline-block w-4"
            id="terms"
          />
          <label for="terms">Agree to terms</label>
        </fieldset>
        {/* <br /> */}
        {errors.terms && (
          <p className="text-red-400" role="alert">
            {errors.terms?.message}
          </p>
        )}
        <fieldset className="flex w-[40%] mx-auto">
          <input
            type="submit"
            value={
              profile?.name ? "Create another new Profile" : "Create Profile"
            }
            class="w-[200px] mx-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 mb-2"
          />
          {profile?.name ? (
            <input
              type="Submit"
              value="Update"
              class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleSubmit(onUpdate)}
            />
          ) : null}
        </fieldset>
        <Link
          className="text-white w-[150px] mx-auto bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          to={"/profile"}
        >
          See my profile
        </Link>
      </form>
    </>
  );
};

export default Home;
