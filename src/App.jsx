import { useEffect } from "react";
import { navbarOnScroll} from "./assets/js/scripts";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  useEffect(() => {
    navbarOnScroll();
  });

  return (
    <RouterProvider router={router} ></RouterProvider>
  );
}

export default App;
