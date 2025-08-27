import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import icon from "../../../public/icon.jpg";
import useAuth from "../../hooks/useAuth";

const getNavigationLinks = (user) => {
  const baseLinks = [
    { title: "Maison", link: "/" },
    { title: "Portefeuille", link: "/portfolio" },
  ];

  if (user) {
    baseLinks.push({ title: "Tableau de bord", link: "/dashboard" });
  }

  // baseLinks.push({ title: "Contact", link: "/contact" });

  return baseLinks;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();

  const navigationLinks = getNavigationLinks(user);

  const handleMobileMenuClick = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const isActive = (link) => {
    return link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 px-2">
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center">
        <img src={icon} alt="Logo" className="h-12 w-auto" />

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-3 items-center font-bold text-lg">
          {navigationLinks.map((item, index) => (
            <div key={index} className="relative">
              {item.subLinks ? (
                <div className="flex items-center cursor-pointer">
                  <span
                    className={`inline-block px-3 py-2 rounded-md hover:text-orange-600 text-lg ${
                      isActive(item.link)
                        ? "text-orange-600 underline underline-offset-4 font-bold"
                        : "text-black"
                    }`}
                  >
                    {item.title}
                  </span>
                  {desktopSubMenu === index ? (
                    <IoMdArrowDropup size={18} />
                  ) : (
                    <IoMdArrowDropdown size={18} />
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  className={`inline-block px-3 py-2 rounded-md hover:text-orange-600 text-lg ${
                    isActive(item.link)
                      ? "text-orange-600 underline underline-offset-4 font-bold"
                      : "text-black"
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          {/* Login (only if not logged in) */}

          {user ? (
                <span
                  onClick={logOut}
                  className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-md cursor-pointer"
                >
                  Se déconnecter
                </span>
              ) : (
                <Link
                  to="/login"
                  className={`inline-block px-4 py-1.5 rounded-md ${
                    location.pathname === "/login"
                      ? "bg-orange-600 text-white"
                      : "text-white bg-orange-600 hover:bg-orange-400"
                  }`}
                >
                  Se connecter
                </Link>
              )}
        </div>

        {/* Mobile Menu Button */}
        <button className="bg-orange-100 rounded-md px-3 py-2 hover:bg-orange-200 cursor-pointer md:hidden">
          <FaBars
            onClick={() => setIsOpen(true)}
            size={24}
            className="text-orange-600"
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden">
          <div className="absolute top-2 left-2 right-2 w-[95%] mx-auto bg-white p-6 rounded-md z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <img src={icon} alt="Logo" className="h-12 w-auto" />
              <button
                className="bg-red-100 rounded-md px-2 py-1 hover:bg-red-50"
                onClick={() => setIsOpen(false)}
              >
                <CgClose
                  size={28}
                  className="text-red-600 hover:text-red-400"
                />
              </button>
            </div>
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4 font-medium text-lg mt-20">
              {navigationLinks.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  {item.subLinks ? (
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSubMenu(index)}
                    >
                      <span>{item.title}</span>
                      {activeSubMenu === index ? (
                        <IoMdArrowDropup size={22} />
                      ) : (
                        <IoMdArrowDropdown size={22} />
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={handleMobileMenuClick}
                      className={`inline-block hover:text-orange-600 ${
                        isActive(item.link)
                          ? "text-orange-600 underline underline-offset-4 font-bold"
                          : "text-black"
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}

              {/* Login (only if not logged in) */}

              {user ? (
                <span
                  onClick={logOut}
                  className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-md cursor-pointer"
                >
                  Se déconnecter
                </span>
              ) : (
                <Link
                  to="/login"
                  className={`inline-block px-4 py-1.5 rounded-md w-full ${
                    location.pathname === "/login"
                      ? "bg-orange-600 text-white"
                      : "text-white bg-orange-600 hover:bg-orange-400"
                  }`}
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
