import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import UserLogin from "./components/auth/UserLogin";
import UserRegistration from "./components/auth/UserRegistration";
import Home from "./components/home/Home";
import { useDispatch } from "react-redux";
import { setUserActions } from "./store/actions/userActions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserActions());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserRegistration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
