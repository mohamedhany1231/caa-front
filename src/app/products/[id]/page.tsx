import { FaCartPlus } from "react-icons/fa";
import FlavorSizeSelector from "./FlavorSizeSelector";
import AddToCart from "@/app/components/AddToCart";
import fetchProduct from "@/app/utils/fetchProduct";

const ProductOverview = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: any;
}) => {
  const { id } = await params; // Get the product ID from URL params
  const product = await fetchProduct(id);
  const { flavor = product.flavors[0], size = product.sizes[0].size } =
    await searchParams;

  // Fetch product details based on ID (simulating an API call)

  const price = product.sizes.find((s) => s.size == size)?.price;

  return (
    <div className="bg-gray-50 py-12 md:py-20 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Image Section */}
          <div className="md:flex-1 px-4">
            <div className=" max-h-[60vh] md:h-[max(460px,60vh)]  rounded-lg bg-gray-100 overflow-hidden mb-4 border border-gray-300">
              <img
                className="w-full h-full object-cover"
                src={product.photo}
                alt={product.name}
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="md:flex-1 p-4 pb-8 flex flex-col space-y-6 ">
            <h2 className="text-2xl lg:text-4xl tracking-wider font-bold text-gray-900 mb-4">
              {product.name}
            </h2>

            <div className="mb-6">
              <span className="ml-2 text-gray-900 text-3xl md:text-5xl font-bold">
                {price ? (+price).toFixed(2) : ".."}
              </span>
              <span className="font-bold text-gray-900 text-lg"> EGP</span>
            </div>

            <FlavorSizeSelector
              flavors={product.flavors}
              sizes={product.sizes}
            />

            {/* Add to Cart */}
            <div className="mt-6">
              {/* FIXME: change qunatity */}
              <AddToCart id={id} flavor={flavor} size={size} />
            </div>
          </div>
        </div>
        <div className="my-6">
          <h2 className=" font-semibold  text-2xl mb-2 uppercase ml-2">
            {" "}
            description{" "}
          </h2>
          <p className=" text-base  ">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
