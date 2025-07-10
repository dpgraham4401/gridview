/**
 * Logic for parsing and manipulating grid data.
 */

export interface Station {
    name: string;
    type: string;
    coordinates: [number, number];
}

export interface TransmissionLine {
    name: string;
    type: string;
    coordinates: [number, number][];
}

export interface ParsedGridData {
    stations: Station[];
    transmissionLines: TransmissionLine[];
}

/**
 * Parses a GeoJSON FeatureCollection and returns arrays of stations and transmission lines.
 */
export function parseGeoJsonGrid(geojson: any): ParsedGridData {
    const stations: Station[] = [];
    const transmissionLines: TransmissionLine[] = [];
    if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
        return {stations, transmissionLines};
    }
    for (const feature of geojson.features) {
        if (!feature || feature.type !== 'Feature' || !feature.geometry || !feature.properties) continue;
        const {type, name} = feature.properties;
        if (feature.geometry.type === 'Point' && (type === 'substation' || type === 'generator')) {
            stations.push({
                name: name || '',
                type: type || '',
                coordinates: feature.geometry.coordinates,
            });
        } else if (feature.geometry.type === 'LineString' && type === 'transmission') {
            transmissionLines.push({
                name: name || '',
                type: type || '',
                coordinates: feature.geometry.coordinates,
            });
        }
    }
    return {stations, transmissionLines};
}
