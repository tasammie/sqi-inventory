import React from "react";
import { useGetSupplier } from "../hooks/useGetSupplier";
import { X } from "lucide-react";

const AddSupplierModal = ({ showSupplierForm, handleClose }) => {
  const { handleChange, formData, addSupplier } = useGetSupplier();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier();
    handleClose();
  };

  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center">
      {showSupplierForm && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-[40%] mt-24 m-4">
            <div className="px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Supplier</h3>
              <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                  >
                    <X/>
                  </button>
            </div>
            <div
              className="prose max-w-screen-md p-6 overflow-y-auto"
              style={{
                maxHeight: "60vh",
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Supplier Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.productName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end p-4 gap-4 flex-row">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
                  >
                    Add Supplier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSupplierModal;