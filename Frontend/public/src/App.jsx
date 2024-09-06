import "./App.css";
import router from "./routers";
import { RouterProvider } from "react-router-dom";

function App() {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
