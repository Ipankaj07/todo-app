import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import CreateTodo from "../components/CreateTodo";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTodo />} />
    </Routes>
  );
}

export default AllRoutes;
