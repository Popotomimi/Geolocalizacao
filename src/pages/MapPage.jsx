import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuSfLFwPPEEmWJy1Lv8QRlxWvzoCq1Tdc",
  });

  const [location, setLocation] = useState({
    lat: -23.591485,
    lng: -46.688377,
  });
  const [timestamp, setTimestamp] = useState(null);

  /* ************************************ */

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      if (
        typeof navigator.geolocation.requestGeolocationPermission === "function"
      ) {
        // `requestGeolocationPermission` is supported, use it
        navigator.geolocation
          .requestGeolocationPermission()
          .then(() => {
            // Permission granted after the request, get the location
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
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
            // Fallback for older browsers without requestGeolocationPermission
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
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
        // Fallback for older browsers without requestGeolocationPermission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
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
  }, []);

  /* *********************************** */

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setTimestamp(new Date().toLocaleString());
      });
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  return (
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      <h1>Bata seu ponto</h1>
      <button onClick={handleButtonClick}>
        Registrar Localização e Horário
      </button>
      <p>
        Latitude: {latitude} Longitude: {longitude}
      </p>
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
          center={location}
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
