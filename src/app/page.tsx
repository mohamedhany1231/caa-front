import Card from "@/app/components/Card";
import Container from "./components/Container";
import Hero from "./components/Hero";

export default async function Home() {
  const { products: supplements } = await fetchTopProducts();
  console.log(supplements);
  return (
    <div className=" h-full w-full  border-red-200 space-y-32">
      <Hero />
      <div className="  pb-24 w-full space-y-32">
        {/* top products */}
        <Container>
          <div className=" text-center px-4 ">
            <h2 className=" text-3xl font-bold   ">Our Top Supplements</h2>
            <p className="text-xl text-gray-600 mt-2">
              Discover our premium products that support your fitness and
              wellness goals.
            </p>
          </div>

          <div className=" grid lg:grid-cols-4 grid-cols-2  gap-4 mt-20 px-2 md:px-8  mx-auto justify-stretch  w-full ">
            {supplements?.map((s, i) => (
              <Card
                id={s._id}
                description={s.description}
                photo={s.photo}
                title={s.name}
                price={s.price}
                key={s._id}
              />
            ))}
          </div>
        </Container>
        <WhyChooseSection />
      </div>
    </div>
  );
}

import { FaLeaf, FaFlask, FaUsers } from "react-icons/fa";
import fetchTopProducts from "./utils/fetchTopProducts";

const WhyChooseSection = () => {
  return (
    <Container className=" bg-gray-200 py-20 ">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Why Choose Our Supplements?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
        {/* Benefit 1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <FaLeaf className="text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Premium Ingredients
          </h3>
          <p className="text-gray-500 text-center">
            We source only top-quality ingredients to provide safe and effective
            supplements.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <FaFlask className="text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Proven Formulas
          </h3>
          <p className="text-gray-500 text-center">
            Our products are crafted based on proven science for reliable
            results.
          </p>
        </div>

        {/* Benefit 3 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <FaUsers className="text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Built for Beginners
          </h3>
          <p className="text-gray-500 text-center">
            Trusted by fitness enthusiasts starting their journey with
            confidence.
          </p>
        </div>
      </div>
    </Container>
  );
};
