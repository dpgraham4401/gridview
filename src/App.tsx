/**
 * An app for displaying US Power Grid components and conducting power flow analysis.
 */
import './App.css'
import {GridMap} from "@/components/GridMap.tsx";



function App() {
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;


    return (
        <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 transition-colors p-2">
            <header className="w-full max-w-xl mx-auto mb-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Power Grid Explorer</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Explore the components of the US power grid and conduct power flow analysis using the interactive map below.
                </p>
            </header>
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 h-[500px] md:h-[600px] xl:h-[700px] flex flex-col items-center transition-colors">
                    <GridMap mapKey={mapTilerKey}/>
                </div>
            </div>
        </div>
    );
}

export default App
