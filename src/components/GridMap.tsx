/**
 * Renders a map with markers for relevant power grid components.
 * Uses {@link https://github.com/Leaflet/Leaflet Leaflet } under the hood,
 * which is well-maintained, relatively lightweight, good for 2D maps, should be mobile-friendly.
 */
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import {getMapBaseLayer, type MapBaseLayerName} from "@/lib/map.ts";
import {useEffect, useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
const latitude = 42.3555;
const longitude = -75.0602;

interface GridMapProps {
    mapKey?: string;
}

export function GridMap({mapKey}: GridMapProps) {
    const [baseLayer] = useState<MapBaseLayerName>(mapKey ? 'mapTiler' : 'openStreetMap');
    const mapRef = useRef(null);
    const mapTileLayerProps = getMapBaseLayer(baseLayer, mapKey);
    const [geoJson, setGeoJson] = useState<any>(null);

    useEffect(() => {
        fetch('/sample-grid.geojson')
            .then(res => res.json())
            .then(setGeoJson);
    }, []);

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

    return (
        <MapContainer center={[latitude, longitude]} zoom={7} ref={mapRef} className="w-full h-full">
            <TileLayer {...mapTileLayerProps} />
            {geoJson && (
                <GeoJSON data={geoJson} onEachFeature={onEachFeature} />
            )}
        </MapContainer>
    )
}