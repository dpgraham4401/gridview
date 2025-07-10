import './App.css'
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import {useRef, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';


const latitude = 42.3555;
const longitude = -75.0602;


function App() {
    const mapRef = useRef(null);
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [baseLayer] = useState<MapBaseLayerName>(mapTilerKey ? 'mapTiler' : 'openStreetMap');
    const mapTileLayerProps = getMapBaseLayer(baseLayer, mapTilerKey)

    return (
        <>
            <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef}
                          style={{height: "100vh", width: "100vw"}}>
                <TileLayer {...mapTileLayerProps} />
            </MapContainer>
        </>
    )
}

export default App
