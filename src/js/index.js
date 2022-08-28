import '../css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { countriesListMarkup, countryCardMarkup } from './markup';

const DEBOUNCE_DELAY = 300;
