import '../css/styles.css'; 
import '../css/myStyles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { countriesListMarkup, countryCardMarkup } from './markup';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
    event.preventDefault();
    const countryName = searchBox.value.trim();
    if (countryName === '') {
        clearData();
        return;
    }

    fetchCountries(countryName)
        .then(renderMarkup)
        .catch(error => {
            Notiflix.Notify.failure(`Oops, there is no country with that name`);
            clearData();
            return error;
        });
}

function renderMarkup(countries) {
        if (countries.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
            clearData();
            return;
        }

        if (countries.length >= 2 && countries.length <= 10) {
            const listMarkup = countries.map(country => countriesListMarkup(country));
            countryList.innerHTML = listMarkup.join('');
            countryInfo.innerHTML = '';
        }

        if (countries.length === 1) {
            const markup = countries.map(counrtry => countryCardMarkup(counrtry));
            countryInfo.innerHTML = markup.join('');
            countryList.innerHTML = '';
        }
    }
    

function clearData() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}



    