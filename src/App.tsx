/**
 * An app for displaying US Power Grid components and conducting power flow analysis.
 */
import {GeoJsonUploader} from "@/components/GeoJsonUploader.tsx";
import {Header} from "@/components/Header.tsx";
import {GridMap} from "@/components/map/GridMap.tsx";
import {parseGeoJSON, type PowerGridFeatureCollection} from "@/lib/parsers.ts";
import {type ChangeEvent, useEffect, useState} from "react";
import './App.css'
import 'leaflet/dist/leaflet.css';


function App() {
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [geoJson, setGeoJson] = useState<PowerGridFeatureCollection | undefined>(undefined);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!geoJson) {
            fetch("/example-grid.json")
                .then(res => res.json())
                .then(data => setGeoJson(parseGeoJSON(data)))
                .catch(() => {
                    console.error("Error fetching example geojson data.");
                });
        }
    }, [geoJson, setGeoJson]);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setGeoJson(parseGeoJSON(json));
                setUploadMessage('JSON file uploaded and parsed successfully!');
            } catch (error) {
                console.error(error);
                setUploadMessage('Error: Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    };


    return (
        <div className="min-h-screen w-screen bg-slate-50 dark:bg-gray-900 transition-colors p-2">
            <Header/>
            <GeoJsonUploader onChange={handleFileChange} uploadMessage={uploadMessage}/>
            <div className="flex flex-col items-center justify-center">
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 h-[500px] md:h-[600px] xl:h-[700px] flex flex-col items-center transition-colors">
                    <GridMap mapKey={mapTilerKey} geoJson={geoJson}/>
                </div>
            </div>
        </div>
    );
}

export default App
