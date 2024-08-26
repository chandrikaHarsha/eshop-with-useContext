import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WishList from "./WishList";
import Bag from "./Bag";
import ProductDetails from "./ProductDetails";
import Context from "./Context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
let routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/bag",
    element: <Bag />,
  },
]);
root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={routers} />
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
