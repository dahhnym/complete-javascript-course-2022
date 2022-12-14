'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>๐ซ</span>${(
              data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>๐ฃ๏ธ</span>${data.languages[0].name}</p>
            <p class="country__row"><span>๐ฐ</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`${errorMsg} (${res.status})`);
    }
    return res.json();
  });
};

const getCountryData = function (country) {
  // Country
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      if (!neighbor) throw new Error('No neighbor found');
      // error throwํ ์์ ์์ promise๋ rejected๋๊ณ  ๋ฐ๋ก catch() ๋ฉ์๋๋ฅผ ์คํํ๋ค.

      // Neighbor Country
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(`Error: ${err.message} ๐ฅ๐ฅ๐ฅ`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
