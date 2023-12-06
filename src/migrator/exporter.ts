import { readFileSync, writeFileSync } from 'node:fs'

import _ from 'lodash'

import { fetchAllItems } from '@migrator/dynamo'
import { queryCodeMonkey } from '@openai'

const exportRandomData = async (tableName: string, sampleSize = 500) => {
    const allData = await fetchAllItems(tableName as any)

    const ordered = _.orderBy(allData, (item) => Object.keys(item).length, 'desc')
    // Create a set to store unique keys
    const uniqueKeys = new Set<string>()

    // Iterate over the ordered data to find all unique keys
    ordered.forEach((item) => {
        Object.keys(item).forEach((key) => uniqueKeys.add(key))
    })

    // Create a representative sample that includes all unique keys
    const representativeSample = []

    // Iterate over the unique keys
    uniqueKeys.forEach((key) => {
        // Find an item that contains the current key and add it to the representative sample
        const item = ordered.find((item) => item.hasOwnProperty(key))
        if (item) {
            representativeSample.push(item)
        }
    })

    let sampledData = _.sampleSize(representativeSample, +sampleSize)
    let payloadSize = JSON.stringify(sampledData).length

    // Reduce the sample size if the payload size exceeds 32000 characters
    while (payloadSize > 30000) {
        sampleSize = Math.floor(sampleSize * 0.9) // Reduce sample size by 10%
        sampledData = _.sampleSize(representativeSample, +sampleSize)
        payloadSize = JSON.stringify(sampledData).length
    }

    const message = `
    I'm going to provide you with JSON data which represents a sample/subset of dynamodb data for a particular table. I want you to analyze the data and then respond with a well-formatted TypeScript type that represents the data. Ensure that all properties within the type are ordered well and logically (i.e. if there's an id field, make that first, keep certain timestamp fields toward the end of the list, etc.). Don't include any comments in the code unless ABSOLUTELY necessary for the sake of clarifying something vital. 

    Here's the data for the ${tableName} table:

    \`\`\`json
    ${JSON.stringify(sampledData)}
    \`\`\`
    `.trim()

    const type = await queryCodeMonkey(message)

    console.log(`\nHere's the type I got back from CodeMonkey:\n\n${type}`)

    // Write the type to the end of the `./src/migrator/types.ts` file.
    const existingTypes = readFileSync('./src/migrator/types.ts', 'utf-8')
    const newTypes = existingTypes + '\n\n' + type
    writeFileSync('./src/migrator/types.ts', newTypes)
}

const args = process.argv.slice(2)

// @ts-ignore
exportRandomData(...args).then(() => {
    process.exit(0)
})
