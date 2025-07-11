/**
 * Header component for Grid viewer
 * Contains the functionality for uploading GeoJSON files.
 */

export function Header() {
    return (
        <header className="w-full max-w-xl mb-4 p-5">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Power Grid Explorer</h1>
            <p className="text-gray-600 dark:text-gray-300">
                Explore the components of the US power grid and conduct power flow analysis using the interactive
                map below.
            </p>
        </header>
    )
}