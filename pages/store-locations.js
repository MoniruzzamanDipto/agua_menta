import { Geo } from "@styled-icons/bootstrap";
import dynamic from "next/dynamic";
import { useState } from "react";

const MapComponent = dynamic(() => import("../components/Map/mapComponent"), {
  ssr: false,
});
export default function StoreLoactions() {
  const [activeLocationId, setActiveLocationId] = useState(null);
  const locations = [
    {
      id: 1,
      lat: 18.6633538,
      lng: -68.3964201,
      title: "Barceló Bávaro Palace",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address:
        "Calle Principal Hotel Barceló 1, Punta Cana 23001, Dominican Republic",
    },
    {
      id: 2,
      lat: 18.6700051,
      lng: -68.4068863,
      title: "Agua Menta, Hotel Lopesan",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address: "Punta Cana 23301, Dominican Republic",
    },
    {
      id: 3,
      lat: 18.7162977,
      lng: -68.4504841,
      title: "Agua Menta, Hotel Iberostar",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address: "Punta Cana 23300, Dominican Republic",
    },
    {
      id: 4,
      lat: 18.5577062,
      lng: -68.3830168,
      title: "Agua Menta",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address: "BlueMall, Punta Cana 23000, Dominican Republic",
    },
    {
      id: 5,
      lat: 18.7343746,
      lng: -68.6368608,
      title: "Agua Menta Woman, Hotel Hard Rock",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address: "Lobby de Grupos, Punta Cana 23300, Dominican Republic",
    },
    {
      id: 6,
      lat: 18.7685055,
      lng: -68.5404485,
      title: "Agua Menta, Hotel Riu Calle Caribeña",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address:
        "Carr. El Macao - Arena Gorda, Punta Cana 23000, Dominican Republic",
    },
    {
      id: 7,
      lat: 18.7225559,
      lng: -68.4675882,
      title: "Agua Menta, Hotel Bavaro Princess",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address: "Punta Cana 23000, Dominican Republic",
    },
    {
      id: 8,
      lat: 18.4828213,
      lng: -69.9397118,
      title: "Agua Menta",
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      address:
        "Ágora Mall, Av. John F. Kennedy, Santo Domingo, Dominican Republic",
    },
  ];
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="mx-3">
          <h1 className="h3 my-3">All stores</h1>
          <ul className="list-group-flush ps-0">
            {locations.map((location) => (
              <li
                key={location.id}
                onClick={() => setActiveLocationId(location.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    location.id === activeLocationId ? "#e0e0e0" : "#fff",
                }}
                className="list-group-item"
              >
                <h4 className="h5">
                  <Geo width={20} height={20} className="me-1" />
                  {location.title}
                </h4>
                <p className="mb-0 ms-4">{location.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-md-8">
        <MapComponent
          locations={locations}
          activeLocationId={activeLocationId}
          setActiveLocationId={setActiveLocationId}
        />
      </div>
    </div>
  );
}
