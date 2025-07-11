/**
 * Logic for parsing and manipulating grid data.
 */
import type {FeatureCollection, LineString, Point} from "geojson";

export type ComponentStatus = 'operational' | 'proposed' | 'decommissioned';

interface PowerGridBaseProperties {
    name?: string;
    status: ComponentStatus;
    style?: object;
}

interface SubStationProperties extends PowerGridBaseProperties {
    type: 'substation';
    voltage?: number;
}

interface TransmissionLineProperties extends PowerGridBaseProperties {
    type: 'transmission';
    voltage?: number;
}

interface GeneratorProperties extends PowerGridBaseProperties {
    type: 'generator';
    fuelType?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'natural gas' | 'hydrocarbon';
}

export type PowerGridProperties = SubStationProperties | TransmissionLineProperties | GeneratorProperties;

export type PowerGridFeatureCollection = FeatureCollection<Point | LineString, PowerGridProperties>;

export function parseGeoJSON(data: PowerGridFeatureCollection): PowerGridFeatureCollection {
    if (!data || !data.features || !Array.isArray(data.features)) {
        throw new Error("Only GeoJSON Feature Collections are supported.");
    }
    return {
        ...data,
        features: data.features.map(feature => ({
            ...feature,
        }))
    };

}