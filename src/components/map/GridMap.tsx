/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import type {GeoJSON as GeoJSONType} from 'geojson';
import {useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";

const latitude = 42.3555;
const longitude = -75.0602;

interface GridMapProps {
    mapKey?: string;
    geoJson?: GeoJSONType
}

export function GridMap({mapKey, geoJson}: GridMapProps) {
    const [baseLayer] = useState<MapBaseLayerName>(mapKey ? 'mapTiler' : 'openStreetMap');
    const mapRef = useRef(null);
    const mapTileLayerProps = getMapBaseLayer(baseLayer, mapKey);

    const points = geoJson?.features.filter(feature => feature.geometry.type === 'Point') || [];
    const lines = geoJson?.features.filter(feature => feature.geometry.type === 'LineString') || [];

    return (
        <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef} className="w-full h-full">
            <TileLayer {...mapTileLayerProps} />
            {points.map((point, index) => (
                <Marker
                    key={index}
                    position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
                    icon={L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="background-color: ${point.properties.style?.color || 'blue'}; width: 20px; height: 20px; border-radius: 50%;"></div>`
                    })}
                >
                    <Popup>
                        {point.properties.name || 'Unnamed Point'}
                    </Popup>
                </Marker>
            ))}
            {lines.map((line, index) => (
                <Polyline
                    key={index}
                    positions={line.geometry.coordinates.map(([lng, lat]) => [lat, lng])}
                    pathOptions={{color: "blue"}}
                />
            ))}
        </MapContainer>
    )
}