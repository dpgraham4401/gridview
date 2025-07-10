/**
 * Test for parsing the GeoJSON grid data.
 */

import {parseGeoJsonGrid} from "@/lib/parser";
import type {GeoJSON} from "geojson";
import {describe, expect, it} from "vitest";

const myGeojsonData: GeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"name": "Example Point"},
            "geometry": {
                "type": "Point",
                "coordinates": [-74.0060, 40.7128] // [longitude, latitude]
            }
        }
    ]
};

describe("parseGeoJsonGrid", () => {
    it('should run tests', () => {
        expect(true).toBe(true);
    });
    it('should parse valid GeoJSON FeatureCollection', () => {
        const result = parseGeoJsonGrid(myGeojsonData);

    })
})

