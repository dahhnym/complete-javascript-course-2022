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
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => {
      // then() 메소드 -> promise가 fulfilled 됐을때 실행
      if (!res.ok) {
        throw new Error(`Country not found (${res.status})`);
      }
      return res.json();
    })
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
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(`Error: ${err.message} 💥💥💥`)) // catch() 메소드 -> promise가 rejected 됐을때 실행
    .finally(() => {
      // finally() 메소드 -> promise의 결과에 상관없이 항상 실행함
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('ㅁㄴㅇㄹ');
});
