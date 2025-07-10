import './App.css'
import {useRef} from "react";
import {MapContainer, TileLayer} from "react-leaflet";

function App() {
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;
    return (
        <>
            <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef}
                          style={{height: "100vh", width: "100vw"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Additional map layers or components can be added here */}
            </MapContainer>


        </>
    )
}

export default App
