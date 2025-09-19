import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postalCode: ""
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products: cartItems.map(item => item.name), // only names
        name: address.name,
        phone: address.phone,
        street: address.street,
        city: address.city,
        district: address.district,
        postalCode: address.postalCode
      };

      console.log("Sending order data:", orderData);

      await axios.post("http://localhost:8080/api/orders", orderData);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover mx-auto mb-2 rounded"
                />
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-indigo-600 font-bold">${item.price}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <input
              type="text"
              placeholder="Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
          </div>
          <button
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
