"use client";

import React from "react";

export const RootClient = () => {
  React.useEffect(() => {
    // const image = document.querySelector(".xd");

    // if(!image) retun null;

    // function randomTwinkle() {
    //   // Random time between 500ms and 3000ms
    //   const time = Math.floor(Math.random() * 3000) + 500;

    //   // Add twinkle class for a random time
    //   image.classList.add("xd");

    //   // Remove twinkle class after a random duration
    //   setTimeout(() => {
    //     image.classList.remove("xd");
    //     // Recursively call the function to create the twinkle effect randomly
    //     setTimeout(randomTwinkle, time);
    //   }, time);
    // }

    // Start the twinkle effect
    // randomTwinkle();
  }, []);

  // window.addEventListener('load', function () {
  //   alert("It's loaded!")
  // })

  return <div className="xd" />;
};
