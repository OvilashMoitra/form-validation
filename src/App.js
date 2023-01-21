import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./PageContainer/Home/Home"));
const Profile = lazy(() => import("./PageContainer/Profile/Profile"));

function App() {
  // react router path
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
