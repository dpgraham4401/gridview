# Grid View

A simple single-page web application for displaying the Power Grid in a user friendly view,
allowing users to visualize and interact with the power grid data.
Find the demo online
at [https://deploy-preview-2--legendary-caramel-239b61.netlify.app/](https://deploy-preview-2--legendary-caramel-239b61.netlify.app/)

## Problem Statement

The power grid is a complex network of components that requires effective visualization for analysis and management.
Speaking about it, and new interconnected generators, in a more concrete way requires a tool that can display
that information in a easily digestible format.

## Getting Started

### Prerequisites

- Node.js (tested on version 22)
- npm (or your favorite node package manager)

### Installation

1. Clone the repository and cd into the directory

2. Install the dependencies
   ```shell
   npm install
   ```

3. Add the MapTiler API key to a .env file (optional)
   ```shell
   VITE_MAPTILER_API_KEY=your-maptiler-api-key
   ```
   Note: If you don't provide a MapTiler API key, the application will use OpenStreetMap tiles by default.

4. Run the development server
   ```shell
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### GeoJSON Format

GridView accepts common [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946),
primarily [FeatureCollections](https://datatracker.ietf.org/doc/html/rfc7946#section-3.3)
This GeoJSON exemplifies some of the expected properties for power grid components:

Supported component types:

- `substation` (Point geometry)
- `generator` (Point geometry)
- `transmission` (LineString geometry)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "type": "substation",
        "name": "Example Substation",
        "status": "operational"
      },
      "geometry": {
        ...
      }
    },
    {
      "type": "Feature",
      "properties": {
        "type": "generator",
        "name": "Martin Marietta",
        "status": "decommissioned"
      },
      "geometry": {
        ...
      }
    },
    {
      "type": "Feature",
      "properties": {
        "type": "transmission",
        "name": "p1-p2",
        "status": "operational"
      },
      "geometry": {
        ...
      }
    }
  ]
}
```

## Technologies Used

- React (v19)
- Vite
- TypeScript: Type-safe JavaScript, may have been overkill for this size project.
- Leaflet: Lightweight mapping library for building interactive maps.
- Tailwind CSS Utility-first CSS framework for styling, made development faster with less context switching.
- React Toastify Toast for a fancy user notification experience.

