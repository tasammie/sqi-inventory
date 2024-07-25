import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  Trash2Icon,
  AlertCircle,
  Box,
  CheckCircle,
  XCircle,
  ArrowUp01,
  ArrowUp,
} from "lucide-react";
import { useGetSingleProduct } from "../hooks/useSingleProduct";
import AddProductModal from "../slugs/AddProductModal";
import { useGetProduct } from "../hooks/useGetProducts";
import { motion } from "framer-motion";

const Inventory = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const {
    products,
    isLoading,
    isError,
    totalProducts,
    productsCount,
    revenueIn7Days,
    notInStock,
    totalRevenue,
    lowstock,
    categoryIn7Days,
  } = useGetProduct();
  const { deleteProduct } = useGetSingleProduct();
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addProduct = () => {
    setShowProductForm(true);
  };

  const handleClose = () => {
    setShowProductForm(false);
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const slice = (id, length) => {
    if (id) {
      return id.slice(0, length);
    } else {
      return "";
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <div className="text-3xl text-black">Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <main className="p-2 bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-white-600 text-xl font-bold">Products</h1>
              <span className="text-xs">All product items</span>
            </div>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row items-center justify-between pb-6">
            <motion.div variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.05}} 
              className="bg-white shadow-md rounded-lg p-3 w-56 h-36">
              <h2 className="text-gray-800 text-sm font-semibold dark:text-blue-500 mb-1">
                <Box className="h-6 w-6 text-blue-500 mr-2 inline" />{" "}
                Categories:
              </h2>
              <p className="text-sm pt-6 text-gray-500 dark:text-gray-800 font-semibold mb-2 flex flex-col">
                <span className="">{categoryIn7Days}</span>
                <span className="mt-2">Last 7 days</span>
              </p>
            </motion.div>
            <motion.div variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.05}} 
            className="bg-white shadow-md rounded-lg p-3 w-56 h-36">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-green-400 mb-1">
                <CheckCircle className="h-6 w-6 text-green-400 mr-2 inline" />{" "}
                Total Products:
              </h2>
              <p className="text-gray-500 dark:text-gray-800 font-semibold text-sm">
                <span className="flex justify-between gap-4 items-center pt-6 px-2 ">
                  <p className="flex flex-col">
                    <span className="pr-5">{totalProducts}</span>
                    <span className="mt-2">Last 7 days </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="pr-5">{revenueIn7Days}</span>
                    <span className="mt-2">Revenue</span>
                  </p>
                </span>
              </p>
            </motion.div>
            <motion.div variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.05}} 
            className="bg-white shadow-md rounded-lg p-3 w-56 h-36">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-purple-500 mb-1">
                <ArrowUp className="h-6 w-6 text-purple-500 mr-2 inline" /> Top
                Selling Products:
              </h2>
              <p className="text-gray-500 dark:text-gray-800 font-semibold text-sm">
                <span className="flex justify-between gap-4 items-center pt-6 px-2 ">
                  <p className="flex flex-col">
                    <span className="pr-5">{productsCount}</span>
                    <span className="mt-2">Last 7 days </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="pr-5">{totalRevenue}</span>
                    <span className="mt-2">Revenue</span>
                  </p>
                </span>
              </p>
            </motion.div>
            <motion.div variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.05}} 
            className="bg-white shadow-md rounded-lg p-3 w-56 h-36">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-red-500 mb-1">
                <XCircle className="h-6 w-6 text-red-500 mr-2 inline" /> Low
                Stock Products:
              </h2>
              <p className="text-gray-500 dark:text-gray-800 font-semibold text-sm">
                <span className="flex justify-between gap-4 items-center pt-6 px-2 ">
                  <p className="flex flex-col">
                    <span className="pr-5">{lowstock}</span>
                    <span className="mt-2">Ordered </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="pr-5">{notInStock}</span>
                    <span className="mt-2">Not in stock</span>
                  </p>
                </span>
              </p>
            </motion.div>
          </div>

          <div className="flex justify-between mb-4 items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
            <div className="flex bg-gray-800 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <motion.button
                onClick={addProduct}
                variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.08}} 
                className="bg-[#163b8d] hover:bg-[#2563eb] transition px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Add Product
              </motion.button>
              {/* <motion.button 
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{scale: 1.05}} 
              className="bg-[#163b8d] hover:bg-[#2563eb] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Filter
              </motion.button> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            <motion.div className="min-w-full shadow rounded-lg overflow-hidden"
                 initial="hidden"
                 animate="visible"
                 variants={tableVariants}
            
            >
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <motion.tbody variants={tableVariants}>
                  {currentProducts.map((prod) => (
                    <motion.tr key={prod.id} variants={rowVariants}
                    whileHover={{ scale: 1.01, backgroundColor: "gray" }}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {slice(prod._id, 6)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {prod.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {prod.cost}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="text-gray-900">{prod.price}</span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="text-gray-900">{prod.category}</span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="text-gray-900">{prod.stock}</span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {prod.stock > 0 ? (
                          <span className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                            Available
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <XCircle className="h-5 w-5 text-red-500 mr-1" />
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex justify-start items-center">
                          <Link
                            to={`/dashboard/inventory/${prod._id}`}
                            className="mr-3 text-blue-500 hover:text-blue-700"
                            aria-label="Edit"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete"
                          >
                            <Trash2Icon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </motion.div>
          </div>
          <div className="px-3 py-3 mt-4  flex flex-col xs:flex-row items-center xs:justify-between rounded-md">
            <span className="text-xs xs:text-sm text-gray-100 ">
              Showing {indexOfFirstProduct + 1} to{" "}
              {indexOfLastProduct > filteredProducts.length
                ? filteredProducts.length
                : indexOfLastProduct}{" "}
              of {filteredProducts.length} Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="text-sm bg-[#1a56db] hover:bg-[#2563eb] text-white mr-8 font-semibold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                disabled={indexOfLastProduct >= filteredProducts.length}
                className="text-sm bg-[#1a56db] hover:bg-[#2563eb] text-white font-semibold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      {showProductForm && (
        <AddProductModal
          type={"Add Product"}
          showProductForm={showProductForm}
          cancelButton={handleClose}
        />
      )}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
