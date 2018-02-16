//USD CAD 23
// 23 USD us worth 28 CAD. You can spend thses in the folloring countries

const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`https://api.fixer.io/latest?base=${from}`).then( response => {
    return response.data.rates[to];
  });
};

const getCountries = currencyCode => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then( response => {
      return response.data.map( country => country.name);
    });
};

const getExchangeRateAlt = async (from, to) => {
  try {
    const res = await axios.get(`https://api.fixer.io/latest?base=${from}`)
    const rate = res.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch(e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
  }
};

const getCountriesAlt = async currencyCode => {
  try {
    const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return res.data.map( country => country.name);
  } catch(e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`)
  }
};

// getExchangeRate('USD', 'EUR').then( rate => {
//   console.log(rate);
// });

// getCountries('EUR').then( countries => {
//   console.log(countries);
// });

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then( tempCountries => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then( rate => {
    const exchangeAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountriesAlt(to);
  const rate = await getExchangeRateAlt(from, to);
  const exchangeAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

// getCountries('EUR').then( countries => {
//   console.log(countries);
// });

// convertCurrency('USD', 'CAD', 123).then( countries => {
//   console.log(countries);
// });

convertCurrencyAlt('USD', 'MMM', 100).then( res => {
  console.log(res);
}).catch( e => console.log(e.message) );