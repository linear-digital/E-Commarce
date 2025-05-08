
import { api } from "@/Components/instance/api";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import Link from "next/link";


const BestDeals = ({ products }) =>
{

  return (
    <main className="container mx-auto lg:mt-32 mt-10 px-4 lg:px-0">
      <div className="flex items-center justify-between">
        <h2 className=" text-black lg:text-3xl text-2xl font-semibold">
          New Arrivals
        </h2>
        <Link href="/products" className=" text-primary text-lg font-semibold">
          See All
        </Link>
      </div>
      <div className="lg:grid hidden lg:grid-cols-5  grid-cols-2 gap-5 mt-10">
        {
          products?.map((deal, index) => (
            <ProductSM key={index} data={deal} />
          ))
        }
      </div>
    </main>
  );
};

export default BestDeals;
