import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import logo from "../img/logo.png";
import { motion, useAnimation } from "framer-motion";


const Sidebar = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          //   // ease: [0, 0.71, 0.2, 1.01],
        }}
     className="sidebar">
      <Navbar />
      <Search/>
      <Chats/>
    </motion.div>
  );
};

export default Sidebar;
