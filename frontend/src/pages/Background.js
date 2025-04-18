import React from "react";


function Background() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('path/to/your/background-image.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)",
        zIndex: -1,
      }}
    ></div>
  );
}


export default Background;



