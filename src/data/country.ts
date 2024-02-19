import { RouteLoadFunc, cache } from '@solidjs/router';
import { Country } from '../types';

export const getCountries = cache(async (name: string): Promise<Country[]> => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (res.status === 404) return [];
    return await res.json();
}, 'countries');

export const getCountry = cache(async (cioc: string): Promise<Country[]> => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${cioc}`);
    if (res.status === 404) return [];
    return await res.json();
}, 'country');

export const loadCountry: RouteLoadFunc = ({ params }) => {
    getCountry(params.cioc);
};
