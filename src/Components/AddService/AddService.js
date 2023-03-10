import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  const handleSubmitService = (event) => {
    event.preventDefault();
    const serviceTitle = event.target.serviceName.value;
    const price = event.target.price.value;
    const image = event.target.image.value;
    const description = event.target.description.value;
    const serviceInfo = {
      name: serviceTitle,
      createdAt: new Date(),
      price,
      img: image,
      description,
    };

    fetch(`https://car-service-server-beta.vercel.app/addservice/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceInfo),
    })
      .then((result) => {
        toast.success("successfully added new service");
        navigate("/service");
        event.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className=" py-20 bg-gray-700 text-center">
      <h2 className="lg:text-4xl text-2xl text-white font-extrabold font-mono py-3">
        Add Your OWN Service Here
      </h2>
      <div>
        <form onSubmit={handleSubmitService} className="shadow-2xl">
          <div className="mx-10">
            <input
              className="border-2 shadow-white border-green-300 lg:w-1/2 w-full py-3 px-3 font-bold my-3 rounded-lg"
              type="text"
              name="serviceName"
              placeholder="Enter Service Name here..."
              id=""
              required
            />
          </div>
          <div className="mx-10">
            <input
              className="border-2 border-green-300 lg:w-1/2 w-full  py-3 px-3 font-bold my-3 rounded-lg"
              type="text"
              name="price"
              placeholder="Enter Service Fee..."
              required
            />
          </div>
          <div className="mx-10">
            <input
              className="border-2 border-green-300 lg:w-1/2 w-full py-3 px-3 font-bold my-3 rounded-lg"
              type="text"
              name="image"
              placeholder="Enter a photoURL...."
              required
            />
          </div>
          <div className="mx-10">
            <textarea
              className="border-2 resize-none border-green-300 lg:w-1/2 w-full py-3 px-3 font-bold my-3 rounded-lg"
              name="description"
              placeholder="Service Description Here...."
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success my-5 px-10 lg:text-3xl text-2xl "
            >
              Submit service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
