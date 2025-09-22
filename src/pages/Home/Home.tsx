import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Home = () => {
  const position: [number, number] = [23.7915178, 90.3713319]; // lat, lon

  return (
    <div className="flex gap-4">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "50%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>

      <iframe
        src={`https://www.google.com/maps?q=23.7915178,90.3713319&z=15&output=embed`}
        width="50%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Home;
