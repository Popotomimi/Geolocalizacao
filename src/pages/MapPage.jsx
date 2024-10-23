// Hooks
import React, { useState } from "react";

// API Google
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Axios
import axios from "axios";

// React-toastfy
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const newTimestamp = new Date().toLocaleString();

          setLocation(newLocation);
          setTimestamp(newTimestamp);

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}&key=AIzaSyCuSfLFwPPEEmWJy1Lv8QRlxWvzoCq1Tdc`
            );

            const address = response.data.results[0].address_components.find(
              (component) => component.types.includes("route")
            ).long_name;

            const user = {
              name,
              email,
              location: address,
              datetime: newTimestamp,
            };

            const resp = await axios.post(
              "https://geo-backend-aspq.onrender.com/users/register",
              user
            );
            toast.success(resp.data.message);
          } catch (error) {
            console.log(error);
          }
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
