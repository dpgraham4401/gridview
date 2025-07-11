/**
 * Header component for Grid viewer
 * Contains the functionality for uploading GeoJSON files.
 */

export function Header() {
    return (
        <header className=" mb-4 p-5">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Power Grid Explorer</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-prose">
                Explore the components of the US power grid and conduct power flow analysis using the interactive
                map below.
            </p>
            <br/>
            <p className="text-gray-600 dark:text-gray-300 max-w-prose">
                This default power grid is supplied for easy viewing, but you can also upload your own GeoJSON files.
                For more information on the data format, download the
                <a href="/public/example-grid.json" className="dark:text-cyan-400 text-cyan-800">
                    {' '}Example Grid GeoJSON
                </a>
            </p>
        </header>
    )
}