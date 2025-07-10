import './App.css'
import {useRef} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

function App() {
    const mapRef = useRef(null);
    const latitude = 42.3555;
    const longitude = -75.0602;
    const key = import.meta.env.VITE_MAPTILER_API_KEY;
    return (
        <>
            <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef}
                          style={{height: "100vh", width: "100vw"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${key}`}
                />
                {/* Additional map layers or components can be added here */}
            </MapContainer>
        </>
    )
}

export default App
