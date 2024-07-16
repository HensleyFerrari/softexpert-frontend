import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateType() {
  const [name, setName] = useState("");
  const [tax, setTax] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !tax) {
      toast.error("Preencha todos os campos!");
      return;
    }

    await axios
      .post("http://localhost:8000/types", {
        name,
        tax,
      })
      .then(() => {
        toast.success("Tipo criado com sucesso!");
        return navigate("/");
      });
  };

  return (
    <div className="flex  items-center justify-center gap-4">
      <div className="w-96 flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-semibold">
          Cadastrar Tipo de Produto
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>Nome do tipo</span>
            <input
              className="py-2 px-4 rounded-md"
              type="text"
              placeholder="Nome do tipo"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Valor do imposto em %<span className="text-red-500">*</span>{" "}
            </span>
            <input
              className="py-2 px-4 rounded-md"
              type="number"
              placeholder="Valor do imposto em %"
              min="0"
              max="100"
              onChange={(e) => setTax(e.target.value)}
            />
            <span className="text-sm text-gray-400">
              * O valor do imposto será convertido automaticamente para o valor
              em reais na página de produtos
            </span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-md bg-blue-500 text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
