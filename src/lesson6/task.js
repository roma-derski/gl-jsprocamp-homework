// с помощью Fetch API и swapi.co API получить следующие данные

// Климат на любой планете по её имени
// {planetName} – String
const getClimate = function(planetName) {
  const request = `https://swapi.co/api/planets/?search=${planetName}`;
  fetch(request)
    .then(response => response.json())
    .then(data => data.results[0].climate)
    .catch(err => err);
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = function(name) {
  let request = `https://swapi.co/api/people/?search=${name}`;
  let person = fetch(request)
    .then(response => response.json())
    .then(personObj => {
      
      let requestHome = personObj.results[0].homeworld;
      personObj.homeworld = fetch(requestHome)
        .then(response => response.json())
        .then(data => data.name)
        .catch(err => err);
      
      let requestFilms = personObj.results[0].films;
      personObj.films = Promise.all(requestFilms.map(film => {
        return fetch(film)
          .then(response => response.json())
          .then(data => data.title)
          .catch(err => err);
      }));
      
      let requestSpecies = personObj.results[0].species;
      personObj.species = Promise.all(requestSpecies.map(specie => {
        return fetch(specie)
          .then(response => response.json())
          .then(data => data.name)
          .catch(err => err);
      }));
      
      let requestVehicles = personObj.results[0].vehicles;
      personObj.vehicles = Promise.all(requestVehicles.map(vehicle => {
        return fetch(vehicle)
          .then(response => response.json())
          .then(data => data.name)
          .catch(err => err);
      }));      
      
      let requestStarships = personObj.results[0].starships;
      personObj.starships = Promise.all(requestStarships.map(starship => {
        return fetch(starship)
          .then(response => response.json())
          .then(data => data.name)
          .catch(err => err);
      })); 
      
      // let requestFilms = personObj.results[0].films;
      // let requestSpecies = personObj.results[0].species;
      // let requestVehicles = personObj.results[0].vehicles;
      // let requestStarships = personObj.results[0].starships;
      // let requestArrs = [];
      // requestArrs.push(requestFilms, requestSpecies, requestVehicles, requestStarships);
      // let responseArrs = Promise.all(requestArrs.map(requestArr => {
      //   return Promise.all(requestArr.map(requestFeature => {
      //     return fetch(requestFeature)
      //       .then(response => response.json())
      //       .then(data => (data.name || data.title))
      //       .catch(err => err);
      //   }));
      // }));
      
      // console.log(responseArrs);
      // [personObj.films, personObj.species, personObj.vehicles, personObj.starships] = responseArrs;
      // console.log(responseArrs);

      return personObj;
    })
    .catch(err => err);
  return person;
  // console.log(person);
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = (starshipName) => {
  const request = `https://swapi.co/api/starships/?search=${starshipName}`;
  let pilots = fetch(request)
    .then(response => response.json())
    .then(personObj => {
      let requestPilots = personObj.results[0].pilots;
      personObj.pilots = Promise.all(requestPilots.map(pilot => {
        return fetch(pilot)
          .then(response => response.json())
          .then(data => data.name)
          .catch(err => err);
      }));
      
      return personObj;
    })
    .catch(err => err);
  return pilots;
};


// console.log(getClimate('Yavin IV'));
// console.log(getProfile('Luke Skywalker'));
// console.log(getPilots('Millennium Falcon'));


export default {
  getClimate,
  getProfile,
  getPilots
};
