/**
 * Component for uploading and parsing GeoJSON files.
 */

import {type ChangeEvent, useRef, useState} from "react";

interface GeoJsonUploaderProps {
    onChange: (geoJson: any) => void;
    uploadMessage: string | null;
}

export function GeoJsonUploader({onChange, uploadMessage}: GeoJsonUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
        onChange(e);
    }

    return (
        <div className="mb-4 w-full max-w-xl">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file"/>


            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload a JSON file:
            </label>

            <div>
                <input
                    ref={inputRef}
                    id="geojson-upload"
                    type="file"
                    accept="application/json"
                    onChange={handleChange}
                    className="hidden"
                />
                <label
                    htmlFor="geojson-upload"
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                >
                    Choose File
                </label>
                <span className="ml-3 text-gray-600 dark:text-gray-300 text-sm">
                    {fileName ? fileName : 'No file chosen'}
                </span>
            </div>
            {uploadMessage && (
                <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">{uploadMessage}</div>
            )}
        </div>

    )
}