export function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const choice = '?fields=name,capital,population,flags,languages';
    return fetch(`${BASE_URL}${name}${choice}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}