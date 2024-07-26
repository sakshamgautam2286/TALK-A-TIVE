import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/logo2.png";
import { motion, useAnimation } from "framer-motion";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <motion.div
       initial={{ opacity: 0, y: 75 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{
         duration: 0.8,
         delay: 0.25,
         //   // ease: [0, 0.71, 0.2, 1.01],
       }}
       className="logoLForm">
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
      className="formWrapper">
       
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <motion.input initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} required type="text" placeholder="Display name" />
          <motion.input initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} required type="email" placeholder="Email" />
          <motion.input initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} required type="password" placeholder="Enter password" />
          <motion.input initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <motion.img initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} 
            src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <motion.button initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              //   // ease: [0, 0.71, 0.2, 1.01],
            }} disabled={loading}>Sign up</motion.button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
