import Card from "./components/Card";

export default function Home() {
  // Create an array of 10 fictitious products
  const products = Array.from({ length: 10 }, (v, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    imageUrl: `https://via.placeholder.com/300?text=Product+${i + 1}`, // Placeholder image URL
  }));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-sky-50 font-black">
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
