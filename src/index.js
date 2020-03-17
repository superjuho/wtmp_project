console.log('hello world');

const display = document.querySelector('.date');

const startTime = () => {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() +1;
    const year = today.getUTCFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    display.innerHTML =
   day + "/" + month + "/" + year + " " + h + ":" + m;
    var t = setTimeout(startTime, 500);
  }
  const checkTime = (i) => {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  startTime();

  var date = new Date();
  var dateString;
  
  const updateDate = () => {
  dateString = date.getFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
     + ('0' + date.getDate()).slice(-2);

     console.log(dateString);
     return dateString; 
  }

  updateDate();
  console.log("udated the date", dateString);
  

import {fetchPost} from './modules/network';
import HSLData from './modules/hsl-data';
import sodexoData from './modules/sodexo-lunch-data';
import carouselMagic from './modules/carousel';


const displayHSLDataByLocation = () => {                                                                // getting near bus stops information, and realtimeDeparture. 
  console.log("täällä ollaan");
  const busStopElement = document.createElement('div');
  busStopElement.className = "busStopElement";
  const busses = document.querySelector('.hsl-data');
  const queryData = HSLData.queryDataByLocation;
  fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
      console.log('hsl data location response', response.data.stopsByRadius.edges);
      var i, nearStops = [];
      const answer = response.data.stopsByRadius.edges;
      for (i in answer) {
        nearStops[i] = `<h4 class="busStopName">${answer[i].node.stop.name}</h4>`;
        console.log(answer[i].node.stop.name);
        let y = 0;
        for (let x = 0; x < 3; x++) {
          nearStops[i] += `<div class="busHeader"><b><i class="fas fa-bus"></i> ${answer[i].node.stop.stoptimesWithoutPatterns[y].trip.routeShortName}</b>` +' ' 
          +` to ${answer[i].node.stop.stoptimesWithoutPatterns[y].trip.tripHeadsign}` + ' '
          + `${HSLData.getTime(answer[i].node.stop.stoptimesWithoutPatterns[y].realtimeDeparture)}</div>`;
          y++;
        }
        
        
      };
      
      busStopElement.innerHTML += nearStops.join(' ');
      busses.appendChild(busStopElement);
  });
}
/**
 * Display HSL ride data of a specific stop
 *
 * @param {Object} container - target DOM element container
 * @param {number} stopId - id number of the hsl stop
 */
const displayHSLDataByStopId = (container, stopId) => {                                       // getting information on the trains from myyrmäki's station.
  const stopElement = document.createElement('div');
  stopElement.className = "stopElement";
  const queryData = HSLData.getQueryForNextRidesByStopId(stopId);
  fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
    console.log('hsl data response', response.data.stop);
    const stop = response.data.stop;
    stopElement.innerHTML = `<h4 class="trainStopName">${stop.name}</h4>`;
    for (const ride of stop.stoptimesWithoutPatterns) {
      stopElement.innerHTML += `<b><i class="fas fa-train"></i>
      ${ride.trip.routeShortName}</b>
       ${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}
       ${HSLData.getTime(ride.scheduledDeparture)} <br>
      </li>`;
    }
    stopElement.innerHTML += ` `;
    container.appendChild(stopElement);
  });
};

const getLunch = () => {                                                              // getting lunch information 
  sodexoData.getSodexoLunchMenu(dateString)
   .then((data) => {
       var i, lunchMenu = [];
       const lunchElement = document.createElement('div');
       lunchElement.className = "lunchElement";
       const lunchContainer = document.querySelector('.lunchContainer');
       lunchElement.innerHTML = `<h3 class="menuHeader">Lunch menu</h3>`;
       for (i in data.courses) {
          lunchMenu[i] =`<div class="meal"><h4 class="category">` + data.courses[i].category + `</h4>` 
          + `<div class="mealTitle">` + data.courses[i].title_en + `</div>` 
          + `<div class="properties">` + `<p class="price">` + data.courses[i].price 
          + data.courses[i].properties + ` ` +`</p>` + `</div></div>`;
       }
  
       lunchElement.innerHTML += lunchMenu.join(' ');
       lunchContainer.appendChild(lunchElement);
   });
  }

const bulletin = () => {                                                          // bullet information window for changing stuff. 
  const bullet = '<img src="assets/fulbright.png"></img>';
  const bulletElement = document.createElement('div');
  const bulletinContainer = document.querySelector('.bulletinContainer');
  bulletElement.innerHTML = bullet;
  bulletinContainer.appendChild(bulletElement);
}






const update = () => {                                                          // update function updates the information every 15 seconds. 
  setInterval(function updateShit(){
    carouselMagic.carousel();                                                   // First carousel spins the stuff to right place and then information is updated.
    const container = document.querySelector('.hsl-data');
    const lunchContainer = document.querySelector('.lunchContainer');
    const bulletinContainer = document.querySelector('.bulletinContainer');
    const trainContainer = document.createElement('div');
    trainContainer.className = "trainContainer";
    container.appendChild(trainContainer);
    container.innerHTML = '';
    lunchContainer.innerHTML = '';
    bulletinContainer.innerHTML = '';
    updateDate();
    displayHSLDataByLocation();
    displayHSLDataByStopId(trainContainer, 4150501); // Myyrmäki 2
    displayHSLDataByStopId(trainContainer, 4150551); // Myyrmäki
    container.appendChild(trainContainer);
    getLunch();
    bulletin();
    }, 15000);
}  
  

update();