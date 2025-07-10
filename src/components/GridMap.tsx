/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {MapContainer, TileLayer} from "react-leaflet";
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import {useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
const latitude = 42.3555;
const longitude = -75.0602;

interface GridMapProps {
    mapKey?: string;
}

export function GridMap({mapKey}: GridMapProps) {
    const [baseLayer] = useState<MapBaseLayerName>(mapKey ? 'mapTiler' : 'openStreetMap');
    const mapRef = useRef(null);
    const mapTileLayerProps = getMapBaseLayer(baseLayer, mapKey)
    return (
        <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef}
                      style={{height: "100vh", width: "100vw"}}>
            <TileLayer {...mapTileLayerProps} />
        </MapContainer>
    )
}