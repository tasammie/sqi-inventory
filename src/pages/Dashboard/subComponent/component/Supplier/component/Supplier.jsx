import { useState } from "react";
import { Plus } from "lucide-react";
import { useGetSupplier } from "../hooks/useGetSupplier";
import AddSupplierModal from "../slug/AddSupplierModal";

const Supplier = () => {
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const supplierPerPage = 10;
  const { isLoading, supplier, error,   } = useGetSupplier();

  const handleAddSupplier = () => {
    setShowSupplierForm(true);
  };

  const handleClose = () => {
    setShowSupplierForm(false);
  };

  const indexOfLastSupplier = (currentPage + 1) * supplierPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - supplierPerPage;
  const currentSuppliers = supplier ? supplier.slice(indexOfFirstSupplier, indexOfLastSupplier) : [];

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
      <div className="mb-4 sm:mb-0 px-5">
              <h1 className="text-white-600 text-3xl font-bold">Supplier</h1>
              <span className="text-xs">All Suppliers</span>
            </div>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-4">
          <div className="flex w-full sm:w-auto bg-gray-800 items-center p-2 rounded-md">
            <input
              className="bg-gray-800 outline-none ml-1 block text-white w-full"
              type="text"
              placeholder="Search..."
            />
          </div>
          <button
            onClick={handleAddSupplier}
            className="flex items-center justify-center w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white p-2 px-6 rounded-md space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Supplier</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-gray-200 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Supplier Name</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Contact Number</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">
                    <div className="text-black text-3xl">Loading...</div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">
                    <div className="text-red-500 text-center text-sm">{error.message}</div>
                  </td>
                </tr>
              ) : supplier && supplier.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">
                    No Supplier Available
                  </td>
                </tr>
              ) : (
                currentSuppliers.map((sup, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{sup.name}</td>
                    <td className="py-3 px-6 text-left">{sup.productName}</td>
                    <td className="py-3 px-6 text-left">{sup.category}</td>
                    <td className="py-3 px-6 text-left">{sup.phone}</td>
                    <td className="py-3 px-6 text-left">{sup.email}</td>
                    <td className="py-3 px-6 text-left">
                      <button className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
          Page {currentPage + 1} of {supplier ? Math.ceil(supplier.length / supplierPerPage) : 1}
        </span>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setCurrentPage((prevPage) => (indexOfLastSupplier < (supplier ? supplier.length : 0) ? prevPage + 1 : prevPage))}
          disabled={indexOfLastSupplier >= (supplier ? supplier.length : 0)}
        >
          Next
        </button>
      </div>
      {showSupplierForm && (
        <AddSupplierModal showSupplierForm={showSupplierForm} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Supplier;
