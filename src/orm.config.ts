import { JsonType, Platform, TextType, Type } from '@mikro-orm/core'
import { EntityGenerator } from '@mikro-orm/entity-generator'
import { defineConfig } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

import { NumericType, PostGISPointType } from './orm-types'

export default defineConfig({
    migrations: {
        path: './src/migrations',
        tableName: 'migrations',
        transactional: true,
    },
    tsNode: process.env.NODE_ENV !== 'production',
    user: process.env.USER,
    password: process.env.USER,
    dbName: 'favs',
    host: 'localhost',
    port: 5432,
    entities: ['dist/entities/*.js'],
    entitiesTs: ['src/entities/*.ts'],
    metadataProvider: TsMorphMetadataProvider,
    extensions: [EntityGenerator],
    discovery: {
        getMappedType(type: string, platform: Platform) {
            if (type === 'string') {
                return Type.getType(TextType)
            }

            if (type === 'number') {
                return Type.getType(NumericType)
            }

            if (type === 'any') {
                return Type.getType(JsonType)
            }

            if (type === 'Point') {
                return Type.getType(PostGISPointType)
            }

            return platform.getDefaultMappedType(type)
        },
    },
})
