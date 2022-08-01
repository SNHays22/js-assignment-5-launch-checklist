// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    
    const destinationPlanet = document.getElementById("missionTarget");

    destinationPlanet.innerHTML =
    `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name} </li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`
}

function validateInput(testInput) {
    
    let numberInput = Number(testInput);
    let status;

    if(testInput === " "){
        status = "Empty";
    }

    else if(isNaN(numberInput)){
        status = "Not a Number";
    }

    else if(isNaN(numberInput)=== false){
        status = "Is a Number";
    }
    return status;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let pilotStatus = document.querySelector("input[name=pilotName]");
    let copilotStatus = document.querySelector("input[name=copilotName]");
    let fuelStatus = document.querySelector("input[name=fuelLevel]");
    let cargoStatus = document.querySelector("input[name=cargoMass]");
    let launchStatus = document.getElementById("launchStatus");

    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
        alert("All fields are required");
    }

    else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
        alert("Please enter a valid name");
    }

    else if(validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        alert("Please enter a valid number");
    }

    else{
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch`;

        if(fuelLevel < 10000  && cargoLevel <= 10000){
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        }

        else if(fuelLevel < 10000  && cargoLevel > 10000){
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass too high for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        }

        else if(fuelLevel >= 10000  && cargoLevel > 10000){
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too high for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        }

        else{
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Ready for Launch";
            launchStatus.style.color = "green";
        }
    };

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {

    return planets[Math.floor(Math.random()*(planets.length))];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
