/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {StationMarker} from "@/components/map/StationMarker.tsx";
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import type {GeoJSON as GeoJSONType} from 'geojson';
import {useRef, useState} from "react";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";

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
            {points.map((point) => (
                <StationMarker point={point} key={JSON.stringify(point.properties.name)}/>
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