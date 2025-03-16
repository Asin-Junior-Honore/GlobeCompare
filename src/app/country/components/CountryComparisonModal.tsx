
export default function CountryComparisonModal({ open, onClose, countries }: CountryComparisonModalProps) {
    if (!open || countries.length !== 2) return null;

    return (


        <section className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center transition duration-200"
                >
                    ✕
                </button>

                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Country Comparison</h2>
                <div className="grid grid-cols-3 gap-6 text-center text-gray-700">
                    <div className="font-semibold flex flex-col gap-4 text-lg">
                        <p>Flag</p>
                        <p>Country</p>
                        <p>Population</p>
                        <p>Area (km²)</p>
                        <p>GDP (USD)</p>
                    </div>

                    {/* First Country */}
                    <div className="p-4 rounded-lg bg-gray-100 shadow-sm flex flex-col gap-4">
                        <img
                            src={countries[0].flags.png}
                            alt={countries[0].name.common}
                            width={60}
                            className="mx-auto rounded-md border"
                        />
                        <p className="font-semibold text-gray-900">{countries[0].name.common}</p>
                        <p>{countries[0].population.toLocaleString()}</p>
                        <p>{countries[0].area.toLocaleString()}</p>
                        <p>{countries[0].gdp ? `$${countries[0].gdp.toLocaleString()}` : "N/A"}</p>
                    </div>

                    {/* Second Country */}
                    <div className="p-4 rounded-lg bg-gray-100 shadow-sm flex flex-col gap-4">
                        <img
                            src={countries[1].flags.png}
                            alt={countries[1].name.common}
                            width={60}
                            className="mx-auto rounded-md border"
                        />
                        <p className="font-semibold text-gray-900">{countries[1].name.common}</p>
                        <p>{countries[1].population.toLocaleString()}</p>
                        <p>{countries[1].area.toLocaleString()}</p>
                        <p>{countries[1].gdp ? `$${countries[1].gdp.toLocaleString()}` : "N/A"}</p>
                    </div>
                </div>
            </div>
        </section>


    );
}
