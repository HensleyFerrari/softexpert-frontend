import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState(null);
  const [tax, setTax] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/types").then((res) => setTypes(res.data));
  }, []);

  useEffect(() => {
    findTax(types, typeId).then((type) => {
      setTax(type[0].tax);
    });
  }, [typeId]);

  const findTax = async (array, id) => {
    const result = await array.filter((type) => type.id === parseInt(id));

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }

    await axios
      .post("http://localhost:8000/products", {
        name,
        description,
        price,
        type: typeId,
      })
      .then(() => {
        toast.success("Produto criado com sucesso!");
        return navigate("/");
      });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-96">
        <h1 className="text-center text-3xl font-semibold mb-4">
          Cadastrar Produto
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>Nome do Produto</span>
            <input
              className="py-2 px-4 rounded-md"
              type="text"
              placeholder="Nome do tipo"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Descrição do produto</span>
            <input
              className="py-2 px-4 rounded-md"
              type="text"
              placeholder="Descrição do produto"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Valor do produto</span>
            <input
              className="py-2 px-4 rounded-md"
              type="number"
              placeholder="Valor do produto"
              min="0"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Tipos de produto para{" "}
              <span className="text-red-500 font-semibold">
                Aplicar impostos
              </span>{" "}
            </span>
            <select
              className="py-2 px-4 rounded-md"
              onChange={(e) => setTypeId(e.target.value)}
            >
              <option value="">Selecione um tipo</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.tax}%
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span>Valor do Produto: R$ {price ? parseInt(price).toFixed(2) : null}</span>
            <span>
              Valor do Imposto: R${" "}
              {price && tax ? ((price * tax) / 100).toFixed(2) : null}
            </span>
            <span className="text-sm text-gray-400">
              * O valor do imposto será convertido automaticamente para o valor
              em reais na página de carrinho
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

export default CreateProduct;
