/**
 * Library for handling map-related operations.
 */

interface BaseLayer {
    url: string;
    attribution: string;
}

export type MapBaseLayerName = 'mapTiler' | 'openStreetMap';

export function getMapBaseLayer(name: MapBaseLayerName, key?: string) {

    const MapBaseLayers: {[key: string]: BaseLayer} = {
        mapTiler: {
            url: `https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${key}`,
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        },
        openStreetMap: {
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        }
    }
    return MapBaseLayers[name] || MapBaseLayers.openStreetMap;
}

