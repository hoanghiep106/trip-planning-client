export function debounce(func, wait, immediate) {
  let timeout;
  return function apply(...args) {
    const context = this;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function decodePolyline(encoded){
  var points=[ ]
  var index = 0, len = encoded.length;
  var lat = 0, lng = 0;
  while (index < len) {
    var b, shift = 0, result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({lat:( lat / 1E5), lng:( lng / 1E5)})  
  }
  return points;
}

export function secondsToTime(secs) {
  if (secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    return `${hours > 0 ? `${hours} h ` : ''}${minutes > 0 ? `${minutes} m ` : ''}${seconds > 0 ? `${seconds} s` : ''}`;
  }
  return 0;
}

export function getDistance(meters, toFixed = 0) {
  return (meters && meters > 100) ? `${(meters / 1000).toFixed(toFixed)} km` : `${meters ? (meters).toFixed(0) : 0} m`;
}
