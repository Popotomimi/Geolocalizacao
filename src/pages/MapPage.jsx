import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuSfLFwPPEEmWJy1Lv8QRlxWvzoCq1Tdc",
  });

  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [initialLocation, setInitialLocation] = useState({
    lat: -23.591485,
    lng: -46.688377,
  });

  /* ************************************ */

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  /* *********************************** */

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      if (
        typeof navigator.geolocation.requestGeolocationPermission === "function"
      ) {
        navigator.geolocation
          .requestGeolocationPermission()
          .then(() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setTimestamp(new Date().toLocaleString());
              },
              (error) => {
                console.error("Error getting location:", error);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              }
            );
          })
          .catch((error) => {
            console.error("Error requesting geolocation permission:", error);
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setTimestamp(new Date().toLocaleString());
              },
              (error) => {
                console.error("Error getting location:", error);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              }
            );
          });
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setTimestamp(new Date().toLocaleString());
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      <h1>Bata seu ponto</h1>
      <button onClick={handleButtonClick}>
        Registrar Localização e Horário
      </button>
      {timestamp && (
        <div>
          <p>Data e Horário: {timestamp}</p>
          <p>
            Localização no mapa: {location.lat}, {location.lng}{" "}
          </p>
        </div>
      )}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={location ? location : initialLocation}
          zoom={15}>
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MapPage;
