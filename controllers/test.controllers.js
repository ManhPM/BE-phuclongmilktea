const { Storage } = require("../models");
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
const storeLat = 10.85025804481258;
const storeLng = 106.76530384273872;

const getPositionOfUser = (req, res) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((success, error) => {
      if (error){
        console.error(error);
      }
      else {
        const customerLat = success.latitude;
        const customerLng = success.longitude;
        const distance = getDistanceFromLatLonInKm(storeLat, storeLng, customerLat, customerLng);
        res.status(200).json(distance);
      };
  });
  } else {
    console.log("Trình duyệt không hỗ trợ định vị.");
    res.status(400).json({message: "Trình duyệt không hỗ trợ định vị."})
  }
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// actually call the function getLocation

module.exports = {

};
