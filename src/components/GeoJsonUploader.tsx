/**
 * Component for uploading and parsing GeoJSON files.
 */

import {useRef} from "react";

interface GeoJsonUploaderProps {
    onChange: (geoJson: any) => void;
}

export function GeoJsonUploader({onChange}: GeoJsonUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);


    return (
        <div className="mb-3 md:max-w-1/3 px-3">
            <label
                htmlFor="formFileLg"
                className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
            >Upload file</label
            >
            <input
                ref={inputRef}
                onChange={onChange}
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                id="formFileLg"
                type="file"/>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-300" id="file_input_help">
                GeoJson (.geojson, json).
            </p>
        </div>


    )
}