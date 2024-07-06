import { useGetCurrentUser } from "@/shared/hooks/useGetCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSales } from "../../Sales/hooks/useGetSales";

const Dashboard = () => {
  const { currentUser } = useGetCurrentUser();
  const {} = useGetSales()
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !currentUser.email) {
      navigate("/");
    }
  }, [currentUser]);
  
  return (
    <div>
      <div className="flex space-x-4 mb-5 ">
        <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Sales Overview
          </h2>
          <div className="flex space-x-4 space-y-4 ">
            <div className=" bg-red-500">
              Lorem ipsum dolor sit amet. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Animi, hic.
            </div>
            <div className=" bg-green-500">Lorem ipsum dolor sit amet.</div>
            <div className=" bg-blue-500">Lorem ipsum dolor sit amet.</div>
            <div className=" bg-red-500">Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Card Title
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Card content goes here. This is where you can add any text or
            additional components.
          </p>
        </div>
      </div>

      {/* Purchase div  */}

      <div className="flex space-x-4 ">
        <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Purchase Overview
          </h2>
          <div className="flex space-x-4 ">
            <div className=" bg-red-500">
              Lorem ipsum dolor sit amet. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Animi, hic.
            </div>
            <div className=" bg-green-500">Lorem ipsum dolor sit amet.</div>
            <div className=" bg-blue-500">Lorem ipsum dolor sit amet.</div>
            <div className=" bg-red-500">Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Card Title
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Card content goes here. This is where you can add any text or
            additional components.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
