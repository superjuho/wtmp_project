const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

// a test query with hardcoded name
const queryDataByName = `{
    stops(name: "myyrmäki") {
      name
      locationType
      lat
      lon
      patterns {
        id
        name
        route {
          gtfsId
          shortName
          longName
        }
        directionId
      }
    }
  }
}`;

// a test query with hardcoded coordinates of Myyrmäki campus
const queryDataByLocation = `{
  stopsByRadius(lat: ${60.2585632}, lon: ${24.8446747}, radius: 500, first: 6) {
    edges {
      node {
        stop {
          gtfsId
          name
          lat
          lon
          stoptimesWithoutPatterns {
            scheduledArrival
            realtimeArrival
            arrivalDelay
            scheduledDeparture
            realtimeDeparture
            departureDelay
            realtime
            realtimeState
            serviceDay
            headsign
            trip {
              tripHeadsign
              routeShortName
            }
          }
        }
        distance
      }
      cursor
    }
    pageInfo {
        hasNextPage
        endCursor
    }
  }
}`;

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * @param {number} id - id number of the hsl stop
 */
const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
};

/**
 * Converts time to more readable format (HH:MM)
 *
 * @param {number} seconds - since midnight of the departure date
 * @returns {string}
 */
const getTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - (hours * 60);
  // add leading zero to minutes string if needed
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const HSLData = {
  url: apiUrl,
  queryDataByName,
  queryDataByLocation,
  getQueryForNextRidesByStopId,
  getTime
};

export default HSLData;