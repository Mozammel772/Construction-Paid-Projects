// "use client"

// import { CgProfile } from "react-icons/cg"
// import {
//   FaUserShield,
//   FaGraduationCap,
//   FaFileAlt,
//   FaHistory,
//   FaBook,
//   FaUsers,
//   FaCrown,
//   FaChartLine,
// } from "react-icons/fa"
// import { HiLogout, HiX } from "react-icons/hi"
// import { MdDashboard, MdPayment, MdLibraryBooks, MdSchool } from "react-icons/md"
// import { Link, useLocation } from "react-router-dom"
// import useAuth from "../../hooks/useAuth"
// import useRole from "../../hooks/useRole"

// const Sidebar = ({ isSidebarOpen, handleSidebarToggle }) => {
//   const location = useLocation()
//   const { logOut } = useAuth()
//   const { role } = useRole()

//   const handleMenuClick = () => {
//     handleSidebarToggle()
//   }

//   const adminMenuItems = [
//     {
//       path: "/admin-dashboard",
//       icon: MdDashboard,
//       label: "Dashboard",
//       description: "Overview & Analytics",
//       color: "text-blue-400",
//     },
//     {
//       path: "/manage-users",
//       icon: FaUsers,
//       label: "Manage Users",
//       description: "User Management",
//       color: "text-green-400",
//     },
//     {
//       path: "/admin-dashboard/pending-payment",
//       icon: MdPayment,
//       label: "Pending Payments",
//       description: "Payment Processing",
//       color: "text-yellow-400",
//     },
//     {
//       path: "/admin-dashboard/manage-course",
//       icon: FaGraduationCap,
//       label: "Manage Courses",
//       description: "Course Management",
//       color: "text-purple-400",
//     },
//     {
//       path: "/resources",
//       icon: MdLibraryBooks,
//       label: "Resources",
//       description: "Learning Materials",
//       color: "text-indigo-400",
//     },
//     {
//       path: "/past-papers",
//       icon: FaFileAlt,
//       label: "Past Papers",
//       description: "Exam Archives",
//       color: "text-orange-400",
//     },
//   ]

//   const userMenuItems = [
//     {
//       path: "/user-dashboard",
//       icon: MdDashboard,
//       label: "Dashboard",
//       description: "Your Overview",
//       color: "text-blue-400",
//     },
//     {
//       path: "/user-dashboard/course-outline",
//       icon: FaBook,
//       label: "Course Outline",
//       description: "Study Plan",
//       color: "text-green-400",
//     },
//     {
//       path: "/history",
//       icon: FaHistory,
//       label: "History",
//       description: "Activity Log",
//       color: "text-purple-400",
//     },
//   ]

//   const isActive = (path) => location.pathname === path

//   const MenuItem = ({ item, onClick }) => (
//     <li className="group">
//       <Link
//         to={item.path}
//         className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out ${isActive(item.path)
//           ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
//           : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:transform hover:scale-[1.01]"
//           }`}
//         onClick={() => onClick(item.path)}
//       >
//         {/* Active indicator */}
//         {isActive(item.path) && (
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
//         )}

//         {/* Icon */}
//         <div className={`flex-shrink-0 ${isActive(item.path) ? "text-white" : item.color}`}>
//           <item.icon className="w-5 h-5" />
//         </div>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <div className="font-medium text-sm truncate">{item.label}</div>
//           {item.description && (
//             <div
//               className={`text-xs truncate ${isActive(item.path) ? "text-blue-100" : "text-gray-500 group-hover:text-gray-400"
//                 }`}
//             >
//               {item.description}
//             </div>
//           )}
//         </div>

//         {/* Hover effect */}
//         {!isActive(item.path) && (
//           <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300"></div>
//         )}
//       </Link>
//     </li>
//   )

//   return (
//     <>
//       {/* Mobile Backdrop */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
//           onClick={handleSidebarToggle}
//         />
//       )}

//       <div
//         className={`fixed inset-y-0 left-0 bg-gray-800 backdrop-blur-xl border-r border-gray-700/50 min-h-screen shadow-2xl w-64 h-full overflow-y-auto transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-all duration-300 ease-in-out lg:translate-x-0 z-[1000]`}
//       >
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50">
//           <div className="p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {/* Logo/Icon */}
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                   {role === "admin" ? (
//                     <FaCrown className="w-5 h-5 text-white" />
//                   ) : (
//                     <FaUserShield className="w-5 h-5 text-white" />
//                   )}
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
//                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                 </div>
//               </div>

//               {/* Title */}
//               <div>
//                 <h1 className="text-white font-bold text-lg leading-tight">
//                   {role === "admin" ? "Admin Panel" : "User Panel"}
//                 </h1>
//                 <p className="text-gray-400 text-xs">
//                   {role === "admin" ? "Management Console" : "Learning Dashboard"}
//                 </p>
//               </div>
//             </div>

//             {/* Close button for mobile */}
//             <button
//               className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
//               onClick={handleSidebarToggle}
//             >
//               <HiX className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="p-4 space-y-6">
//           {role === "admin" ? (
//             <>
//               {/* Admin Menu */}
//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <FaChartLine className="w-4 h-4 text-blue-400" />
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Administration</h3>
//                   <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
//                 </div>
//                 <ul className="space-y-2">
//                   {adminMenuItems.map((item) => (
//                     <MenuItem key={item.path} item={item} onClick={handleMenuClick} />
//                   ))}
//                 </ul>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* User Menu */}
//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <MdSchool className="w-4 h-4 text-green-400" />
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Learning</h3>
//                   <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
//                 </div>
//                 <ul className="space-y-2">
//                   {userMenuItems.map((item) => (
//                     <MenuItem key={item.path} item={item} onClick={handleMenuClick} />
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}

//           {/* Account Section */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <CgProfile className="w-4 h-4 text-purple-400" />
//               <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</h3>
//               <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
//             </div>
//             <ul className="space-y-2">
//               <MenuItem
//                 item={{
//                   path: "/my-profile",
//                   icon: CgProfile,
//                   label: "Profile",
//                   description: "Personal Settings",
//                   color: "text-purple-400",
//                 }}
//                 onClick={handleMenuClick}
//               />
//             </ul>
//           </div>

//           {/* Logout Section */}
//           <div className="border-t border-gray-700/50 pt-4">
//             <button
//               onClick={logOut}
//               className="group flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-300 text-red-400 hover:bg-red-600/10 hover:text-red-300 border border-transparent hover:border-red-600/20"
//             >
//               <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               <div className="flex-1">
//                 <div className="font-medium text-sm">Sign Out</div>
//                 <div className="text-xs text-gray-500 group-hover:text-red-400/70">End your session</div>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-gray-900/90 backdrop-blur-xl">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <p className="text-xs text-gray-400">System Online</p>
//             </div>
//             <p className="text-xs text-gray-500">{role === "admin" ? "Admin" : "User"} Dashboard v2.1</p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar



import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaBook,
  FaChartLine,
  FaCrown,
  FaFileAlt,
  FaGraduationCap,
  FaHistory,
  FaNewspaper,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiLogout, HiX } from "react-icons/hi";
import {
  MdDashboard,
  MdLibraryBooks,
  MdPayment,
  MdSchool,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { role } = useRole();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const allMenuItems = role === "admin" ? adminMenuItems : userMenuItems;
    const activeMenu = allMenuItems.find((item) =>
      item.subItems?.some((sub) => isActive(sub.path))
    );
    if (activeMenu) {
      setOpenDropdown(activeMenu.label);
    }
  }, [location.pathname, role]);

  const MenuItem = ({ item, onClick, level = 0 }) => {
    const isMenuActive = isActive(item.path);
    const isDropdownOpen = openDropdown === item.label;

    const indentClass = level === 1 ? "ml-4" : "";

    return (
      <li className="group w-full flex-shrink-0">
        <div
          className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer select-none w-full ${
            isMenuActive
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 transform scale-[1.01]"
              : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:transform hover:scale-[1.01]"
          } ${indentClass}`}
          onClick={() => {
            if (item.subItems) {
              toggleDropdown(item.label);
            } else {
              onClick(item.path);
            }
          }}
        >
          {isMenuActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
          )}

          <div
            className={`flex-shrink-0 ${
              isMenuActive ? "text-white" : item.color
            }`}
          >
            <item.icon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.label}</div>
            {item.description && (
              <div
                className={`text-xs truncate ${
                  isMenuActive
                    ? "text-blue-100"
                    : "text-gray-500 group-hover:text-gray-400"
                }`}
              >
                {item.description}
              </div>
            )}
          </div>

          {item.subItems && (
            <div className="flex-shrink-0 text-gray-300 group-hover:text-white transition-transform duration-200">
              {isDropdownOpen ? (
                <FiChevronUp className="w-5 h-5" />
              ) : (
                <FiChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>

        {item.subItems && isDropdownOpen && (
          <ul className="mt-1 space-y-1 w-full">
            {item.subItems.map((sub) => {
              const isSubActive = isActive(sub.path); // ✅ Add this line

              return (
                <div
                  className={isSubActive ? "w-[90%]" : "w-full"}
                  key={sub.path}
                >
                  <MenuItem item={sub} onClick={onClick} level={level + 1} />
                </div>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const adminMenuItems = [
    {
      path: "/admin-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Overview & Analytics",
      color: "text-blue-400",
    },
    {
      path: "/admin-dashboard/manage-users",
      icon: FaUsers,
      label: "Manage Users",
      description: "User Management",
      color: "text-green-400",
      subItems: [
        {
          path: "/admin-dashboard/manage-users/all-users",
          icon: FaUsers,
          label: "All Users",
          description: "Register All User",
          color: "text-green-400",
        },
        {
          path: "/admin-dashboard/manage-users/paid-users",
          icon: FaUsers,
          label: "Paid Users",
          description: "Course Purchase Users",
          color: "text-green-400",
        },
      ],
    },
    {
      path: "/admin-dashboard/pending-payment",
      icon: MdPayment,
      label: "Pending Payments",
      description: "Payment Processing",
      color: "text-yellow-400",
    },
    {
      path: "/admin-dashboard/manage-course",
      icon: FaGraduationCap,
      label: "Manage Courses",
      description: "Course Management",
      color: "text-purple-400",
    },
    {
      path: "/resources",
      icon: MdLibraryBooks,
      label: "Resources",
      description: "Learning Materials",
      color: "text-indigo-400",
    },
    {
      path: "/admin-dashboard/past-papers",
      icon: FaFileAlt,
      label: "Past Papers",
      description: "Exam Archives",
      color: "text-orange-400",
      subItems: [
        {
          path: "/admin-dashboard/past-papers/a-level",
          icon: FaFileAlt,
          label: "A Level",
          description: "Past papers for A Level",
          color: "text-orange-300",
        },
        {
          path: "/admin-dashboard/past-papers/o-level",
          icon: FaFileAlt,
          label: "O Level",
          description: "Past papers for O Level",
          color: "text-orange-300",
        },
      ],
    },
    
    {
      path: "/admin-dashboard/blog",
      icon: FaNewspaper,
      label: "Blog",
      description: "Post Of Blog",
      color: "text-indigo-400",
      subItems: [
        {
          path: "/admin-dashboard/create-a-new-blog",
          icon: FaNewspaper,
          label: "Create Blog",
          description: "Post Of Blog",
          color: "text-indigo-400",
        },
        {
          path: "/admin-dashboard/blog-history",
          icon: FaNewspaper,
          label: "Blog History",
          description: "Post Of Blog",
          color: "text-indigo-400",
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      path: "/user-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Your Overview",
      color: "text-blue-400",
    },
    {
      path: "/user-dashboard/course-outline",
      icon: FaBook,
      label: "Course Outline",
      description: "Study Plan",
      color: "text-green-400",
    },
    {
      path: "/history",
      icon: FaHistory,
      label: "History",
      description: "Activity Log",
      color: "text-purple-400",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    handleSidebarToggle();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
          onClick={handleSidebarToggle}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 backdrop-blur-xl border-r border-gray-700/50 min-h-screen shadow-2xl w-64 h-full overflow-y-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:translate-x-0 z-[1000]`}
      >
        <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  {role === "admin" ? (
                    <FaCrown className="w-5 h-5 text-white" />
                  ) : (
                    <FaUserShield className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div>
                <h1 className="text-white font-bold text-lg leading-tight">
                  {role === "admin" ? "Admin Panel" : "User Panel"}
                </h1>
                <p className="text-gray-400 text-xs">
                  {role === "admin"
                    ? "Management Console"
                    : "Learning Dashboard"}
                </p>
              </div>
            </div>

            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              onClick={handleSidebarToggle}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {role === "admin" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Administration
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {adminMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MdSchool className="w-4 h-4 text-green-400" />
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Learning
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {userMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CgProfile className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              <MenuItem
                item={{
                  path: "/my-profile",
                  icon: CgProfile,
                  label: "Profile",
                  description: "Personal Settings",
                  color: "text-purple-400",
                }}
                onClick={handleMenuClick}
              />
            </ul>
          </div>

          <div className="border-t border-gray-700/50 pt-4">
            <button
              onClick={logOut}
              className="group flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-300 text-red-400 hover:bg-red-600/10 hover:text-red-300 border border-transparent hover:border-red-600/20"
            >
              <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex-1">
                <div className="font-medium text-sm">Sign Out</div>
                <div className="text-xs text-gray-500 group-hover:text-red-400/70">
                  End your session
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
