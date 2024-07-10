import { useGetCurrentUser } from "@/shared/hooks/useGetCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDashboardStat } from "../hooks/useGetDashboardStat";
import { FaDollarSign, FaChartLine, FaCoins, FaReceipt } from 'react-icons/fa';

const Dashboard = () => {
  const { totalSales, isLoading, error, totalCost, totalProfit, totalSalesRevenue } = useGetDashboardStat();
  const { currentUser } = useGetCurrentUser();
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser && !currentUser.email) {
      navigate("/");
    }
  }, [currentUser]);

  if (isLoading) {
    return <div className="text-3xl text-black">Loading...</div>;
  }

  if (error) {
    return <div>Error loading Dashboard...</div>;
  }
  return (
    <div>
    <div className="flex space-x-4 mb-5">
  <div className="flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-[70%]">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Sales Overview
    </h2>
    <div className="flex justify-between space-x-4">
      <div className="flex-1 bg-red-500 flex items-center p-4 rounded-lg">
        <span className="text-sm text-gray-100 font-semibold flex items-center justify-between gap-4 ">
        <FaDollarSign className="text-white text-2xl " />
          <span>
          <p>{totalSales}</p> 
          <p className="  ">Total Sales</p>
          </span>
        </span>
      </div>
      <div className="flex-1 bg-green-500 flex items-center p-4 rounded-lg">
        <span className="text-sm text-gray-100 font-semibold flex items-center justify-between gap-2 ">
        <FaChartLine className="text-white text-2xl mr-4" />
        <span>
          <p >{totalSalesRevenue}</p>
          <p >Revenue</p>
        </span>
        </span>
      </div>
      <div className="flex-1 bg-blue-500 flex items-center p-4 rounded-lg">
        <FaCoins className="text-white text-2xl mr-4" />
        <p className="text-sm text-gray-100 font-semibold">
          <span className="block">{totalProfit}</span>
          <span className="mt-2">Total Profit</span>
        </p>
      </div>
      <div className="flex-1 bg-purple-500 flex items-center p-4 rounded-lg">
        <FaReceipt className="text-white text-2xl mr-4" />
        <p className="text-sm text-gray-100 font-semibold">
          <span className="block">{totalCost}</span>
          <span className="mt-2">Total Cost</span>
        </p>
      </div>
    </div>
  </div>
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-[20%]">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Card Title
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      Card content goes here.
    </p>
  </div>
</div>

      {/* Purchase div  */}

      <div className="flex space-x-4 mb-5">
  <div className="flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-[70%]">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Purchase Overview
    </h2>
    <div className="flex justify-between space-x-4">
      <div className="flex-1 bg-red-500 flex items-center p-4 rounded-lg">
        <span className="text-sm text-gray-100 font-semibold flex items-center justify-between gap-4 ">
        <FaDollarSign className="text-white text-2xl " />
          <span>
          <p>{totalSales}</p> 
          <p className="  ">Total Sales</p>
          </span>
        </span>
      </div>
      <div className="flex-1 bg-green-500 flex items-center p-4 rounded-lg">
        <span className="text-sm text-gray-100 font-semibold flex items-center justify-between gap-2 ">
        <FaChartLine className="text-white text-2xl mr-4" />
        <span>
          <p >{totalSalesRevenue}</p>
          <p >Revenue</p>
        </span>
        </span>
      </div>
      <div className="flex-1 bg-blue-500 flex items-center p-4 rounded-lg">
        <FaCoins className="text-white text-2xl mr-4" />
        <p className="text-sm text-gray-100 font-semibold">
          <span className="block">{totalProfit}</span>
          <span className="mt-2">Total Profit</span>
        </p>
      </div>
      <div className="flex-1 bg-purple-500 flex items-center p-4 rounded-lg">
        <FaReceipt className="text-white text-2xl mr-4" />
        <p className="text-sm text-gray-100 font-semibold">
          <span className="block">{totalCost}</span>
          <span className="mt-2">Total Cost</span>
        </p>
      </div>
    </div>
  </div>
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-[20%]">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Card Title
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      Card content goes here.
    </p>
  </div>
</div>


    </div>
  );
};

export default Dashboard;
