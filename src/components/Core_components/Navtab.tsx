import { useState } from "react";
import { NavLink } from "react-router-dom";

type prop = {
  menu: {name:string, path:string}[];
};
const Navtab = ({ menu }: prop) => {
  const [activeTab, setActiveTab] = useState("Home");
   const [isOpen, setIsOpen] = useState(false);
   
  return (
   <nav className="h-16 ">
      <div className="fixed bg-gray-800 w-screen z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-white font-bold text-xl flex items-center">
                <img
                  src="https://documents.iplt20.com/ipl/assets/images/favicon.ico"
                  alt="logo"
                  className="scale-75"
                />
                <p className="my-auto">Iplaura</p>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-4">
              {menu.map((item, index) => (
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

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                // X icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 pb-4">
            <div className="flex flex-col space-y-1 pt-2">
              {menu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium ${
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
        )}
      </div>
    </nav>
  );
};

export default Navtab;
