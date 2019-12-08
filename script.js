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

window.addEventListener("load", function() {
   let form = document.querySelector("form")
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         const missionTarget = document.querySelector("#missionTarget");
         let missionSelecter = (Math.floor(Math.random()*json.length));
         missionTarget.innerHTML =
         `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[missionSelecter].name}</li>
            <li>Diameter: ${json[missionSelecter].diameter}</li>
            <li>Star: ${json[missionSelecter].star}</li>
            <li>Distance from Earth: ${json[missionSelecter].distance}</li>
            <li>Number of Moons: ${json[missionSelecter].moons}</li>
         </ol>
         <img src="${json[missionSelecter].image}">
         `
      });
   });
           
   form.addEventListener("submit", function(event) {

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      pilotStatus.innerHTML =`${pilotNameInput.value}`;
      copilotStatus.innerHTML = `${copilotNameInput.value}`;
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      cargoStatus.innerHTML = "Cargo mass low enough for launch";

      if(pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "")
      {
         alert("All fields are required!");
         event.preventDefault();
      }
      else if(!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value))
      {
         alert("Invalid Entry! Please ensure that valid information has been entered for each field.");
         event.preventDefault();
      }
      else if(fuelLevelInput.value < 10000)
      {
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
         fuelStatus.innerHTML = "Fuel level too low for launch";
         event.preventDefault();
      }
      else if(cargoMassInput.value > 10000)
      {
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
         cargoStatus.innerHTML = "Cargo mass too high to launch";
         event.preventDefault();
      }
      else
      {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      }
      

   });
});