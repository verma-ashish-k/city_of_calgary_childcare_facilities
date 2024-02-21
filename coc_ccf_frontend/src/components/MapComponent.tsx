import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

function MapComponent() {
  useEffect(() => {
    // Define the bounds for the Calgary area
    const calgaryBounds = L.latLngBounds(
      L.latLng(50.8, -114.4), // Southwestern corner
      L.latLng(51.3, -113.7) // Northeastern corner
    );

    // Create a map centered on Calgary and set an initial zoom level
    const map = L.map('map', {
      maxBounds: calgaryBounds, // Restrict the map to the Calgary area
      minZoom: 10, // Restrict the minimum zoom level
      maxBoundsViscosity: 2.0,
    }).setView([51.0486, -114.0708], 11); // Replace with the desired coordinates and zoom level

    // Add a base layer (in this case, an OpenStreetMap tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.control.scale().addTo(map);

    // //live location of the user
    // navigator.geolocation.watchPosition(success, error);
    // //@ts-expect-error - Leaflet typings are not up to date
    // let marker, circle;

    // function success(pos: {
    //   coords: { latitude: number; longitude: number; accuracy: number };
    // }) {
    //   const lat = pos.coords.latitude;
    //   const lng = pos.coords.longitude;
    //   const accuracy = pos.coords.accuracy;
    //   //@ts-expect-error - Leaflet typings are not up to date
    //   if (marker) {
    //     map.removeLayer(marker);
    //     //@ts-expect-error - Leaflet typings are not up to date
    //     map.removeLayer(circle);
    //   }

    //   marker = L.marker([lat, lng]).addTo(map);
    //   circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    //   map.fitBounds(circle.getBounds());
    // }

    // function error(err: { code: number }) {
    //   if (err.code === 1) {
    //     alert('Please Allow Location Access!');
    //   } else {
    //     alert('Cannot get current location.');
    //   }
    // }

    return () => {
      // Clean up any resources when the component is unmounted
      map.remove();
    };
  }, []);

  return (
    <>
      <div id='map' className=' w-full h-96 mx-auto mt-5 rounded-xl'></div>
    </>
  );
}

export default MapComponent;
