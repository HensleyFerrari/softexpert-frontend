import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa6";

function Card({ name, description, price, id, type }) {
  const { dispatch } = useContext(CartContext);

  const addItemToCart = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        id,
        name,
        description,
        price,
        type,
      },
    });

    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 shadow-md p-4 hover:bg-gray-100">
      <div className="flex justify-between">
        <span className="self-center text-xl font-bold">{name}</span>
        <Link
          to={`/product/${id}`}
          className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded"
        >
          Editar Produto
        </Link>
      </div>
      <p className="text-gray-600">{description}</p>
      <p className="text-2xl font-bold">R$ {price}</p>
      <div className="flex justify-between">
        <button
          onClick={addItemToCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2"
        >
          <FaCartPlus className="self-center" /> <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
