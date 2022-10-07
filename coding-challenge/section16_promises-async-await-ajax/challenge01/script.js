'use strict';

const authCode = '143353245637492105631x68333';
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

const whereAmI = function (lat, lon) {
  fetch(`https://geocode.xyz/${lat},${lon}?geoit=json&auth=${authCode}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      if (!resJson) {
        throw Error(`Unknown Location`);
      }
      if (!resJson.city) {
        throw Error(`City Not Found!`);
      }
      if (!resJson.country) {
        throw Error(`Country Not Found!`);
      }
      const { city, country } = resJson;
      console.log(`You are in ${city}, ${country}`);
      return country;
    })
    .then(country => getCountryData(country))
    .catch(err => alert(`Error: ${err}`));
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => res.json())
    .then(resJson => {
      const data = resJson[0];
      renderCountry(data); ///
    })
    .catch(err => console.log(err.message));
};

btn.addEventListener('click', () => whereAmI(52.508, 13.381));

// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
