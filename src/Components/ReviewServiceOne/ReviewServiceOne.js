import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";

const ReviewServiceOne = ({ service }) => {
  const { user } = useContext(AuthContext);
  const { description, price, name, img, _id } = service;
  console.log("sertvie", service);
  const handleReview = (event) => {
    event.preventDefault();
    const userName = event.target.name.value;
    const rating = event.target.rating.value;
    const message = event.target.yourMessage.value;
    const userReview = {
      name: userName,
      email: user?.email,
      image: user?.photoURL,
      service_id: _id,
      rating,
      message,
      service_title: name,
    };

    fetch("https://car-service-server-beta.vercel.app/review", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("successfully added review");
          event.target.reset();
        }
      });
  };

  return (
    <div>
      {/* review section */}
      <section className="py-24 bg-gray-600">
        <div className="text-center text-4xl mb-5 text-white"></div>
        <h1 className="text-center text-white font-extrabold font-mono lg:text-4xl text-2xl">
          Review This Service
        </h1>
        <div className="text-center mx-5">
          <form onSubmit={handleReview}>
            <div className="lg:flex gap-5 items-center justify-center">
              <div className="border-2  lg:w-1/2 w-full my-3  rounded-lg border-green-300">
                <input
                  className="w-full py-2 bg-black-200 text-2xl px-5"
                  type="text"
                  defaultValue={user?.displayName}
                  name="name"
                  placeholder="Your Name"
                  id=""
                  required
                />
              </div>
              <div className="border-2 lg:w-1/2 w-full rounded-lg border-green-300">
                <input
                  className="w-full py-2 bg-black-200 text-2xl px-5"
                  type="text"
                  name="rating"
                  placeholder="Your Ratings"
                  id=""
                />
              </div>
            </div>
            <div className="my-2 border-green-300 ">
              <textarea
                className=" w-full my-2 py-2 bg-black-200 text-2xl px-5 resize-none"
                name="yourMessage"
                placeholder="Your Message Here...."
                id=""
                cols="30"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-center my-5">
              <button className="btn btn-success border-green-300 px-10" type="submit">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ReviewServiceOne;
