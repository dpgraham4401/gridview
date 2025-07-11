/**
 * Logic for parsing and manipulating grid data.
 */
import type {FeatureCollection, GeoJSON, Geometry} from "geojson";

export type ComponentStatus = 'operational' | 'propsed' | 'decommissioned';

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

type PowerGridProperties = SubStationProperties | TransmissionLineProperties | GeneratorProperties;

export type PowerGridFeature = FeatureCollection<Geometry, SubStationProperties | TransmissionLineProperties | GeneratorProperties>;

function addStyleToComponent(props: PowerGridProperties): PowerGridBaseProperties {
    const style: Record<string, string> = {};
    switch (props.type) {
        case 'substation':
            style.color = props.status === 'operational' ? 'green' : 'red';
            break;
        case 'transmission':
            style.color = props.status === 'operational' ? 'blue' : 'orange';
            break;
        case 'generator':
            style.color = props.status === 'operational' ? 'yellow' : 'gray';
            break;
    }
    return {...props, style};

}

export function parseGeoJSON(data: PowerGridFeature): GeoJSON {
    return {
        ...data,
        features: data.features.map(feature => ({
            ...feature,
            properties: addStyleToComponent(feature.properties)
        }))
    };

}