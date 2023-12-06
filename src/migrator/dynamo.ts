import { DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { DynamoDBTypeMap } from './types'

// Initialize the DynamoDB client (v3).
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

/**
 * Recursive function to handle paginated scan with retry on ProvisionedThroughputExceededException.
 *
 * @param {string} tableName - The name of the DynamoDB table.
 * @param {Record<string, any> | undefined} lastEvaluatedKey - The key to start scanning from.
 * @param {object[]} accumulatedItems - The array of items accumulated from previous scans.
 * @returns {Promise<object[]>} - A promise that resolves to an array of unmarshalled items.
 */
async function paginatedScan(
    tableName: string,
    lastEvaluatedKey: Record<string, any> | undefined,
    accumulatedItems: object[]
): Promise<object[]> {
    const params: ScanCommandInput = {
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey,
    }

    try {
        const command = new ScanCommand(params)
        const { Items, LastEvaluatedKey } = await ddbDocClient.send(command)

        const unmarshalledItems = Items?.map((item) => unmarshall(item)) || []
        const allItems = [...accumulatedItems, ...unmarshalledItems]

        if (LastEvaluatedKey) {
            return paginatedScan(tableName, LastEvaluatedKey, allItems)
        } else {
            return allItems
        }
    } catch (error) {
        if (
            error.name === 'ProvisionedThroughputExceededException' &&
            error.$metadata.attempts < 5
        ) {
            // Wait for a short time before retrying
            await new Promise((resolve) =>
                setTimeout(resolve, 500 + error.$metadata.totalRetryDelay)
            )
            // Retry the scan with the same lastEvaluatedKey
            return paginatedScan(tableName, lastEvaluatedKey, accumulatedItems)
        } else {
            throw error
        }
    }
}

// In-memory cache for storing fetched items
const cache: Record<string, any> = {}

/**
 * Fetch all items from a DynamoDB table.
 *
 * @param {string} tableName - The name of the DynamoDB table.
 * @returns {Promise<object[]>} - A promise that resolves to an array of unmarshalled items.
 */
export async function fetchAllItems<
    TTableName extends keyof DynamoDBTypeMap,
    TType = DynamoDBTypeMap[TTableName]
>(tableName: TTableName): Promise<Array<TType>> {
    // If items for the table are already in cache, return them
    if (cache[tableName]) {
        return cache[tableName]
    }

    // Otherwise, fetch items from the table and store them in cache
    const items = (await paginatedScan(tableName, undefined, [])) as Array<TType>
    cache[tableName] = items

    return items
}
