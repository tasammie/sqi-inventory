import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import { useGetSingleProduct } from "../hooks/useSingleProduct";
import { useGetUpdateProduct } from "../hooks/useGetUpdateProduct";
import UpdateProductModal from "./UpdateProductModal";

const ProductDetails = () => {
  const { id } = useParams();
  const { getSingleProd, product, loading, isError, deleteProduct } = useGetSingleProduct();
  const [showEditForm, setShowEditForm] = useState(false);
  const { updateProduct } = useGetUpdateProduct();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (id) {
      getSingleProd(id);
    }
  }, [id]);

  const editProduct = () => {
    setShowEditForm(true);
  };

  const cancelButton = () => {
    setShowEditForm(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product details.</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <a href="/dashboard/Inventory" className="hover:underline hover:text-gray-600">Back</a>
          <span>
            <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <a href="#" className="hover:underline hover:text-gray-600">{product.category}</a>
          <span>
            <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              <Carousel showThumbs={false} autoPlay infiniteLoop>
                {product.image.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover rounded-lg " />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name}</h2>
            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">{product.price}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-500">Category: {product.category}</p>
            <div className="flex py-4 space-x-4">
              <button onClick={editProduct} type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">Edit Product</button>
              <button onClick={() => handleDelete(product._id)} className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white">Delete Product</button>
              <UpdateProductModal showProductForm={showEditForm} cancelButton={cancelButton} type={"Edit Product"} product={product} onClose={cancelButton} />
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div className="text-center p-5 flex-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 000 2v10a2 2 000 002h8a2 2 000 002V6a1 1 000-2h-3.382l-.724-1.447A1 1 0011 2H9zM7 8a1 1 012 0v6a1 1 11-2 0V8zm5-1a1 1 00-1 1v6a1 1 102 0V8a1 1 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-bold py-4">Are you sure?</h2>
              <p className="text-sm text-gray-500 px-8">Do you really want to delete this product? This process cannot be undone.</p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button onClick={() => setShowDeleteModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>
              <button onClick={confirmDelete} className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
