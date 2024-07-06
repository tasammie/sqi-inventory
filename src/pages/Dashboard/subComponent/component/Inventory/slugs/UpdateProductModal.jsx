import React, { useState, useEffect } from "react";
import { useUpdateSingleProduct } from "@/shared/useUpdateSingleProduct";
import { X } from "lucide-react";
import { useGetProduct } from "../hooks/useGetProducts";

const UpdateProductModal = ({ showProductForm, cancelButton, type, product, onClose }) => {
  const { addSingleProduct, handleChange, formData, imagePreview, imageFile, isLoading } = useGetProduct();
  const { updateProduct, isError, isLoading: connecting } = useUpdateSingleProduct();
  const [localFormData, setLocalFormData] = useState({
    name: "",
    price: "",
    cost: "",
    description: "",
    category: "",
    stock: "",
    image: []
  });

  useEffect(() => {
    if (product) {
      setLocalFormData({
        name: product.name || "",
        price: product.price || "",
        cost: product.cost || "",
        description: product.description || "",
        category: product.category || "",
        stock: product.stock || "",
        image: product.image || []
      });
    }
  }, [product]);

  const handleLocalChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setLocalFormData((prevData) => ({
        ...prevData,
        [name]: files
      }));
    } else {
      setLocalFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (type.trim().toLowerCase() === 'edit product'.trim().toLowerCase()) {
      // console.log(requestData, 'request');
      
      updateProduct(localFormData, product._id);
    } else {
      addSingleProduct();
    }
  };

  if (!showProductForm) {
    return null;
  }

  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center">
      <div className="fixed z-10 inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-[40%] mt-24 m-4">
          <div className="px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {type}
            </h3>
            <button
              type="button"
              onClick={cancelButton}
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
            >
              <X />
            </button>
          </div>
          <div
            className="prose max-w-screen-md p-6 overflow-y-auto"
            style={{
              maxHeight: "60vh",
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)"
            }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.name}
                  onChange={handleLocalChange}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.price}
                  onChange={handleLocalChange}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Cost
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.cost}
                  onChange={handleLocalChange}
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.stock}
                  onChange={handleLocalChange}
                />
              </div>
              <div>
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.category}
                  onChange={handleLocalChange}
                />
              </div>
              <div>
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={localFormData.description}
                  onChange={handleLocalChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="productImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="mt-1 p-2 block w-46 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={handleLocalChange}
                  multiple
                />
                {imagePreview && (
                  <div className="mt-2">
                    {Array.from(localFormData.image).map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Image Preview"
                        className="w-40 h-20 rounded-md border border-gray-300 shadow-sm"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end p-4 gap-4 flex-row">
                <button
                  type="button"
                  onClick={cancelButton}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
                >
                  {isLoading || connecting ? "Loading.." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
