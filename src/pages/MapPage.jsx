import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuSfLFwPPEEmWJy1Lv8QRlxWvzoCq1Tdc",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [initialLocation, setInitialLocation] = useState({
    lat: -23.591485,
    lng: -46.688377,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
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
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container">
      <h1>Bata seu ponto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label>Digite seu nome</label>
          <input
            type="text"
            placeholder="Nome"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Digite seu e-mail</label>
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Registrar Localização e Horário</button>
      </form>
      {timestamp && (
        <div>
          <p>Data e Horário: {timestamp}</p>
          <p>
            Localização no mapa: {location?.lat}, {location?.lng}
          </p>
          <p>Nome: {name} </p>
          <p>E-mail: {email}</p>
        </div>
      )}
      {isLoaded ? (
        <div className="map-container">
          <GoogleMap
            mapContainerClassName="map"
            center={location ? location : initialLocation}
            zoom={15}>
            <Marker position={location} />
          </GoogleMap>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MapPage;
