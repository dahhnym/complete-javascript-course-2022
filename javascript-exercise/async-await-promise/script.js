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
  fetch(`https://restcountries.com/v2/name/${country}`).then(res => {
    res
      .json()
      .then(
        // res.json()도 비동기 함수로서 promise를 반환한다. 따라서 then()을 사용해서 콜백함수를 통해 promise 처리를 해줘야한다.
        data => {
          renderCountry(data[0]);
          const neighbor = data[0].borders?.[0];

          if (!neighbor) return;
          return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
        }
      )
      .then(res => res.json())
      .then(data => renderCountry(data, 'neighbour'));
  });
};

getCountryData('germany');
