import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroPage from "./Homescreen/HeroPage.jsx";
import Loginform from "./Homescreen/Loginform.jsx";
import Registerform from "./Homescreen/Registerform.jsx";
import ProfileScreen from "./Homescreen/ProfileScreen.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HeroPage />}></Route>
      <Route path="/login" element={<Loginform />}></Route>
      <Route path="/register" element={<Registerform />}></Route>
      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>
    
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
