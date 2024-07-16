import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data));
  }, []);
  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          return <Card key={product.id} {...product} />;
        })}
      </div>
    </main>
  );
}

export default Home;
