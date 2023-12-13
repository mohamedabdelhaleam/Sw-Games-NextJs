import React from "react";

const Response = ({ message, type }) => {
  return (
    <div
      className={`${
        type === false ? `bg-green-500` : `bg-red-500`
      } text-center flex justify-center items-center w-3/4 m-auto rounded-md text-white py-2 my-12`}
    >
      <div>{message}</div>
    </div>
  );
};

export default Response;
