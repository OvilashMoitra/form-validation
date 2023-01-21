import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Sectors } from "./Components/Sector";
import Home from "./PageContainer/Home/Home";
import Profile from "./PageContainer/Profile/Profile";

function App() {
  const [selected, setSelected] = useState("");
  console.log(selected);
  // sectors
  const sectors = [
    "Manufacturing",

    "Construction materials",

    "Electronics and Optics",

    " Food and Beverage",
    " option Bakery & confectionery products",

    "option Fish & fish products",

    "Milk & dairy products",

    "Sweets & snack food",

    "Furniture",

    "Bathroom/sauna",
    "Meat & meat products",

    "Bedroom",
    " Childrenâ€™s room",
    "Living room",
    "Kitchen",

    "Furniture",

    "Office",

    " Outdoor",

    "Project furniture",

    " Machinery",

    "Machinery components",

    " Machinery equipment/tools",

    " Manufacture of machinery",

    " Maritime",

    "Repair and maintenance service",

    " Metalworking",

    "Aluminium and steel workboats",

    "Boat/Yacht building",

    "Ship repair and conversion",

    "Metal structures",

    "Construction of metal structures",
    "Houses and buildings",

    "Metal products",
    "Metal works",
    "CNC-machining",
    "Forgings, Fasteners",
    "Gas, Plasma, Laser cutting",
    "MIG, TIG, Aluminum",
    "option Plastic and Rubber",
    "Packaging",
    "Plastic goods",

    "Plastic processing technology",
    "Blowing Moulding",
    "Plastics welding and processing",

    "Plastic profiles",

    " Printing",

    "Advertising",

    "Book/Periodicals printing",

    "Labelling and packaging printing",

    " Textile and Clothing",
    "Clothing",
    "Textile",
    "Wooden building materials",
    "Wooden houses",
    "Creative industries",
    "Energy technology",
    "Environment",
    "Service",
    "Business services",

    "Engineering",

    "Information Technology and Telecommunications",

    "Data processing, Web portals, E-marketing",

    "Programming, Consultancy",

    "Software, Hardware",

    "Telecommunications",
    " Tourism",
  ];

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
