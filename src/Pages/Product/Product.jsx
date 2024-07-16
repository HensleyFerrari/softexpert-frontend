import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Product() {
  const { id } = useParams();
  const [typeId, setTypeId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        const data = res.data;
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setTypeId(data.type);
      });

    axios.get("http://localhost:8000/types").then((res) => setTypes(res.data));
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }

    await axios
      .put(`http://localhost:8000/products/${id}`, {
        name,
        description,
        price,
        "type" : typeId,
      })
      .then(() => {
        toast.success("Produto criado com sucesso!");
        return navigate("/");
      });
  };
  const onDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/products/${id}`)
      .then(() => {
        toast.success("Produto excluido com sucesso!");
        return navigate("/");
      });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-2xl font-semibold">Cadastrar Produto</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>Nome do Produto</span>
          <input
            className="py-2 px-4 rounded-md"
            type="text"
            placeholder="Nome do tipo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Descrição do produto</span>
          <input
            className="py-2 px-4 rounded-md"
            type="text"
            placeholder="Descrição do produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Valor do produto</span>
          <input
            className="py-2 px-4 rounded-md"
            type="number"
            placeholder="Valor do produto"
            min="0"
            value={price}
              onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>
            Tipos de produto para{" "}
            <span className="text-red-500 font-semibold">Aplicar impostos</span>{" "}
          </span>
          <select className="py-2 px-4 rounded-md" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            <option value="">Selecione um tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.tax}%
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button 
          onClick={onDelete}
          className="py-2 px-4 rounded-md bg-red-500 text-white">
            Excluir
          </button>
          <button 
          onClick={onSubmit}
          className="py-2 px-4 rounded-md bg-blue-500 text-white">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
