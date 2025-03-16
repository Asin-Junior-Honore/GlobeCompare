"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import client from "@/lib/apollo-client";
import { GET_COUNTRY_BY_NAME } from "@/lib/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFoundMessage from "../components/NotFoundMessage";

export default function CountryPage() {
    const params = useParams();
    const countryName = decodeURIComponent(params.name as string);
    const { loading, error, data } = useQuery(GET_COUNTRY_BY_NAME, {
        variables: { name: countryName },
        skip: !countryName,
        client,
    });

    if (loading) return <LoadingSpinner />;
    if (error || !data?.country) return <NotFoundMessage message="Oops! Country not found." showButton={true} />;
    console.log(data)

    const country = Array.isArray(data.country) ? data.country[0] : data.country;

    return (
        <div className="p-6 max-w-3xl mx-auto my-[3rem] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold dark:text-gray-100 text-center text-blue-500 mb-[3rem]">
                {country?.name?.official}
            </h1>

            <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Country Flag</p>
                    <img
                        src={country?.flags?.png}
                        alt={country?.name?.common}
                        className="h-48 w-48 object-contain rounded-lg"
                    />
                </div>

                {country?.coatOfArms?.png && (
                    <div className="flex flex-col items-center">
                        <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Coat of Arms</p>
                        <img
                            src={country.coatOfArms.png}
                            alt="Coat of Arms"
                            className="h-48 w-48 object-contain rounded-lg"
                        />
                    </div>
                )}
            </div>

            {/* Country Information Table */}
            <div className="overflow-x-auto mt-6">
                <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                    <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                        {(() => {

                            const currencyEntries = country?.currencies
                                ? Object.entries(country.currencies).map(([code, details]) => ({
                                    code,
                                    name: (details as { name: string; symbol: string }).name,
                                    symbol: (details as { name: string; symbol: string }).symbol,
                                }))
                                : [];
                            const rows = [
                                ["Common Name", country?.name?.common],
                                ["Official Name", country?.name?.official || "N/A"],
                                ["Capital", country?.capital?.join(", ") || "N/A"],
                                ["Region", country?.region || "N/A"],
                                ["Subregion", country?.subregion || "N/A"],
                                ["Population", country?.population?.toLocaleString() || "N/A"],
                                ["Languages", country?.languages ? Object.values(country.languages).join(", ") : "N/A"],
                                ["Timezones", country?.timezones?.join(", ") || "N/A"],
                                ["Continents", country?.continents?.join(", ") || "N/A"],
                                ["Top-Level Domain", country?.tld?.join(", ") || "N/A"],
                                ["Country Codes", `${country?.cca2} / ${country?.cca3}`],
                                ["Calling Code", `${country?.idd?.root} ${country?.idd?.suffixes?.join(", ") || "N/A"}`],
                                [
                                    "Google Maps",
                                    <a key="googleMaps" href={country?.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View on Google Maps
                                    </a>,
                                ],
                                [
                                    "OpenStreetMap",
                                    <a key="openStreetMap" href={country?.maps?.openStreetMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View on OpenStreetMap
                                    </a>,
                                ],
                                ["Demonyms", `Male - ${country?.demonyms?.eng?.m}, Female - ${country?.demonyms?.eng?.f}`],
                                ["Area", `${country?.area?.toLocaleString()} km²`],
                                ["Start of the Week", country?.startOfWeek],
                                ["FIFA Code", country?.fifa || "N/A"],
                                ["Drives on the", `${country?.car?.side} side`],
                                ["Postal Code Format", country?.postalCode?.format || "N/A"],
                                [
                                    "Currencies",
                                    currencyEntries.length > 0
                                        ? currencyEntries.map(({ code, name, symbol }) => `${name} (${code}) ${symbol}`).join(", ")
                                        : "N/A",
                                ],
                            ];
                            return rows.map(([label, value], index) => (
                                <tr key={index} className="odd:bg-gray-100 dark:odd:bg-gray-800">
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{label}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{value}</td>
                                </tr>
                            ));
                        })()}
                    </tbody>

                </table>
            </div>
        </div>

    );
}
