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

import {fetchPost} from './modules/network';
import HSLData from './modules/hsl-data';
import bodyParser from 'body-parser';


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
    stopElement.innerHTML = `<h3>Next rides from ${stop.name}</h3><ul>`;
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

const container = document.querySelector('.hsl-data');
container.innerHTML = '';
// Fetch and show HSL data
displayHSLDataByStopId(container, 4150267);
displayHSLDataByStopId(container, 4150250);