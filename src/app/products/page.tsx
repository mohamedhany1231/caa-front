import Card from "@/app/components/Card";
import Pagination from "@/app/components/Pagination";
import Filter from "../components/Filter";
import fetchProducts from "../utils/fetchProducts";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // console.log(searchParams);

  const { sort = "", filter = "", page = 1, max } = await searchParams;

  const itemsPerPage = 8;

  const { products, count, error } = await fetchProducts({
    page: +page,
    sort,
    name: filter,
    maxPrice: max,
  });

  // Paginate products
  // const paginatedSupplements = products.slice(
  //   (+page - 1) * itemsPerPage,
  //   +page * itemsPerPage
  // );

  return (
    <div className="container mx-auto px-4  flex flex-col min-h-full py-16  ">
      {/* Header */}
      <header className="text-center ">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
      </header>
      {error && <p className=" text-red-500 text-lg">{error}</p>}

      <Filter filter={filter} sort={sort} />
      {/* Products Grid */}
      <div className=" mb-8  grow items-start grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card
            id={product._id}
            key={index}
            photo={product.photo}
            title={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={count}
        itemsPerPage={itemsPerPage}
        currentPage={Number(page)}
      />
    </div>
  );
}
