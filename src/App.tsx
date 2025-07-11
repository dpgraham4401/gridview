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
import {Slide, toast, ToastContainer} from "react-toastify";


function App() {
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const [geoJson, setGeoJson] = useState<PowerGridFeatureCollection | undefined>(undefined);

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
                toast("JSON file uploaded and parsed successfully!")
            } catch (error) {
                console.error(error);
                toast("Could not parse the GEO JSON file. Please ensure it is valid.", {type: "error"});
            }
        };
        reader.readAsText(file);
    };


    return (
        <div className="min-h-screen w-screen bg-slate-50 dark:bg-gray-900 transition-colors p-3">
            <Header/>
            <GeoJsonUploader onChange={handleFileChange}/>
            <div className="flex flex-col items-center justify-center">
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 h-[500px] md:h-[600px] xl:h-[700px] flex flex-col items-center transition-colors">
                    <GridMap mapKey={mapTilerKey} geoJson={geoJson}/>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
        </div>
    );
}

export default App
