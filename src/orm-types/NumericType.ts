import { Type } from '@mikro-orm/core'

/* Custom MikroORM type for PostgreSQL NUMERIC type */
export class NumericType extends Type<number, string> {
    // Convert database value to JavaScript number
    convertToJSValue(value: string): number {
        return value != null ? parseFloat(value) : null
    }

    // Convert JavaScript number to a database value
    convertToDatabaseValue(value: number): string {
        return value != null ? value.toString() : null
    }

    // Provide the SQL column type
    getColumnType(): string {
        return 'numeric'
    }
}
