/**
 * An app for displaying US Power Grid components and conducting power flow analysis.
 */
import './App.css'
import {GeoJsonUploader} from "@/components/GeoJsonUploader.tsx";
import {GridMap} from "@/components/GridMap.tsx";
import {Header} from "@/components/Header.tsx";
import type {GeoJSON} from "geojson";
import {useState} from "react";


function App() {
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [geoJson, setGeoJson] = useState<GeoJSON | undefined>(undefined);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setGeoJson(json);
                setUploadMessage('JSON file uploaded and parsed successfully!');
            } catch {
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
