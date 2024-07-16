import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/CartContext";
import CartCard from "./components/CartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShoppingCart() {
  const { state, dispatch } = useContext(CartContext);
  const [types, setTypes] = useState([]);
  const [taxes, setTaxes] = useState(0);
  const navigate = useNavigate();

  const valorTotal = state.products.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/types").then((response) => {
      setTypes(response.data);
    });
  }, []);

  const findTax = (array, id) => {
    return array.filter((type) => type.id === parseInt(id));
  };

  const onSubmit = async () => {
    axios.post("http://localhost:8000/sales").then((resp) => {
      state.products.forEach(async (product) => {
        await axios.post("http://localhost:8000/sale_products", {
          sale_id: resp.data.id,
          product_id: product.id,
        });
      });

      toast.success("Compra finalizada com sucesso!");
      clearCart();
      navigate("/");
    });
  };

  return (
    <div>
      {state.products.length === 0 ? (
        <div className="flex justify-center h-96 items-center">
          <span>O carrinho está vazio!</span>
        </div>
      ) : (
        <>
          {types.length > 0 ? (
            <div className="container mx-auto">
              <h1 className="text-center text-2xl font-semibold mb-4">
                Carrinho
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {state.products.map((product, index) => {
                    const tax = findTax(types, product.type);
                    return (
                      <CartCard
                        key={index}
                        {...product}
                        tax={tax[0]?.tax}
                        setTaxes={setTaxes}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  <span >Valor: R$ {valorTotal}</span>
                  <span>
                    Impostos: R${taxes.toFixed(2)}
                  </span>
                  <span className="font-bold text-xl">Valor Final R$ {(valorTotal + taxes).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={clearCart}
                    className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-700 text-white"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={onSubmit}
                    className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Carregando...</div>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
