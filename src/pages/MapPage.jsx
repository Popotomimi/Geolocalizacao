import React, { useState, useEffect } from "react";

// API Google
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Axios
import axios from "axios";

// React-toastify
import { toast } from "react-toastify";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuSfLFwPPEEmWJy1Lv8QRlxWvzoCq1Tdc",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [initialLocation, setInitialLocation] = useState({
    lat: -23.591485,
    lng: -46.688377,
  });
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const api = "https://geo-backend-aspq.onrender.com";
  /* http://localhost:3333 */

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${api}/events/getall`);
        setEvents(response.data.events);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

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
              phone,
              location: address,
              datetime: newTimestamp,
              eventId: selectedEventId,
            };
            const resp = await axios.post(`${api}/users/register`, user);
            toast.success(resp.data.message);
          } catch (error) {
            console.log(error);
          } finally {
            setIsButtonDisabled(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsButtonDisabled(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="container">
      <h1>Faça o Check in</h1>
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
          <label>Digite seu Número de telefone</label>
          <input
            type="text"
            placeholder="Número de telefone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Selecione o Evento</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            required>
            <option value="">Selecione um evento</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
        {isButtonDisabled ? (
          <button id="btn" disabled>
            Aguarde...
          </button>
        ) : (
          <button id="btn" type="submit">
            Registrar
          </button>
        )}
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
