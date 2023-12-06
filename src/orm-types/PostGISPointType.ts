import { Geometry, Point } from 'geojson'
import wkx from 'wkx'

import { Type } from '@mikro-orm/core'

/* Custom MikroORM type for PostGIS Points */
export class PostGISPointType extends Type<Point, Geometry> {
    // Convert database value to entity property value
    convertToJSValue(value: Geometry | Buffer | string): Point {
        let geojson: any
        value = Buffer.isBuffer(value) ? value : Buffer.from(value as string, 'hex')

        if (Buffer.isBuffer(value)) {
            geojson = wkx.Geometry.parse(value).toGeoJSON()
        } else {
            geojson = value
        }

        if (geojson.type !== 'Point' || !Array.isArray(geojson.coordinates)) {
            throw new Error('Invalid GeoJSON Point')
        }

        return {
            type: 'Point',
            coordinates: geojson.coordinates,
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
