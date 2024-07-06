import { Link } from "react-router-dom";
import { EyeOffIcon, Pen, Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { useGetProduct } from "../../Inventory/hooks/useGetProducts";
import AddOrdersModal from "../slugs/AddOrdersModal";
import UpdateOrdersModal from "../slugs/UpdateOrderModal";
import { useGetOrders } from "../hooks/useGetOrders";
// import { useGetOrders } from "../hooks/useGetOrders";


const OrdersPage = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;
  const {
    isLoading,
    error,
    orders,
    deleteOrder,
    getOrdersForLast7Days,
    totalOrders,
    totalRevenueLast7Days,
    totalOrdersLast7Days,
    pendingOrders,
    totalPendingCost,
    totalConfirmedOrders,
    totalConfirmedRevenue,
    returnedRevenueLast7Days,
    returnedOrdersLast7Days,
    getSingleOrderById
  } = useGetOrders();
  
  const { products } = useGetProduct();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [orderToDelete, setOrderToDelete] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [showUpdateOrder, setShowUpdateOrder] = useState(false);

  const slice = (id, length) => id.slice(0, length);
  const addOrder = () => {
    setShowOrderForm(true);
    // console.log("hello");
  };

  // console.log( {totalConfirmedRevenue}, "new ooroor");
  // Ensure orders is an array or default to an empty array
  const validOrders = Array.isArray(orders) ? orders : [];

  const handleEditOrder = (order) => {
    // console.log(order)
    setSelectedOrder(order);
    // setShowOrderForm(true);
    setShowUpdateOrder(true);
  }

  const handleClose = () => {
    setSelectedOrder(null);
    setShowOrderForm(false);
    setShowUpdateOrder(false);
  }

  const handleDelete = async (id) => {
    setOrderToDelete(id);
    setShowDeleteModal(true);
    // console.log(id, "ififi");
    // await deleteOrder(id);
    // console.log("hdhdh", id);
  };

  const confirmDelete = async () => {
    if (orderToDelete) {
      await deleteOrder(orderToDelete);
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const getProductNameById = (id) => {
    // console.log(getProductNameById, "pro");
    const productItem = products ? products.find(p => p._id === id) : null;
    return productItem ? productItem.name : 'Unknown Product';
  }

  if (isLoading) {
    return <div className="text-3xl text-black">Loading...</div>;
  }

  if (error) {
    return <div>Error loading products...</div>;
  }

  if (validOrders.length === 0) {
    return <div>No available orders</div>;
  }

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = currentPage * productsPerPage;
  const currentProducts = validOrders.slice(indexOfFirstProduct, indexOfLastProduct);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-gray-800 text-xl font-bold">
            Overall Order List
          </h1>
        </div>
        <div className="flex items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
          <div className="flex bg-gray-800 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-200"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-800 outline-none ml-1 block w-full sm:w-auto"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row items-center justify-between pb-6 pr-14">
        <div className="flex space-x-4 ">
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-gray-100 text-lg font-semibold dark:text-blue-500 mb-6">
              Total Order:
             
            </h2>
            <p className="text-sm pt-6 text-gray-500 dark:text-gray-500 font-semibold mb-4">
            <span className="pr-5">{totalOrders} </span>
              Last 7 days
            </p>
          </div>
          <div className="bg-white-500 shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-lg font-semibold text-gray-100 dark:text-green-400 mb-8">
              Total Order Received:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
              <span className="flex justify-between gap-4 items-center pt-2"> <p>Last 7 days: {totalConfirmedOrders}</p>  <p>Revenue: ₦{totalConfirmedRevenue}</p></span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-yellow-500 mb-8">
              Total Order Returned:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
            <span className="flex justify-between gap-4 items-center pt-2"> <p>Last 7 days: {returnedOrdersLast7Days}</p>  <p>Order Cost: ₦{returnedRevenueLast7Days}</p></span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-lg font-semibold text-gray-100 dark:text-red-500 mb-8">
             Total Pending Order:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
             <span className="flex justify-between gap-4 items-center pt-2"> <p>Pending: {pendingOrders}</p>  <p>Pending Cost: ₦{totalPendingCost}</p></span>
            </p>
          </div>
        </div>
      </div>


      <main className="p-2 dark:text-white">
        <div className="container mx-auto">
          <div className="flex justify-end px-3">
            <div className="flex gap-4">
              {/* <button onClick={() => setShowOrderForm(true)}
                className="bg-[#163b8d] hover:bg-[#2563eb] transition px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                <span className="flex items-center justify-center gap-3 ">
                  <Plus />
                  Create Order
                </span>
              </button> */}
              <button onClick={addOrder} className="bg-[#163b8d] hover:bg-[#2563eb] transition px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                <span className="flex items-center justify-center gap-3 ">
                  <Plus />
                  Create Order
                </span>
              </button>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto overflow-y-auto">
            <div className="inline-block min-w-full shadow rounded-lg h-[80vh]">
              <table className="min-w-full leading-normal mb-80">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Value
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Expected Delivery
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((order) => (
                    <tr key={order._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                         {getProductNameById(order.productId)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.total}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.quantity}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.buyingPrice}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {slice(order._id, 8)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm items-center flex justify-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {format(new Date(order.Dod), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td
                        className={`px-5 py-5 border-b border-gray-200 text-sm ${
                          order.status.toLowerCase() === "pending"
                            ? "bg-red-200"
                            : order.status.toLowerCase() === "confirmed"
                            ? "bg-green-200":"bg-yellow-200"
                        }`}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.status}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="flex  justify-center items-center gap-3">
                          <Link
                            to="#" onClick={() => handleEditOrder(order)}
                            className="flex justify-center text-blue-500 hover:text-blue-700"
                          >
                            <Pen className="h-4 w-4 in "/>
                          </Link>

                          <button
                            onClick={() => handleDelete(order._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2Icon className="h-5 w-5 " />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(orders.length / productsPerPage)}
        </span>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setCurrentPage((prevPage) => (indexOfLastProduct < orders.length ? prevPage + 1 : prevPage))}
          disabled={indexOfLastProduct >= orders.length}
        >
          Next
        </button>
      </div>
      {showDeleteModal && (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 012 0v6a1 1 11-2 0V8zm5-1a1 1 00-1 1v6a1 1 102 0V8a1 1 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-xl font-bold py-4">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this order? This process cannot
                  be undone.
                </p>
              </div>
              <div className="p-3 mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>  
            </div>
          </div>
        </div>
      )}
      {showOrderForm && (
        <AddOrdersModal
          showOrderForm={showOrderForm}
          products={products}
          onClose={handleClose}
          initialOrderData={selectedOrder}
        />
      )}

{showUpdateOrder && (
        <UpdateOrdersModal 
        showOrderForm={showUpdateOrder} 
        onClose={handleClose} 
        order={selectedOrder} />
      )}

 
      
    </div>
  );
};

export default OrdersPage;



















// <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
// //   <span
// //     className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
// //       item.stock > 0 ? "text-green-900" : "text-red-900"
// //     }`}
// //   >
// //     <span
// //       aria-hidden
// //       className={`absolute inset-0 opacity-50 rounded-full ${
// //         item.stock > 0 ? "bg-green-200" : "bg-red-200"
// //       }`}
// //     ></span>
// //     <span className="relative">
// //       {item.stock > 0 ? "Available" : "Out of Stock"}
// //     </span>
// //   </span>
// // </td>



