import { Country } from '../types/country';

export const getCountries = async (name: string): Promise<Country[]> => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (res.status === 404) return [];
    return await res.json();
};

export const getCountry = async (cioc: string): Promise<Country[]> => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${cioc}`);
    if (res.status === 404) return [];
    return await res.json();
};
