let countries = [];

const app = function () {

  // const button = document.querySelector('#get-countries')
  // button.addEventListener('click', handleButtonClick);

  const select = document.querySelector('#countries')
  select.addEventListener('change', handleSelectChange);

  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);
}

const handleSelectChange = function() {

  storeLastSelected(countries[this.value])
  const jsonString = localStorage.getItem('country');
  const savedCountry = JSON.parse(jsonString);

  const ul = document.querySelector('#country-details')
  // console.log(this.value)
  const liName = document.getElementById('nameLi')
  const liPopulation = document.getElementById('populationLi')
  const liCapital = document.getElementById('capitalLi')
  liName.innerText = "Name: " + savedCountry.name
  liPopulation.innerText = "Population: " + savedCountry.population
  liCapital.innerText = "Capital: " + savedCountry.capital
  ul.appendChild(liName)
  ul.appendChild(liPopulation)
  ul.appendChild(liCapital)
  const array = showBorderingCountries(countries[this.value].borders);
  console.log(array);
  displayBorders(array)
}

const displayBorders = function(array) {
  // storeLastSelected(countries[this.value])
  // const jsonString = localStorage.getItem('country');
  // const savedCountry = JSON.parse(jsonString);

  const ul = document.querySelector('#bordering-countries')
  ul.innerHTML = '';
  const header = document.createElement('h3')
  ul.appendChild(header)


  array.forEach(function(country) {
    const liName = document.createElement('li')
    const liPopulation = document.createElement('li')
    const liCapital = document.createElement('li')
    const space = document.createElement('br')
    header.innerText = "Bordering countries"
    liName.innerText = "Name: " + country.name
    liPopulation.innerText = "Population: " + country.population
    liCapital.innerText = "Capital: " + country.capital

    ul.appendChild(liName)
    ul.appendChild(liPopulation)
    ul.appendChild(liCapital)
    ul.appendChild(space);

  })


}

// const showBorderingCountries = function(bordersArray) {
//   const neighbouringCountries = []
//   bordersArray.forEach(function(border){
//     countries.forEach(function(country, border){
//       if (country.alpha3Code === border)
//       neighbouringCountries.push(country)
//     })
//     return neighbouringCountries
//     console.log(neighbouringCountries);
//   })
// }

const showBorderingCountries = function(bordersArray) {
   return countries.filter(function(country){
     return bordersArray.includes(country.alpha3Code);
  })

}

const handleButtonClick = function(){
  const url = 'https://restcountries.eu/rest/v2/all';

  makeRequest(url, requestComplete);
}


const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  //counld have a post request .open('POST', url) and .send(data) data being an object.
  request.open('GET', url);
  request.send()

  request.addEventListener('load', callback);
}

const requestComplete = function() {
  //this here refers to the request
  // which is an object that lives iin the browser it prints in the console
  if (this.status != 200) return;
  const jsonString = this.responseText;
  const data = JSON.parse(jsonString);
  countries = data;
  // console.log(countries);
  // populateList(countries);
  populateSelect(countries);
}

const populateSelect = function(countries) {
  const select = document.querySelector('#countries')

  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })

}

const storeLastSelected = function(country) {
  const jsonString = JSON.stringify(country);

  localStorage.setItem('country', jsonString)
}

// const populateList = function(countries){
//   const ul = document.querySelector('#country-list')
//   countries.forEach(function(country) {
//
//     const li = document.createElement('li');
//     li.innerText = country.name;
//     ul.appendChild(li); 
//
//     const li2 = document.createElement('li');
//     li2.innerText = country.gini;
//     ul.appendChild(li2);
//
//     const li3 = document.createElement('li');
//     const flag = document.createElement('img');
//     flag.src = country.flag;
//     li3.appendChild(flag);
//
//     ul.appendChild(li3);
//   });
// }

document.addEventListener('DOMContentLoaded', app);
