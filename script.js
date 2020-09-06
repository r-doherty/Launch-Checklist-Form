// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener('load', function () {
  let form = document.querySelector('form');

  fetch('https://handlers.education.launchcode.org/static/planets.json').then(
    function (response) {
      response.json().then(function (json) {
        const missionTarget = document.querySelector('#missionTarget');
        let missionSelecter = Math.floor(Math.random() * json.length);
        missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
            <img src="${json[missionSelecter].image}">
            <p>${json[missionSelecter].name}</p>
            <p>${json[missionSelecter].star} System</p>
            <p>Diameter: ${json[missionSelecter].diameter} </p>
            <p> ${json[missionSelecter].distance}</p>
            <p>${json[missionSelecter].moons} moons</p>
         
         `;
      });
    }
  );

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let pilotNameInput = document.querySelector('input[name=pilotName]');
    let copilotNameInput = document.querySelector('input[name=copilotName]');
    let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
    let cargoMassInput = document.querySelector('input[name=cargoMass]');

    pilotStatus.innerHTML = `Pilot: ${pilotNameInput.value}`;
    copilotStatus.innerHTML = `Co-Pilot: ${copilotNameInput.value}`;
    fuelStatus.innerHTML = 'Fuel: Sufficient for Orbit';
    cargoStatus.innerHTML = 'Cargo Mass: Within Parameters';

    if (
      pilotNameInput.value === '' ||
      copilotNameInput.value === '' ||
      fuelLevelInput.value === '' ||
      cargoMassInput.value === ''
    ) {
      alert('All fields are required!');
    } else if (
      !isNaN(pilotNameInput.value) ||
      !isNaN(copilotNameInput.value) ||
      isNaN(fuelLevelInput.value) ||
      isNaN(cargoMassInput.value)
    ) {
      alert(
        'Invalid Entry! Please ensure that valid information has been entered for each field.'
      );
    } else {
      faultyItems.style.visibility = 'visible';
      if (fuelLevelInput.value < 10000) {
        launchStatus.innerHTML = 'LAUNCH ERROR';
        launchStatus.style.color = 'red';
        fuelStatus.innerHTML = 'Fuel: Insufficent for Orbit';
        fuelStatus.style.color = 'red';
      } else {
        fuelStatus.innerHTML = 'Fuel: Sufficent for Orbit';
        fuelStatus.style.color = 'green';
      }

      if (cargoMassInput.value > 10000) {
        launchStatus.innerHTML = 'LAUNCH ERROR';
        launchStatus.style.color = 'red';
        cargoStatus.innerHTML = 'Cargo Mass: Exceeds Limit';
        cargoStatus.style.color = 'red';
      } else {
        cargoStatus.innerHTML = 'Cargo Mass: Within Parameters';
        cargoStatus.style.color = 'green';
      }

      if (cargoMassInput.value < 10000 && fuelLevelInput.value > 10000) {
        launchStatus.innerHTML = 'READY FOR LAUNCH';
        launchStatus.style.color = 'green';
        event.preventDefault();
      }
    }
  });
});
