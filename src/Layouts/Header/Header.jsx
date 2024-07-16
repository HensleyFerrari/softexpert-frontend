import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex justify-between py-6 px-8 bg-blue-800 text-white">
      <h1>SoftExpert</h1>
      <div className="flex gap-4">
        <Link className="hover:text-gray-400" to="/">
          Produtos
        </Link>
        <Link className="hover:text-gray-400" to="/shoppingCart">
          Carrinho
        </Link>
        <Link className="hover:text-gray-400" to="/createType">
          Cadastrar Tipo
        </Link>
        <Link className="hover:text-gray-400" to="/createProduct">
          Cadastrar Produto
        </Link>

      </div>
    </nav>
  );
}

export default Header;
