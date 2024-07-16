import { Link } from "react-router-dom";
import SoftLogo from "../../assets/softExpert-logo.png";
import { IoCartOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

function Header() {
  return (
    <nav className="flex justify-between py-6 px-8 bg-blue-800 text-white">
      <Link to="/" className="hidden md:block">
        <img src={SoftLogo} alt="SoftExpert Logo" className="h-10" />
      </Link>
      <div className="flex gap-4 self-center font-semibold">
        <Link className="hover:text-blue-200 flex gap-2" to="/">
          <CiShop className="self-center" size={25} />
          <span>Produtos</span>
        </Link>
        <Link className="hover:text-blue-200 flex gap-2" to="/shoppingCart">
          <IoCartOutline className="self-center" size={25} />
          <span>Carrinho</span>
        </Link>
      </div>
      <div className="flex gap-4 self-center font-semibold">
        <Link className="hover:text-blue-200 flex gap-2" to="/createType">
          <CiSquarePlus className="self-center" size={25} />
          <span>Cadastrar Tipo</span>
        </Link>
        <Link className="hover:text-blue-200 flex gap-2" to="/createProduct">
          <CiSquarePlus className="self-center" size={25} />
          <span>Cadastrar Produto</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
