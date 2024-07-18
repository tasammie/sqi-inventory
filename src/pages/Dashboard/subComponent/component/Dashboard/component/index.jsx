import { useGetCurrentUser } from "@/shared/hooks/useGetCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDashboardStat } from "../hooks/useGetDashboardStat";
import { FaDollarSign, FaChartLine, FaCoins, FaReceipt } from 'react-icons/fa';
import { useGetDashboardOrderStat } from "../hooks/useGetDashboardOrderStat";
import { useGetCategory } from "../hooks/useGetCategory";
import { CalendarCheck, CalendarCheck2Icon, CalendarFold, CalendarMinus, CalendarPlus, CircleUserRound, CornerDownLeftIcon, ListOrderedIcon, ListTodo, NotebookTabs } from "lucide-react";
import { useGetOrders } from "../../Order/hooks/useGetOrders";
import { useGetTopselling } from "../hooks/useGetTopselling";

const Dashboard = () => {
  const { totalSales, isLoading, error, totalCost, totalProfit, totalSalesRevenue } = useGetDashboardStat();
  const { totalOrders, totalRevenue, returnedOrderRevenue, numberOfReturnedOrders } = useGetDashboardOrderStat();
  const {pendingOrders} = useGetOrders();
  const { category } = useGetCategory();
  const { currentUser } = useGetCurrentUser();
  const {result: topSellingProducts} = useGetTopselling()
  const navigate = useNavigate();

  // console.log(topSellingProducts, "topppp");
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
    <div className="p-2 space-y-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-white shadow-md rounded-lg p-3 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black dark:text-black mb-4">
            Sales Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white  bord border-gray-200 border00 border  flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center justify-between gap-1">
                <FaDollarSign className="text-red-500 text-2xl" />
                <span>
                  <p>{totalSales}</p>
                  <p>Total Sales</p>
                </span>
              </span>
            </div>
            <div className="bg-white  border-gray-300 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center justify-between gap-1">
                <FaChartLine className="text-green-500 text-2xl mr-4" />
                <span>
                  <p>{totalSalesRevenue}</p>
                  <p>Revenue</p>
                </span>
              </span>
            </div>
            <div className="bg-white  border-gray-300 border flex items-center p-4 rounded-lg">
              <FaCoins className="text-blue-500 text-2xl mr-4" />
              <p className="text-sm text-dark font-semibold">
                <span className="block">{totalProfit}</span>
                <span className="mt-2">Total Profit</span>
              </p>
            </div>
            <div className="bg-white  border-gray-300 border flex items-center p-4 rounded-lg">
              <FaReceipt className="text-purple-500 text-2xl mr-4" />
              <p className="text-sm text-black font-semibold">
                <span className="block">{totalCost}</span>
                <span className="mt-2">Total Cost</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-white shadow-md rounded-lg p-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-2">
            Inventory Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-white  border-gray-200 border  rounded-lg">
              <span className="text-sm text-gray-900 dark:text-gray-900 font-semibold flex items-center p-2  justify-between flex-col gap-2">
                <ListOrderedIcon className="text-green-600 dark:text-green-600 text-[18px] mb-1" />
                  <p className="text-[20px]">{category}</p>
                  <p className="text-[12px]">Quantity in Hand</p>
                {/* <span className="flex   flex-col ">
                </span> */}
              </span>
            </div>
            <div className="bg-white dark:bg-gray-white  border-gray-200 border  rounded-lg">
              <span className="text-sm text-gray-900 dark:text-gray-900 font-semibold flex items-center p-2  justify-between flex-col gap-2">
                <ListTodo className="text-red-700 dark:text-red-600 text-[18px] mb-1" />
                  <p className="text-[20px]">{pendingOrders}</p>
                  <p className="text-[12px] ">To be Recieved</p>
              </span>
            </div>
        
          </div>
        </div>
      </div>

      {/* Purchase Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className=" dark:bg-white shadow-md rounded-lg p-3 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black dark:text-black mb-2">
            Purchase Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white  border-gray-200 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center justify-between gap-1">
                <FaDollarSign className="text-red-500  text-2xl" />
                <span>
                  <p>{totalOrders}</p>
                  <p>Purchase</p>
                </span>
              </span>
            </div>
            <div className="bg-white  border-gray-200 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center justify-between gap-1">
                <FaChartLine className="text-green-500 text-2xl mr-4" />
                <span>
                  <p>{totalRevenue}</p>
                  <p>Cost</p>
                </span>
              </span>
            </div>
            <div className="bg-white  border-gray-200 border flex items-center p-4 rounded-lg">
              <FaCoins className="text-blue-500 text-2xl mr-4" />
              <p className="text-sm text-black font-semibold">
                <span className="block">{returnedOrderRevenue}</span>
                <span className="mt-2">C of R</span>
              </p>
            </div>
            <div className="bg-white  border-gray-200 border flex items-center p-4 rounded-lg">
            
              {/* <div className=" bg-purple-500 p-1 rounded-sm text-sm mr-2 ">
              </div> */}
              <CornerDownLeftIcon className=" rounded-sm text-purple-500 text-3xl  mr-4" />
              <p className="text-sm text-black  font-semibold">
                <span className="block">{numberOfReturnedOrders}</span>
                <span className="mt-2">Returned</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white shadow-md rounded-lg p-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-2">
            Product Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-white  border-gray-200 border  rounded-lg">
              <span className="text-sm text-gray-900 dark:text-gray-900 font-semibold flex items-center p-2  justify-between flex-col gap-2">
                <CircleUserRound className="text-[#24B8F1] dark:text-[#24B8F1] text-[18px] mb-1" />
                  <p className="text-[20px]">{category}</p>
                  <p className="text-[11.5px]">Number of Suppliers</p>
                {/* <span className="flex   flex-col ">
                </span> */}
              </span>
            </div>
            <div className="bg-white dark:bg-gray-white  border-gray-200 border  rounded-lg">
              <span className="text-sm text-gray-900 dark:text-gray-900 font-semibold flex items-center p-2  justify-between flex-col gap-2">
                <NotebookTabs className="text-[#4a3fb9] dark:text-[#4a3fb9] text-[18px] mb-1" />
                  <p className="text-[20px]">{category}</p>
                  <p className="text-[10.9px] ">Number of Categories</p>
                {/* <span className="flex   flex-col ">
                </span> */}
              </span>
            </div>
        
          </div>
        </div>
      </div>


      <div className="overflow-x-auto ">
        <div className="dark:bg-white shadow-lg rounded-lg border w-min ">
        <div>
            <h1>Top Selling Product</h1>
        </div>
          <table className=" leading-normal  ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Sold Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Remaining Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts?.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                  {product.productName}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-500">
                    {product.totalSold}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-500">
                  {product.remainingQuantity}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-500">
                    {product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
