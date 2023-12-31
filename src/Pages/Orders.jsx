import React, { useEffect, useState } from "react";
import OrderFooter from "../Components/OrderFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  decItemCount,
  incItemCount,
  removeFromProduct,
} from "../rt/slices/cart";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((cart) => cart);
  localStorage.setItem("cart", JSON.stringify(cart));

  let total = 0;
  let price = 0;

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.hide();
  }, []);

  const remove = (product) => {
    dispatch(removeFromProduct(product));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  let decrement = (product) => {
    dispatch(decItemCount(product));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  let increment = (product) => {
    dispatch(incItemCount(product));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <div className="order">
        <div className="header">
          <header>
            <h2>Оформление заказа</h2>
            <Link to={`/${cart?.user_id}`}>
              <i className="fa-solid fa-xmark"></i>
            </Link>
          </header>
        </div>
        <div className="order_main">
          <div className="cards">
            {cart.items?.map((p, index) => (
              <div className="order_card" key={index}>
                <div className="flex">
                  <img
                    src={p.product.images[0]}
                    alt="img"
                    width={90}
                    height={90}
                  />
                  <p className="text">
                    {p.product.title}{" "}
                    {cart.items[index]?.filling?.length > 0
                      ? `(${cart.items[index].filling})`
                      : ""}
                  </p>
                </div>
                <div className="prices">
                  <p className="price">
                    {p.product.discount
                      ? p.product.discount_price.toLocaleString()
                      : p.product.price.toLocaleString()}{" "}
                    сум
                  </p>
                  <div className="kol">
                    <button onClick={() => decrement(p.product)}>-</button>
                    <p className="count">{p.count}</p>
                    <button
                      className="plus"
                      onClick={() => increment(p.product)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="delete"
                    onClick={() =>
                      remove({ product: p.product, count: p.count })
                    }
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="footer-order">
            <OrderFooter total={total} price={price} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
