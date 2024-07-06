import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useGetSales } from "../hooks/useGetSales";
// import { useGetSales } from "./component/Sales/hooks/useGetSales";

const AddSalesModal = ({ showSaleForm, products = [], onClose }) => {
  const { createNewSale, isLoading, error } = useGetSales();
  const [salesData, setSalesData] = useState({
    productId: '',
    price: '',
    cost: '',
    quantity: 0,
    saleDate: '',
    status: '',
    totalValue: 0,
  });

  useEffect(() => {
    const calculateTotalValue = () => {
      if (salesData.price > 0 && salesData.quantity > 0) {
        const totalValue = salesData.price * salesData.quantity;
        setSalesData(prevData => ({
          ...prevData,
          totalValue
        }));
      } else {
        setSalesData(prevData => ({
          ...prevData,
          totalValue: 0
        }));
      }
    };

    calculateTotalValue();
  }, [salesData.price, salesData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productId') {
      const selectedProduct = products.find(product => product._id === value);

      if (selectedProduct) {
        setSalesData(prevSalesData => ({
          ...prevSalesData,
          price: selectedProduct.price,
          productId: selectedProduct._id,
          cost: selectedProduct.cost
        }));
      }
    } else {
      setSalesData(prevSalesData => ({
        ...prevSalesData, [name]: value
      }));
    }
  };

  // console.log(products, "product");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...salesData,
      price: salesData.price, // Ensure price is included
      cost: salesData.cost, // Ensure cost is included
      total: salesData.totalValue, // Ensure total is included
      saleDate: salesData.saleDate
    };

    await createNewSale(dataToSend);
    if (!error) {
      onClose();
    }
  };

  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center">
      {showSaleForm && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-[40%] mt-24 m-4">
            <div className="px-6 py-4 flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add Sale
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
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
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <select
                    name="productId"
                    value={salesData.productId}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={salesData.price}
                    onChange={handleChange}
                    placeholder="Selling Price"
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Cost
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={salesData.cost}
                    onChange={handleChange}
                    placeholder="Selling Cost"
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={salesData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sale Date
                  </label>
                  <input
                    type="date"
                    name="saleDate"
                    value={salesData.saleDate}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={salesData.status}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Value
                  </label>
                  <input
                    type="number"
                    name="totalValue"
                    value={salesData.totalValue}
                    readOnly
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end p-4 gap-4 flex-row">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
                  >
                    {isLoading ? 'Creating...' : 'Create Sale'}
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

export default AddSalesModal;
