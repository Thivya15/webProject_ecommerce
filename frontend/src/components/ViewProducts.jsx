import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover mx-auto mb-4 rounded"
        />
        <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-500 mb-2">{product.description}</p>
        <p className="font-bold text-indigo-600 mb-3">{product.price}</p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center w-60 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-cover mb-4 rounded"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
    </div>
  );
};

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onClick={(p) => setSelectedProduct(p)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ViewProducts;
