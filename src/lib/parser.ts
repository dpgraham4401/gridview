/**
 * Logic for parsing and manipulating grid data.
 */
import type {GeoJSON} from "geojson";

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
export function parseGeoJsonGrid(geojson: GeoJSON) {
    console.log("geojson", geojson);
    return geojson;

}
