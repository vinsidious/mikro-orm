import { Geometry, Point } from 'geojson' // Make sure to install the @types/geojson package for type definitions

import { Type } from '@mikro-orm/core'

/* Custom MikroORM type for PostGIS Points */
export class PostGISPointType extends Type<Point, Geometry> {
    // Convert database value to entity property value
    convertToJSValue(value: Geometry): Point {
        // Ensure the value is a valid GeoJSON Point object
        if (value.type !== 'Point' || !Array.isArray(value.coordinates)) {
            throw new Error('Invalid GeoJSON Point')
        }
        return {
            type: 'Point',
            coordinates: value.coordinates,
        }
    }

    // Convert entity property value to database value
    convertToDatabaseValue(value: Point): Geometry {
        // Ensure the value is a valid GeoJSON Point object
        if (value.type !== 'Point' || !Array.isArray(value.coordinates)) {
            throw new Error('Invalid GeoJSON Point')
        }
        return {
            type: 'Point',
            coordinates: value.coordinates,
        }
    }

    // Compare two PostGIS point values - used for change detection
    compareAsType(): string {
        return 'geometry' // Let MikroORM know to compare the values as geometric data
    }
}
