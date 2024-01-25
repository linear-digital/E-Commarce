
import MainPage from "@/Components/Pages/MainPage";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import { api } from "@/Components/instance/api";

const getAllProducts = async () => {
  const res = await api.get('/api/products/all')
  return res.data
}
export default async function Home() {
  const initialProducts = getAllProducts()
  const [products] = await Promise.all([initialProducts])
  return (
    <>
      {/* <MainPage /> */}
      <div className="hidden">
        {
          products.map((product, index) => {
            return <ProductSM key={index} data={product} />
          })
        }
      </div>
    </>
  );
}
