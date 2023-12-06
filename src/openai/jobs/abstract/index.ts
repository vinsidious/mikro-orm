import { readFileSync } from 'fs'

import { queryCodeMonkey } from '@openai'

const main = async () => {
    const prompt = readFileSync(`./src/openai/jobs/abstract/prompt.md`, 'utf-8')

    // const code = readFileSync(`./src/migrator/index.ts`, 'utf-8')
    // const promptAndCode = combinePromptAndCode('./src/openai/jobs/abstract/prompt.md', code)

    const codeMonkeyResponse = await queryCodeMonkey(prompt)

    console.log(codeMonkeyResponse)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .then(() => {
        process.exit(0)
    })
