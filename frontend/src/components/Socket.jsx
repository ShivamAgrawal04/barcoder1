// import React, { useEffect, useState } from "react";

// import { io } from "socket.io-client";
// import { useAuth } from "../context/AuthContext";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   //   autoConnect: false,
// });

// const Socket = () => {
//   const { user } = useAuth();
//   const [menu, setMenu] = useState([]);

//   useEffect(() => {
//     socket.on("menuUpdated", (newData) => {
//       console.log("Menu updated", newData);
//       // Update local state here
//     });

//     return () => {
//       socket.off("menuUpdated");
//     };
//   }, []);
//   return <div>Socket</div>;
// };

// export default Socket;
