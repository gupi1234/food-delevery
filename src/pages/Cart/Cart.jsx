import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../../context/ThemContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openModal = (itemId) => {
    setItemToDelete(itemId);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems?.[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price * 20}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * 20 * cartItems[item._id]}</p>
                  <p onClick={() => openModal(item._id)} className="cross">
                    <MdDelete />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to delete this item?</h2>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()} </p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delevery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2 * 20}</p>
            </div>
            <hr />

            <div className="card-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode modern-promocode">
          <p className="promo-heading">Have a promo code?</p>
          <div className="promo-input-group">
            <input type="text" placeholder="Enter your code..." />
            <button className="promo-submit">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
