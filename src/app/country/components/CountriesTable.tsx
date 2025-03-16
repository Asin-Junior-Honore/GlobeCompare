"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GET_COUNTRIES } from "@/lib/queries";
import client from "@/lib/apollo-client";
import CountryComparisonModal from "@/app/country/components/CountryComparisonModal";
import NotFoundMessage from "./NotFoundMessage";
import { Country } from "@/types/sharedTypes";
import LoadingSpinner from "./LoadingSpinner";

export default function CountriesTable() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCountries() {
            try {
                setLoading(true);
                const { data } = await client.query({ query: GET_COUNTRIES });
                setCountries(data.countries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCountries();
    }, []);

    if (loading) return <LoadingSpinner />;

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCountrySelection = (country: Country) => {
        setSelectedCountries((prev) => {
            const isSelected = prev.some((c) => c.name.common === country.name.common);
            const newSelection = isSelected
                ? prev.filter((c) => c.name.common !== country.name.common)
                : prev.length < 2
                    ? [...prev, country]
                    : prev;


            if (newSelection.length === 2) {
                setIsModalOpen(true);
            }

            return newSelection;
        });
    };

    return (
        <div className="flex flex-col items-center lg:max-w-4xl mx-auto">
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-lg p-3 border border-gray-300 rounded-md mb-4 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none transition-all duration-200"
            />

            {filteredCountries.length === 0 ? (
                <NotFoundMessage message="No countries found. Try a different search term." showButton={false} />
            ) : (
                <>
                    {/* Countries Table */}
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-2 lg:px-4 py-2">Select</th>
                                <th className="border px-2 lg:px-4 py-2">Flag</th>
                                <th className="border px-2 lg:px-4 py-2">Country</th>
                                <th className="border px-2 lg:px-4 py-2">Capital</th>
                                <th className="border px-2 lg:px-4 py-2">Region</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredCountries.slice(0, visibleCount).map((country, index) => (
                                <tr key={index} className="border">
                                    <td className="border px-2 lg:px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCountries.some((c) => c.name.common === country.name.common)}
                                            onChange={() => toggleCountrySelection(country)}
                                            className="w-5 h-5 cursor-pointer"
                                            disabled={
                                                selectedCountries.length === 2 &&
                                                !selectedCountries.some((c) => c.name.common === country.name.common)
                                            }
                                        />
                                    </td>
                                    <td className="border px-2 lg:px-4 py-2">
                                        <img src={country.flags.png} alt={country.name.common} className="mx-auto" width={30} />
                                    </td>
                                    <td className="border px-2 lg:px-4 py-2">
                                        <Link href={`/country/${encodeURIComponent(country.name.common.replace(/\s+/g, "%20"))}`} className="text-blue-500 hover:underline">
                                            {country.name.common}
                                        </Link>
                                    </td>
                                    <td className="border px-2 lg:px-4 py-2">{country.capital?.[0] || "N/A"}</td>
                                    <td className="border px-2 lg:px-4 py-2">{country.region}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {visibleCount < filteredCountries.length && (
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 10)}
                            className="mt-4 bg-blue-500 text-white px-2 lg:px-4 py-2 cursor-pointer rounded hover:bg-blue-600"
                        >
                            Load More Countries
                        </button>
                    )}
                </>
            )}

            <CountryComparisonModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                countries={selectedCountries}
            />
        </div>
    );
}
