import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useGetProduct } from "../../Inventory/hooks/useGetProducts";
import { useUpdateOrder } from "@/shared/useUpdateOrder";
import { useGetOrders } from "../hooks/useGetOrders";

const UpdateOrdersModal = ({ showOrderForm, order, onClose }) => {
  const { getSingleOrderById } = useGetOrders();
  const { updateOrder, isLoading, error } = useUpdateOrder();
  const {products} = useGetProduct();
  
  // Utility function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const [orderData, setOrderData] = useState({
    id: order._id,
    productName: '',
    buyingPrice: order.buyingPrice,
    quantity: order.quantity,
    expectedDelivery: formatDate(order.Dod),
    status: order.status,
    payment_status: order.payment_status,
    total: order.total,
  });

  useEffect(() => {
    setOrderData({
      id: order._id,
      productName: getProductNameById(order.productId),
      buyingPrice: order.buyingPrice,
      quantity: order.quantity,
      expectedDelivery: formatDate(order.Dod),
      status: order.status,
      payment_status: order.payment_status,
      total: order.total,
    });
  }, [order, products]);

  const getProductNameById = (id) => {
    const productItem = products ? products.find(p => p._id === id) : null;
    return productItem ? productItem.name : 'Unknown Product';
  }

  useEffect(() => {
    const calculateTotalValue = () => {
      if (orderData.buyingPrice > 0 && orderData.quantity > 0) {
        const total = orderData.buyingPrice * orderData.quantity;
        setOrderData(prevData => ({
          ...prevData,
          total
        }));
      } else {
        setOrderData(prevData => ({
          ...prevData,
          total: 0
        }));
      }
    };

    calculateTotalValue();
  }, [orderData.buyingPrice, orderData.quantity]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevOrderData => ({
      ...prevOrderData, [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...orderData,
      Dod: orderData.expectedDelivery
    };
    // console.log("Order is", orderData)
    try {
        await updateOrder(orderData.id, dataToSend);
        if (!error) {
          onClose();
        }
      } catch (err) {
        // console.error('Failed to update order:', err);
      }
  };

  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center">
      {showOrderForm && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-[40%] mt-24 m-4">
            <div className="px-6 py-4 flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Update Order
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
                  <input
                    type="text"
                    name="productId"
                    value={orderData.productName}
                    readOnly
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Buying Price
                  </label>
                  <input
                    type="number"
                    name="buyingPrice"
                    value={orderData.buyingPrice}
                    onChange={handleChange}
                    placeholder="Buying Price"
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={orderData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Delivery
                  </label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    value={orderData.expectedDelivery}
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
                    value={orderData.status}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Status
                  </label>
                  <select
                    name="payment_status"
                    value={orderData.payment_status}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
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
                    value={orderData.total}
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
                    {isLoading ? 'Updating...' : 'Update Order'}
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

export default UpdateOrdersModal;
