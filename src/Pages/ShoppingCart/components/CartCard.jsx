import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../../store/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

function CartCard({ id, name, description, price, type, tax, setTaxes }) {
  const { dispatch } = useContext(CartContext);

  const removeItemFromCart = (id) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
    toast.success("Produto removido do carrinho");
  };

  useEffect(() => {
    setTaxes((old) =>old + price * (tax / 100));
  }, [tax]);

  return (
    <div className="flex justify-between bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-col gap-2">
        <span>{name}</span>
        <span>Descrição: {description}</span>
        <div className="flex gap-5">
          <span>R$ {price}</span>
          <span>
            Impostos: R${(price * (tax / 100)).toFixed(2)} ({tax}%)
          </span>
        </div>
      </div>
      <div>
        <button
          className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-700 text-white"
          onClick={() => removeItemFromCart(id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default CartCard;
