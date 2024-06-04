
import React, { useState } from 'react';
import { useGetProduct } from './hooks/inventory-hook/useGetProducts';

const AddProductModal = ({showProductForm, cancelButton}) => {
//   const [showProductForm, setShowProductForm] = useState(true);
    const {addSingleProduct} = useGetProduct();
    const [formData, setFormData] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        productCategory: '',
        productImage: ''
    })

    const handleChange = (e) => {
        console.log(formData)
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center h-screen">
      

      {showProductForm && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div 
            className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4"
          >
            <div className="px-6 py-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Product</h3>
            </div>
            <div 
              className="prose max-w-screen-md p-6 overflow-y-auto" 
              style={{ maxHeight: '70vh', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.375rem', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}
            >
              <form className="space-y-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input 
                    type="text" 
                    id="productName" 
                    name="productName" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
                  <input 
                    type="number" 
                    id="productPrice" 
                    name="productPrice" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
                  <input 
                    type="text" 
                    id="productCategory" 
                    name="productCategory" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    rows="3" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                  <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
                    required 
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
        
               <button 
                 onClick={cancelButton}
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={()=>{addSingleProduct(formData)}}
                type="submit" 
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductModal;
