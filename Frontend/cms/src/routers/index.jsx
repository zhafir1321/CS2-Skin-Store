import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Toastify from "toastify-js";
import AddItemKnife from "../views/AddItem/AddItemKnife";
import AddItemPistol from "../views/AddItem/AddItemPistol";
import AddItemRifle from "../views/AddItem/AddItemRifle";
import AddItemSmg from "../views/AddItem/AddItemSmg";
import AddItemShotgun from "../views/AddItem/AddItemShotgun";
import AddItemMachinegun from "../views/AddItem/AddItemMachinegun";
import EditItem from "../views/EditItem/EditPistol";

const url = "http://34.87.177.220/";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: async () => {
      if (localStorage.access_token) {
        Toastify({
          text: "Already Logged In",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/home");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: async () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please Login First",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/home",
        element: <Home url={url} />,
      },
      {
        path: "/sell-item-knife",
        element: <AddItemKnife url={url} />,
      },
      {
        path: "/sell-item-pistol",
        element: <AddItemPistol url={url} />,
      },
      {
        path: "/sell-item-rifle",
        element: <AddItemRifle url={url} />,
      },
      {
        path: "/sell-item-smg",
        element: <AddItemSmg url={url} />,
      },
      {
        path: "/sell-item-shotgun",
        element: <AddItemShotgun url={url} />,
      },
      {
        path: "/sell-item-machinegun",
        element: <AddItemMachinegun url={url} />,
      },
      {
        path: "/edit-item/:id",
        element: <EditItem url={url} />,
      },
    ],
  },
]);

export default router;
