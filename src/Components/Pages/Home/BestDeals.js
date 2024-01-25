
import ProductSM from "@/Components/Shared/Cards/ProductSM";

const BestDeals = async ({ deals }) => {

  return (
    <main className="container mx-auto lg:mt-32 mt-10 px-4 lg:px-0">
      <h2 className=" text-black lg:text-3xl text-2xl font-semibold">
        Best Deals
      </h2>
      <div className="grid lg:hidden lg:grid-cols-4 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-4 lg:gap-x-2 mt-10">
        {
          deals?.slice(0, 4).map((deal, index) => (
            <ProductSM key={index} data={deal} />
          ))
        }
      </div>
      <div className="lg:grid hidden lg:grid-cols-4  grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-4 lg:gap-x-2 mt-10">
        {
          deals?.slice(0, 8).map((deal, index) => (
            <ProductSM key={index} data={deal} />
          ))
        }
      </div>
    </main>
  );
};

export default BestDeals;
