import Body from "./pages/body";
import Navbar from "./components/header/navbar";
import Favourites from "./components/favourites/favourites";
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  let { isDarkMode } = useSelector((state) => state.photo);
  let route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Body />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    )
  );

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : "bg-white"} min-h-lvh`}>
      <RouterProvider router={route} />
    </div>)
};

export default App;
