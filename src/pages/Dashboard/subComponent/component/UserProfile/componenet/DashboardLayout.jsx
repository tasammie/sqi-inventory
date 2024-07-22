import React, { useState } from "react";
import { Bell, LogInIcon, LogOut, Search, Settings, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useGetCurrentUser from "@/shared/hooks/useGetCurrentUser";
import { motion } from "framer-motion";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { logout, currentUser } = useGetCurrentUser();


  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Inventory", icon: <InventoryIcon /> },
    { label: "Orders", icon: <InventoryIcon /> },
    { label: "Sales", icon: <InventoryIcon /> },
    { label: "Reports", icon: <ReportsIcon /> },
    { label: "Supplier", icon: <SupplierIcon /> },
    { label: "LogsActivities", icon: <CustomersIcon /> },
  ];

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#f0f0f0",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex fixed w-full h-[100vh] max-h[100vh] overflow-y-hidden ">
      {/* Sidebar */}
      <motion.aside
        className={`flex h-[100%] w-[30%] lg:w-[20%] flex-col px-5 py-8 overflow-y-hidden bg-white border-r dark:bg-gray-900 dark:border-gray-700 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
        initial="hidden"
        animate="visible"        variants={sidebarVariants}
      >
        <a href="#">
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6 ">
          <nav className="-mx-3 space-y-3 ">
            <div className="space-y-2">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                Analytics
              </label>

              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={
                    item.label === "Dashboard"
                      ? "/dashboard"
                      : `/dashboard/${item.label}`
                  }
                  className={({ isActive, isPending }) =>
                    `${
                      isPending
                        ? "text-red-900"
                        : isActive
                        ? "text-blue-400"
                        : "text-gray-600 dark:text-gray-200"
                    } flex items-center px-3 py-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200  active:bg-gray-100`
                  }
                >
                  {/* <NavItem label={item.label} icon={item.icon} /> */}
                  <motion.div
                    className="flex items-center"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {item.icon}
                    <span className="mx-2 text-sm font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                </NavLink>
              ))}
            </div>
          </nav>
          <div className="mt-20 space-y-1 -mx-3">
            <NavItem label="Settings" icon={<Settings className="w-5 h-5" />} />

            <div
              className="flex items-center space-x-1 text-red-400 cursor-pointer"
              onClick={logout}
            >
              <LogInIcon className="w-5 h-5 ml-2.5 mr-1.5" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 w-full h-[100%] 600 overflow-y-scroll ">
        <header className="fixed w-[100%]  lg:w-[80%] bg-white dark:bg-gray-900 z-30 ">
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <div className="flex items-center">
              {/* Toggle Button */}
              <button
                className="text-gray-600 focus:outline-none lg:hidden"
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </button>

              {/* Search Input */}
              {/* <div className="relative mx-4 lg:mx-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </span>

                <input
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  placeholder="Search"
                />
              </div> */}
            </div>

          
             {/* Right Header Icons */}
             <div className="flex items-center">
              <button className="mx-4 text-gray-600 dark:text-gray-300 focus:outline-none">
                <Bell className="w-6 h-6" />
              </button>

              <Link to="/Dashboard/profile/edit" className="flex items-center focus:outline-none">
                {currentUser?.profile_image && (
                  <img
                    src={currentUser.profile_image}
                    alt={`${currentUser.firstName}'s profile`}
                    className="w-10 h-10 rounded-full mx-2"
                  />
                )}
                <span className="hidden mx-2 text-gray-600 dark:text-gray-300 lg:block">
                  Hello, {currentUser?.firstName}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Here */}
        <main className="p-6 bg-white text-black  mt-[80px]">
          {/* Your content goes here */}
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ label, icon }) => (
  <a
    className="flex items-center px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 active:bg-gray-100 "
    href="#"
  >
    {icon}
    <span className="mx-2 text-sm font-medium">{label}</span>
  </a>
);

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
    />
  </svg>
);

const InventoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
    />
  </svg>
);

const ReportsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const SupplierIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
    />
  </svg>
);

const CustomersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125H15m-6.75-13.5V6.108M8.25 8.25V6.108m0 0V4.5c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V8.25m6.75 0v-.755a48.474 48.474 0 00-4.875-1.882"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6 text-red-800"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6h16.5"
    />
  </svg>
);

export default DashboardLayout;

{
  /* {navItems.map((item) => (
                <Link to={item.label == 'Dashboard' ? '/dashboard' : `/dashboard/${item.label}`}>
                <NavItem key={item.label} label={item.label} icon={item.icon}  />
                </Link>
              ))} */
}
