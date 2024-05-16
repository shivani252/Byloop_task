import React from "react";
import "./App.css";
import { Route, Routes,ToastContainer } from "./libraries/libraries.js";
import { FormLogic,DashboardLogic } from "./component/index.js";
import { dashboard, home, signIn, signUp } from "./routes/route";
import { ProtectedRoute } from "./routes/protecteRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path={home} element={<FormLogic />} />
        <Route path={signIn} element={<FormLogic />} />
        <Route path={signUp} element={<FormLogic />} />
        <Route path={dashboard} element={<ProtectedRoute><DashboardLogic /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;