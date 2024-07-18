import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaChartLine, FaCoins, FaReceipt } from "react-icons/fa";
import { useGetCurrentUser } from "@/shared/hooks/useGetCurrentUser";
import { useGetDashboardStat } from "../hooks/useGetDashboardStat";
import { useGetDashboardOrderStat } from "../hooks/useGetDashboardOrderStat";
import { useGetCategory } from "../hooks/useGetCategory";
import { useGetOrders } from "../../Order/hooks/useGetOrders";
import { useGetTopselling } from "../hooks/useGetTopselling";
import { useGetLowSelling } from "../hooks/useGetLowSelling";
import {
  ListOrderedIcon,
  ListTodo,
  CornerDownLeftIcon,
  CircleUserRound,
  NotebookTabs,
} from "lucide-react";

const Dashboard = () => {
  const {
    totalSales,
    isLoading,
    error,
    totalCost,
    totalProfit,
    totalSalesRevenue,
  } = useGetDashboardStat();
  const {
    totalOrders,
    totalRevenue,
    returnedOrderRevenue,
    numberOfReturnedOrders,
  } = useGetDashboardOrderStat();
  const { pendingOrders } = useGetOrders();
  const { category } = useGetCategory();
  const { currentUser } = useGetCurrentUser();
  const { result: topSellingProducts } = useGetTopselling();
  const { lowStockProducts } = useGetLowSelling();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !currentUser.email) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (isLoading) {
    return <div className="text-3xl text-black">Loading...</div>;
  }

  if (error) {
    return <div>Error loading Dashboard...</div>;
  }

  return (
    <div className="p-2 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-3 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black mb-4">
            Sales Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-gray-200 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center gap-1">
                <FaDollarSign className="text-red-500 text-2xl" />
                <span>
                  <p>{totalSales}</p>
                  <p>Total Sales</p>
                </span>
              </span>
            </div>
            <div className="bg-white border-gray-300 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center gap-1">
                <FaChartLine className="text-green-500 text-2xl mr-4" />
                <span>
                  <p>{totalSalesRevenue}</p>
                  <p>Revenue</p>
                </span>
              </span>
            </div>
            <div className="bg-white border-gray-300 border flex items-center p-4 rounded-lg">
              <FaCoins className="text-blue-500 text-2xl mr-4" />
              <p className="text-sm text-dark font-semibold">
                <span className="block">{totalProfit}</span>
                <span className="mt-2">Total Profit</span>
              </p>
            </div>
            <div className="bg-white border-gray-300 border flex items-center p-4 rounded-lg">
              <FaReceipt className="text-purple-500 text-2xl mr-4" />
              <p className="text-sm text-black font-semibold">
                <span className="block">{totalCost}</span>
                <span className="mt-2">Total Cost</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Inventory Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-gray-200 border rounded-lg">
              <span className="text-sm text-gray-900 font-semibold flex items-center p-2 justify-between flex-col gap-2">
                <ListOrderedIcon className="text-green-600 text-[18px] mb-1" />
                <p className="text-[20px]">{category}</p>
                <p className="text-[12px]">Quantity in Hand</p>
              </span>
            </div>
            <div className="bg-white border-gray-200 border rounded-lg">
              <span className="text-sm text-gray-900 font-semibold flex items-center p-2 justify-between flex-col gap-2">
                <ListTodo className="text-red-700 text-[18px] mb-1" />
                <p className="text-[20px]">{pendingOrders}</p>
                <p className="text-[12px]">To be Received</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-3 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black mb-2">
            Purchase Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-gray-200 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center gap-1">
                <FaDollarSign className="text-red-500 text-2xl" />
                <span>
                  <p>{totalOrders}</p>
                  <p>Purchase</p>
                </span>
              </span>
            </div>
            <div className="bg-white border-gray-200 border flex items-center p-4 rounded-lg">
              <span className="text-sm text-black font-semibold flex items-center gap-1">
                <FaChartLine className="text-green-500 text-2xl mr-4" />
                <span>
                  <p>{totalRevenue}</p>
                  <p>Cost</p>
                </span>
              </span>
            </div>
            <div className="bg-white border-gray-200 border flex items-center p-4 rounded-lg">
              <FaCoins className="text-blue-500 text-2xl mr-4" />
              <p className="text-sm text-black font-semibold">
                <span className="block">{returnedOrderRevenue}</span>
                <span className="mt-2">C of R</span>
              </p>
            </div>
            <div className="bg-white border-gray-200 border flex items-center p-4 rounded-lg">
              <CornerDownLeftIcon className="text-purple-500 text-3xl mr-4" />
              <p className="text-sm text-black font-semibold">
                <span className="block">{numberOfReturnedOrders}</span>
                <span className="mt-2">Returned</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Product Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-gray-200 border rounded-lg">
              <span className="text-sm text-gray-900 font-semibold flex items-center p-2 justify-between flex-col gap-2">
                <CircleUserRound className="text-[#24B8F1] text-[18px] mb-1" />
                <p className="text-[20px]">{category}</p>
                <p className="text-[11.5px]">Number of Suppliers</p>
              </span>
            </div>
            <div className="bg-white border-gray-200 border rounded-lg">
              <span className="text-sm text-gray-900 font-semibold flex items-center py-2  justify-between flex-col gap-2">
                <NotebookTabs className="text-[#4a3fb9]  mb-1" />
                <p className="text-[20px]">{category}</p>
                <p className="text-[10px] font-bold">Number of Categories</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Product and Low Quantity Stock Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-3 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black mb-4">
            Top Selling Product
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                   product Name
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Sold Quantity
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Remaining Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts?.slice(0, 3).map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 border-b whitespace-nowrap">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-800">
                      {product.totalSold}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-800">
                      {product.remainingQuantity}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-sm text-gray-800">
                      {product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-8">
            Low Quantity Stock
          </h2>
          <div>
            {lowStockProducts?.slice(0,3).map((product) => (
              <div
                key={product.id}
                className="flex flex-row  items-center justify-between p-2 border-b"
              >
                <span>
                  <p className="py-2">{product.name}</p>
                  <p className="text-sm text-gray-900">
                    Remaining Quantity : {product.stock}
                  </p>
                </span>
                <p className="bg-red-200 p-2 text-sm font-semibold text-red-600 rounded-xl">
                  Low
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
