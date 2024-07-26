import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../img/logo2.png";
import { motion, useAnimation } from "framer-motion";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    // <div className="mainContainer">

    <div className="formContainer">
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          //   // ease: [0, 0.71, 0.2, 1.01],
        }}
        className="logoLForm"
      >
        <img className="logofirst" src={logo} alt="" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          //   // ease: [0, 0.71, 0.2, 1.01],
        }}
        className="formWrapper"
      >
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <motion.input
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }}
            type="email"
            placeholder="Email"
          />
          <motion.input
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }}
            type="password"
            placeholder="Enter Password"
          />
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            Sign in
          </motion.button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
    // </div>
  );
};

export default Login;
