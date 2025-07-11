/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import type {Feature, GeoJSON as GeoJSONType, GeoJsonProperties, Geometry} from 'geojson';
import {useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";

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


    function onEachFeature(feature: any, layer: any) {
        if (feature.properties) {
            let popupContent = '';
            if (feature.properties.type === 'substation') {
                popupContent = `<b>Substation:</b> ${feature.properties.name}`;
            } else if (feature.properties.type === 'transmission') {
                popupContent = `<b>Transmission Line:</b> ${feature.properties.name}`;
            }
            layer.bindPopup(popupContent);
        }
    }

    const getStyles = (feature: Feature<Geometry, GeoJsonProperties>) => {
        if (!feature.properties) return {};
        const {style} = feature.properties;
        const color = style?.color || 'blue';
        return {
            color,
            weight: 5,
            fillOpacity: 0.5
        };
    }

    return (
        <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef} className="w-full h-full">
            <TileLayer {...mapTileLayerProps} />
            {geoJson && (
                <GeoJSON data={geoJson} onEachFeature={onEachFeature} style={getStyles}/>
            )}
        </MapContainer>
    )
}