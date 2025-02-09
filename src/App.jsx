import Body from "./pages/body";
import Navbar from "./components/header/navbar";
import Favourites from "./components/favourites/favourites";
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";

const App = () => {
  let route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Body />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    )
  );

  return <RouterProvider router={route} />;
};

export default App;
