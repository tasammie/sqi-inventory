import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProduct } from "../hooks/singleprod/useSingleProduct";


const ProductDetails = () => {
  const { id } = useParams();
  const { getSingleProd, product, loading, isError } = useGetSingleProduct();

  useEffect(() => {
    if (id) {
      getSingleProd(id);
      // console.log(id);
    }
  }, [id]);

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
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetails;
