import { lazy, Suspense } from "react";
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  );
}

export default App;
