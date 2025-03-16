import { CountryComparisonModalProps } from "@/types/sharedTypes";

export default function CountryComparisonModal({ open, onClose, countries }: CountryComparisonModalProps) {
    if (!open || countries.length !== 2) return null;

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 cursor-pointer right-4 text-xl bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full w-12 h-12 flex items-center justify-center transition duration-200"
                >
                    ✕
                </button>

                <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Country Comparison</h2>

                <table className="w-full border-collapse border border-gray-300 shadow-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-4 border">Feature</th>
                            <th className="p-4 border">{countries[0].name.common}</th>
                            <th className="p-4 border">{countries[1].name.common}</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-gray-700">
                        <tr>
                            <td className="p-4 border font-semibold">Flag</td>
                            <td className="p-4 border">
                                <img src={countries[0].flags.png} alt={countries[0].name.common} width={60} className="mx-auto rounded-md border" />
                            </td>
                            <td className="p-4 border">
                                <img src={countries[1].flags.png} alt={countries[1].name.common} width={60} className="mx-auto rounded-md border" />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 border font-semibold">Population</td>
                            <td className="p-4 border">{countries[0].population.toLocaleString()}</td>
                            <td className="p-4 border">{countries[1].population.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border font-semibold">Area (km²)</td>
                            <td className="p-4 border">{countries[0].area.toLocaleString()}</td>
                            <td className="p-4 border">{countries[1].area.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border font-semibold">GDP (USD)</td>
                            <td className="p-4 border">{countries[0].gdp ? `$${countries[0].gdp.toLocaleString()}` : "N/A"}</td>
                            <td className="p-4 border">{countries[1].gdp ? `$${countries[1].gdp.toLocaleString()}` : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
