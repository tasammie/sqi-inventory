import { useState } from "react";
import { format } from "date-fns";
import { ArrowUp, BarChart2, Clock, Pen, Plus, RotateCcw, Trash2Icon } from "lucide-react";
import AddSalesModal from "../slugs/AddSalesModal";
import { useGetProduct } from "../../Inventory/hooks/useGetProducts";
import { useGetSales } from "../hooks/useGetSales";
import UpdateSalesModal from "../slugs/UpdateSalesModal";

const Sales = () => {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { products } = useGetProduct();
  const salesPerPage = 10;
  const {
    isLoading,
    error,
    sales,
    createNewSale,
    deleteSale,
    profit,
    totalSales,
    totalRevenue,
    totalSalesInLast7days,
    paidSales,
    paidSalesRevenue,
  } = useGetSales();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showUpdateSale, setShowUpdateSale] = useState(false);

  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setShowUpdateSale(true);
  };

  const handleClose = () => {
    setSelectedSale(null);
    setShowSaleForm(false);
    setShowUpdateSale(false);
  };

  const handleAddSale = () => {
    setShowSaleForm(true);
  };

  const handleDelete = (id) => {
    setSaleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (saleToDelete) {
      await deleteSale(saleToDelete);
      setShowDeleteModal(false);
      setSaleToDelete(null);
    }
  };

  if (isLoading) {
    return <div className="text-3xl text-black">Loading...</div>;
  }

  if (error) {
    return <div>Error loading sales...</div>;
  }

  // if (!Array.isArray(sales) || sales.length === 0) {
  //   return <div>No available sales</div>;
  // }

  const indexOfLastSale = (currentPage + 1) * salesPerPage;
  const indexOfFirstSale = currentPage * salesPerPage;
  const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

  return (
    <div className="bg-[#fafafa] p-6 rounded-lg ">
      <div className="flex flex-col sm:flex-row pb-6 ">
        <h1 className="text-gray-800 text-xl shadow-lg p-4 rounded-md font-bold mb-4 sm:mb-0">Overall Sales List</h1>
  
      </div>

      <div className="flex gap-1 flex-col sm:flex-row items-center justify-between pb-6  tra ">
        <div className="flex space-x-4">
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-gray-100 text-sm font-semibold dark:text-blue-500 mb-6">
              <BarChart2 className="h-6 w-6 text-blue-500 mr-2 inline" /> Total Sales:
            </h2>
            <p className="text-sm pt-6 text-gray-500 dark:text-gray-500 font-semibold mb-4">
              <span className="pr-5">{totalSalesInLast7days}</span> Last 7 days
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-sm font-semibold text-gray-100 dark:text-green-400 mb-8">
              <ArrowUp className="h-6 w-6 text-green-400 mr-2 inline" /> Total Sales Confirmed:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
              <span className="flex justify-between gap-4 items-center pt-2">
                <p>Last 7 days: {paidSales}</p>
                <p>Revenue: ₦{paidSalesRevenue}</p>
              </span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-3 w-56 h-40">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-yellow-500 mb-8">
              <RotateCcw className="h-6 w-6 text-yellow-500 mr-2 inline" /> Profit:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
              <span className="flex justify-between gap-4 items-center pt-2">
                <p>₦{profit}</p>
              </span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-3 w- h-40">
            <h2 className="text-sm font-semibold text-gray-100 dark:text-red-500 mb-8">
              <Clock className="h-6 w-6 text-red-500 mr-2 inline" /> Total Pending Sales:
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-semibold text-sm">
              <span className="flex justify-between gap-4 items-center pt-2">
                <p>Pending: {totalSales}</p>
                <p>Pending Cost: ₦{totalRevenue}</p>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
          <div className="flex bg-gray-800 items-center p-2 rounded-md">
            <input className="bg-gray-800 outline-none ml-1 block text-white" type="text" placeholder="Search..." />
          </div>
          <button onClick={handleAddSale} className="flex items-center justify-center w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white p-2 px-6 rounded-md space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Sale</span> 
          </button>
        </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-gray-200 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Sale Id</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Total Cost</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentSales.map((sale) => (
              <tr key={sale.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{format(new Date(sale.date), 'MM/dd/yyyy')}</td>
                <td className="py-3 px-6 text-left">{sale._id.slice(0, 8)}</td>
                <td className="py-3 px-6 text-left">{sale.productName}</td>
                <td className="py-3 px-6 text-left">{sale.quantity}</td>
                <td className="py-3 px-6 text-left">{sale.total}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1  rounded-full text-xs ${sale.status.toLowerCase() === 'paid' ? 'bg-green-500 text-white px-7 py-2 ' : 'bg-yellow-200 text-gray-950 px-5 py-2'}`}>
                    {sale.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-start">
                    <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <Pen onClick={() => handleEditSale(sale)} className="h-3" />
                    </button>
                    <button className="w-1 mr-2 transform hover:text-red-700 hover:scale-110">
                      <Trash2Icon onClick={() => handleDelete(sale._id)} className="h-4 text-red-400" />
                    </button>
                    {/* <Link to={`/sales/${sale.id}`} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <EyeOffIcon />
                    </Link> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(sales.length / salesPerPage)}
        </span>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setCurrentPage((prevPage) => (indexOfLastSale < sales.length ? prevPage + 1 : prevPage))}
          disabled={indexOfLastSale >= sales.length}
        >
          Next
        </button>
      </div>

      {showSaleForm && (
        <AddSalesModal showSaleForm={showSaleForm} onClose={handleClose} products={products} />
        // <AddSalesModal showSaleForm={showSaleForm} onClose={() => setShowSaleForm(false)} products={products} />
      )}
      {showUpdateSale && selectedSale && (
        <UpdateSalesModal sale={selectedSale} onClose={handleClose} />
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p className="text-gray-600">Are you sure you want to delete this sale?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
