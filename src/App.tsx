/**
 * An app for displaying US Power Grid components and conducting power flow analysis.
 */
import './App.css'
import {GridMap} from "@/components/GridMap.tsx";



function App() {
    const mapTilerKey = import.meta.env.VITE_MAPTILER_API_KEY;

    return <GridMap mapKey={mapTilerKey}/>
}

export default App
