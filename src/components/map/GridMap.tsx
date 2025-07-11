/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {StationMarker} from "@/components/map/StationMarker.tsx";
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import type {PowerGridProperties} from "@/lib/parsers.ts";
import type {Feature, FeatureCollection, LineString, Point} from 'geojson';
import {useRef, useState} from "react";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";

const latitude = 42.3555;
const longitude = -75.0602;

interface GridMapProps {
    mapKey?: string;
    geoJson?: FeatureCollection<Point | LineString, PowerGridProperties>
}

function isPointFeature(feature: Feature<Point | LineString, PowerGridProperties>): feature is Feature<Point, PowerGridProperties> {
    return feature.geometry.type === 'Point';
}

function isLineStringFeature(feature: Feature<Point | LineString, PowerGridProperties>): feature is Feature<LineString, PowerGridProperties> {
    return feature.geometry.type === 'LineString';
}

export function GridMap({mapKey, geoJson}: GridMapProps) {
    const [baseLayer] = useState<MapBaseLayerName>(mapKey ? 'mapTiler' : 'openStreetMap');
    const mapRef = useRef(null);
    const mapTileLayerProps = getMapBaseLayer(baseLayer, mapKey);

    const points = geoJson?.features.filter(isPointFeature) || [];
    const lines = geoJson?.features.filter(isLineStringFeature) || [];

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