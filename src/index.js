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


const displayHSLDataByLocation = () => {
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
          nearStops[i] += `<br><b>${answer[i].node.stop.stoptimesWithoutPatterns[y].trip.routeShortName}</b>` 
          + ' to ' + answer[i].node.stop.stoptimesWithoutPatterns[y].trip.tripHeadsign + ' '
          + HSLData.getTime(answer[i].node.stop.stoptimesWithoutPatterns[y].realtimeDeparture);
          y++;
        }
        
        
      };
      
      busStopElement.innerHTML += nearStops.join('<br>');
      busses.appendChild(busStopElement);
  });
}
/**
 * Display HSL ride data of a specific stop
 *
 * @param {Object} container - target DOM element container
 * @param {number} stopId - id number of the hsl stop
 */
const displayHSLDataByStopId = (container, stopId) => {
  const stopElement = document.createElement('div');
  stopElement.className = "stopElement";
  const queryData = HSLData.getQueryForNextRidesByStopId(stopId);
  fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
    console.log('hsl data response', response.data.stop);
    const stop = response.data.stop;
    stopElement.innerHTML = `<h4 class="trainStopName">${stop.name}</h4><ul>`;
    for (const ride of stop.stoptimesWithoutPatterns) {
      stopElement.innerHTML += `<b>${ride.trip.routeShortName}</b>
       ${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}
       ${HSLData.getTime(ride.scheduledDeparture)} <br>
      </li>`;
    }
    stopElement.innerHTML += `</ul>`;
    container.appendChild(stopElement);
  });
  // TODO: error handling, what happens when new data not available?
};

const getLunch = () => {
sodexoData.getSodexoLunchMenu(dateString)
 .then((data) => {
     var i, lunchMenu = [];
     const lunchElement = document.createElement('div');
     lunchElement.className = "lunchElement";
     const lunchContainer = document.querySelector('.lunchContainer');
     lunchElement.innerHTML = `<h3>Ruokalista</h3>`;
     for (i in data.courses) {
        lunchMenu[i] =`<div class="meal"><h4 class="category">` + data.courses[i].category + `</h4>` 
        + `<div class="mealTitle">` + data.courses[i].title_en + `</div>` 
        + `<div class="properties">` + `<p class="price">` + data.courses[i].price + `</p>` 
        + data.courses[i].properties + `</div></div>`;
     }

     lunchElement.innerHTML += lunchMenu.join('<br>');
     lunchContainer.appendChild(lunchElement);
 });
}

const bulletin = () => {
  const bullet = '<img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"></img>';
  const bulletElement = document.createElement('div');
  const bulletinContainer = document.querySelector('.bulletinContainer');
  bulletElement.innerHTML = bullet;
  bulletinContainer.appendChild(bulletElement);
}




/* const queryDataByLocation = () => {
    const stopElement = document.createElement('div');
    const queryData = HSLData.queryDataByLocation();
    fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
        console.log('hsl data response', response.data.nearest.edges.node.place.stop);
    });
}; */



// Fetch and show HSL data
/*displayHSLDataByStopId(container, 4150296); // Leiritie 2
displayHSLDataByStopId(container, 4150201); // Leiritie
displayHSLDataByStopId(container, 4150501); // Myyrmäki 2
displayHSLDataByStopId(container, 4150551); // Myyrmäki
getLunch();*/

/*const updateShit = () => {
container.innerHTML = '';
lunchContainer.innerHTML = '';
updateDate();
displayHSLDataByStopId(container, 4150296); // Leiritie 2
displayHSLDataByStopId(container, 4150201); // Leiritie
displayHSLDataByStopId(container, 4150501); // Myyrmäki 2
displayHSLDataByStopId(container, 4150551); // Myyrmäki
getLunch();
console.log("Shit updated");
alert("shit updated!");
} */

/*const update = () => {
  setInterval(function updateShit(){
    //carouselMagic.carousel();
    const container = document.querySelector('.hsl-data');
    const lunchContainer = document.querySelector('.lunchContainer');
    const bulletinContainer = document.querySelector('.bulletinContainer');
    container.innerHTML = '';
    lunchContainer.innerHTML = '';
    bulletinContainer.innerHTML = '';
    updateDate();
    displayHSLDataByLocation();
    displayHSLDataByStopId(container, 4150501); // Myyrmäki 2
    displayHSLDataByStopId(container, 4150551); // Myyrmäki
    getLunch();
    bulletin();
      console.log("Shit updated");
    }, 100000);
}  */
    const container = document.querySelector('.hsl-data');
    const lunchContainer = document.querySelector('.lunchContainer');
    const bulletinContainer = document.querySelector('.bulletinContainer');
    container.innerHTML = '';
    lunchContainer.innerHTML = '';
    bulletinContainer.innerHTML = '';
    updateDate();
    displayHSLDataByLocation();
    displayHSLDataByStopId(container, 4150501); // Myyrmäki 2
    displayHSLDataByStopId(container, 4150551); // Myyrmäki
    getLunch();
    bulletin();
      console.log("Shit updated");

//update();