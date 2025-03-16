export interface Country {
    name: { common: string };
    flags: { png: string };
    capital?: string[];
    region: string;
    population: number;
    area: number;
    gdp?: number;
}

export interface Country {
    name: { common: string };
    flags: { png: string };
    population: number;
    area: number;
    gdp?: number;
}

 export interface CountryComparisonModalProps {
    open: boolean;
    onClose: () => void;
    countries: Country[];
}

export interface NotFoundMessageProps {
    message: string;
    showButton?: boolean;
}