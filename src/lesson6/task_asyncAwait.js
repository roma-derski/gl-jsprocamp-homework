// с помощью Fetch API и swapi.co API получить следующие данные

// Климат на любой планете по её имени
// {planetName} – String
const getClimate = async function(planetName) {
  const request = `https://swapi.co/api/planets/?search=${planetName}`;
  const response = await fetch(request);
  const data = await response.json();
  return data.results[0].climate;
};
//getClimate('Yavin IV');


// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = async function(name) {
  const request = `https://swapi.co/api/people/?search=${name}`;
  const response = await fetch(request);
  const personObj = await response.json();
 
  let homeworldData = await fetch(personObj.results[0].homeworld);    
  homeworldData = await homeworldData.json();
  personObj.homeworld = homeworldData.name;
  
  const requestFilms = personObj.results[0].films;
  let filmsData = await Promise.all(requestFilms.map(async (requestFilm) => await fetch(requestFilm)));
  filmsData = await Promise.all(filmsData.map(async filmData => await filmData.json()));
  personObj.films = filmsData.map(film => film.title);
      
  const requestSpecies = personObj.results[0].species;
  let speciesData = await Promise.all(requestSpecies.map(async (requestSpecie) => await fetch(requestSpecie)));
  speciesData = await Promise.all(speciesData.map(async specieData => await specieData.json()));
  personObj.species = speciesData.map(specie => specie.name);
  
  const requestVehicles = personObj.results[0].vehicles;  
  let vehiclesData = await Promise.all(requestVehicles.map(async (requestVehicle) => await fetch(requestVehicle)));
  vehiclesData = await Promise.all(vehiclesData.map(async vehicleData => await vehicleData.json()));
  personObj.vehicles = vehiclesData.map(vehicle => vehicle.name);  
      
  const requestStarships = personObj.results[0].starships;    
  let starshipsData = await Promise.all(requestStarships.map(async (requestStarship) => await fetch(requestStarship)));
  starshipsData = await Promise.all(starshipsData.map(async starshipData => await starshipData.json()));
  personObj.starships = starshipsData.map(starship => starship.name);       
  
  return personObj;
};
// getProfile('Luke Skywalker');

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = async (starshipName) => {
  const request = `https://swapi.co/api/starships/?search=${starshipName}`;
  const response = await fetch(request);
  const data = await response.json();
  
  const requestPilots = data.results[0].pilots;
  let pilotsData = await Promise.all(requestPilots.map(async (requestPilot) => await fetch(requestPilot)));
  pilotsData = await Promise.all(pilotsData.map(async pilotData => await pilotData.json()));
  const pilots = pilotsData.map(pilot => pilot.name);
  
  return pilots;
};
//getPilots('Millennium Falcon');





  

export default {
  getClimate,
  getProfile,
  getPilots
};
