interface Country {
    name: { common: string };
    flags: { png: string };
    capital?: string[];
    region: string;
    population: number;
    area: number;
    gdp?: number;
}

interface Country {
    name: { common: string };
    flags: { png: string };
    population: number;
    area: number;
    gdp?: number;
}

interface CountryComparisonModalProps {
    open: boolean;
    onClose: () => void;
    countries: Country[];
}

interface NotFoundMessageProps {
    message: string;
    showButton?: boolean;
}