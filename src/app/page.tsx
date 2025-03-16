import CountriesTable from "./country/components/CountriesTable";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500 uppercase">Country List</h1>
      <CountriesTable />
    </div>
  );
}
