import { readFileSync, writeFileSync } from 'node:fs'

import _ from 'lodash'

import { fetchAllItems } from '@migrator/dynamo'
import { queryCodeMonkey } from '@openai'

const exportRandomData = async (tableName: string, sampleSize = 50) => {
    const allData = await fetchAllItems(tableName as any)
    console.log(`Fetched ${allData.length} items from the ${tableName} table.`)
    let sampledData = _.sampleSize(allData, +sampleSize)
    let payloadSize = JSON.stringify(sampledData).length

    // Reduce the sample size if the payload size exceeds 32000 characters
    while (payloadSize > 30000) {
        sampleSize = Math.floor(sampleSize * 0.9) // Reduce sample size by 10%
        sampledData = _.sampleSize(allData, +sampleSize)
        payloadSize = JSON.stringify(sampledData).length
    }

    console.log(JSON.stringify(sampledData))
    return

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
