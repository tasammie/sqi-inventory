import { useState } from "react";
import { useGetProduct } from "../hooks/inventory-hook/useGetProducts";
import AddProductModal from "../AddProductModal";

const Inventory = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  const { product, isLoading, isError, checkStatus, productStatus, handle } =
    useGetProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const addProduct = () => {
    setShowProductForm(true);
  };
  const productsPerPage = 10;

  if (!product || product.length === 0) {
    return <div>No products available</div>;
  }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  if (isLoading) {
    return <div className="text-3xl text-black">loading...</div>;
  }
  if (isError) {
    return <div>error...</div>;
  }
  return (
    <div>
      <main className="p-2 bg-gray-100 dark:bg-gray-900 dark:text-white ">
        <div className="container mx-auto">
          {/* New card starts here */}
          {/* <div className="flex space-x-4">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 ">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Card Title
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Card content goes here. This is where you can add any text or
                additional components.
              </p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
              sed vitae amet saepe cumque, veritatis neque reprehenderit aliquam
              corrupti taque,
            </div>
          </div> */}
          {/* New card ends here */}
          <div></div>
          {/* Add your other main content here */}
        </div>
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-white-600 text-xl font-bold">Products</h1>
              <span className="text-xs">All product items</span>
            </div>
            <div className="flex items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
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
                  className="bg-gray-50 outline-none ml-1 block w-full sm:w-auto"
                  type="text"
                  placeholder="search..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={addProduct}
                  className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                >
                  Add Product
                </button>
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto overflow-y-auto">
            <div className="inline-block min-w-full shadow rounded-lg h-[80vh]">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quartity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((item) => (
                      <tr key={item.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.price}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.category}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.stock}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                              item.stock > 0 ? "text-green-900" : "text-red-900"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 opacity-50 rounded-full ${
                                item.stock > 0 ? "bg-green-200" : "bg-red-200"
                              }`}
                            ></span>
                            <span className="relative">
                              {item.stock > 0 ? "Available" : "Out of Stock"}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <div className="text-center">No products available</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={indexOfLastProduct >= product.length}
                className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <AddProductModal
        showProductForm={showProductForm}
        cancelButton={() => {
          setShowProductForm(false);
        }}
      />
    </div>
  );
};

export default Inventory;
