import { useState } from "react";
import { NavLink } from "react-router-dom";

type prop = {
  menu: {name:string, path:string}[];
};
const Navtab = ({ menu }: prop) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-white font-bold text-xl flex ">
              {/* You can replace this with an actual logo image */}
             <img src="https://documents.iplt20.com/ipl/assets/images/favicon.ico" alt="logo" className="scale-75" />
             <p className="my-auto">Iplaura</p>
            </div>
          </div>

          {/* Navigation tabs on the right */}
          <div className="flex">
            <div className="flex space-x-4">
              {menu.map((item: any,index) => (
                <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navtab;
