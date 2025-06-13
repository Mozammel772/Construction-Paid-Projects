import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiLogout, HiMenuAlt1 } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const UserLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logOut } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
   <div className="flex">
  {/* Sidebar */}
  <Sidebar
    isSidebarOpen={isSidebarOpen}
    handleSidebarToggle={handleSidebarToggle}
  />

  {/* Main Content */}
  <div className="flex-1 flex flex-col">
    {/* Top Navbar */}
    <div className="navbar bg-base-100 shadow-md w-full flex justify-between items-center fixed top-0 left-0 z-[100] h-16">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden bg-blue-900 text-white px-3 py-1 hover:bg-blue-600 rounded-md"
          onClick={handleSidebarToggle}
        >
          <HiMenuAlt1 className="w-7 h-7" />
        </button>
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
              />
            </div>
          </div>
        </button>

        {isDropdownOpen && (
          <ul className="absolute right-0 mt-3 w-48 lg:w-56 bg-white shadow-lg rounded-lg p-2 z-50 border">
            <li>
              <Link
                to="/my-profile"
                className="p-2 flex items-center gap-2 hover:bg-gray-100"
                onClick={() => {
                  handleMenuClick();
                  setDropdownOpen(false);
                }}
              >
                <CgProfile className="w-5 h-5 text-gray-600" /> Profile
              </Link>
            </li>
            <li>
              <Link
                to="/password-change"
                className="p-2 flex items-center gap-2 hover:bg-gray-100"
                onClick={() => {
                  handleMenuClick();
                  setDropdownOpen(false);
                }}
              >
                <MdPassword className="w-5 h-5 text-gray-600" /> Password Change
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                className="flex items-center gap-2 p-2 w-full hover:bg-red-100 text-red-600 font-semibold"
              >
                <HiLogout className="w-5 h-5" /> LogOut
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>

    {/* Outlet/Main Content */}
    <div className="flex-1 overflow-y-auto px-3 lg:px-8 pt-16 lg:ml-56 min-h-screen">
      <Outlet />
    </div>
  </div>
</div>

  );
};

export default UserLayout;

// import { useState } from "react";
// import { CgProfile } from "react-icons/cg";
// import { HiLogout, HiMenuAlt1 } from "react-icons/hi";
// import { MdPassword } from "react-icons/md";
// import { Link, Outlet } from "react-router-dom";

// import Sidebar from "../components/Sidebar/Sidebar";
// import useAuth from "../hooks/useAuth";

// const UserLayout = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const { logOut } = useAuth();

//   const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);
//   const handleMenuClick = () => setSidebarOpen(false);

//   return (
//     <div className="flex min-h-screen bg-red-50">
//       {/* Sidebar */}
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         handleSidebarToggle={handleSidebarToggle}
//       />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <nav className="fixed top-0 left-0 w-full h-16 bg-base-100 shadow z-50 flex items-center justify-between px-4">
//           {/* Sidebar toggle button for mobile */}
//           <button
//             className="lg:hidden bg-blue-700 text-white px-3 py-1 hover:bg-blue-600 rounded-md"
//             onClick={handleSidebarToggle}
//           >
//             <HiMenuAlt1 className="w-6 h-6" />
//           </button>

//           {/* Profile dropdown */}
//           <div className="relative">
//             <button
//               className="flex items-center gap-2"
//               onClick={() => setDropdownOpen(!isDropdownOpen)}
//             >
//               <div className="avatar">
//                 <div className="w-10 rounded-full">
//                   <img
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     alt="avatar"
//                   />
//                 </div>
//               </div>
//             </button>

//             {isDropdownOpen && (
//               <ul className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-2 z-50">
//                 <li>
//                   <Link
//                     to="/user/profile"
//                     className="flex items-center gap-2 p-2 hover:bg-gray-100 text-sm font-medium"
//                     onClick={() => {
//                       handleMenuClick();
//                       setDropdownOpen(false);
//                     }}
//                   >
//                     <CgProfile className="w-5 h-5 text-gray-600" />
//                     প্রোফাইল
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/user/password"
//                     className="flex items-center gap-2 p-2 hover:bg-gray-100 text-sm font-medium"
//                     onClick={() => {
//                       handleMenuClick();
//                       setDropdownOpen(false);
//                     }}
//                   >
//                     <MdPassword className="w-5 h-5 text-gray-600" />
//                     পাসওয়ার্ড
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={logOut}
//                     className="flex items-center gap-2 p-2 w-full text-left hover:bg-red-100 text-red-600 text-sm font-semibold"
//                   >
//                     <HiLogout className="w-5 h-5" />
//                     লগ আউট
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </div>
//         </nav>

//         {/* Content Area */}
//         <main className="flex-grow pt-16 px-4 lg:ml-64">
//           <div className=" py-3">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;
