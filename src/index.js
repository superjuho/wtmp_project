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



/**
 * Display HSL ride data of a specific stop
 *
 * @param {Object} container - target DOM element container
 * @param {number} stopId - id number of the hsl stop
 */
const displayHSLDataByStopId = (container, stopId) => {
  const stopElement = document.createElement('div');
  const queryData = HSLData.getQueryForNextRidesByStopId(stopId);
  fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
    console.log('hsl data response', response.data.stop);
    const stop = response.data.stop;
    stopElement.innerHTML = `<h6>Pysäkki</h6><h3>${stop.name}</h3><ul>`;
    for (const ride of stop.stoptimesWithoutPatterns) {
      stopElement.innerHTML += `<li>Line <b>${ride.trip.routeShortName}</b>
      to: ${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}
      at ${HSLData.getTime(ride.scheduledDeparture)}
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
     lunchElement.innerHTML = `<h3>Ruokalista</h3>`;
     for (i in data.courses) {
        lunchMenu[i] =`<h4 class="category">` + data.courses[i].category + `</h4>` 
        + `<div class="mealTitle">` + data.courses[i].title_en + `</div>` 
        + `<div class="properties">` + `<p class="price">` + data.courses[i].price + `</p>` 
        + data.courses[i].properties + `</div>`;
     }

     lunchElement.innerHTML += lunchMenu.join('<br>');
     lunchContainer.appendChild(lunchElement);
 });
}




/* const queryDataByLocation = () => {
    const stopElement = document.createElement('div');
    const queryData = HSLData.queryDataByLocation();
    fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
        console.log('hsl data response', response.data.nearest.edges.node.place.stop);
    });
}; */

const container = document.querySelector('.hsl-data');
const lunchContainer = document.querySelector('.lunchContainer');
container.innerHTML = '';
lunchContainer.innerHTML = '';
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

const update = () => {
setInterval(function updateShit(){
    container.innerHTML = '';
lunchContainer.innerHTML = '';
updateDate();
displayHSLDataByStopId(container, 4150296); // Leiritie 2
displayHSLDataByStopId(container, 4150201); // Leiritie
displayHSLDataByStopId(container, 4150501); // Myyrmäki 2
displayHSLDataByStopId(container, 4150551); // Myyrmäki
getLunch();
console.log("Shit updated");
}, 10000);
}

update();