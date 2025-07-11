/**
 * Custom marker for displaying station information.
 */

import L from "leaflet";
import {Marker, Popup} from "react-leaflet";

/**
 * Accepts a point from a GeoJSON feature and renders a marker on the map.
 * @param point
 * @constructor
 */
export function StationMarker({point}) {
    return (
        <Marker
            position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
            icon={L.divIcon({
                className: 'grid-marker',
                html: `<div class="h-5 w-5 rounded-full ${point.properties.type === 'generator' ? 'bg-green-800' : 'bg-blue-800'}"></div>`
            })}
        >
            <Popup>
                {point.properties.name || 'Unnamed Substation'}<br/>
                <em className="font-bold">Type</em>: {point.properties.type}<br/>
                <em className="font-bold">Status</em>: {point.properties.status}<br/>
            </Popup>
        </Marker>
    )
}