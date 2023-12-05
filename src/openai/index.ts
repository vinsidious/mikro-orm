import _ from 'lodash'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const ASSISTANT_NAME = 'CodeMonkey'
const WAIT_TIME_MS = 5000

export const getAssistantByName = async (name: string) => {
    const assistants = await openai.beta.assistants.list()
    const assistant = assistants.data.find((a) => a.name === name)

    if (!assistant) {
        console.error(`No assistant found with name ${name}`)
        return
    }

    return assistant
}

const getRun = async (threadId: string, runId: string) => {
    return await openai.beta.threads.runs.retrieve(threadId, runId).catch((e) => {
        console.error(e)
        return { status: 'failed', messages: [] as any[] }
    })
}

const waitForRunToComplete = async (threadId: string, runId: string) => {
    let run = await getRun(threadId, runId)
    let waitTime = 0

    // Repeatedly check the status of the run until it's complete.
    while (run?.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, WAIT_TIME_MS))
        run = await getRun(threadId, runId)
        waitTime += WAIT_TIME_MS / 1000
        process.stdout.write(
            `\rWaiting for run to complete... ${waitTime} seconds elapsed`
        )
    }

    console.log() // To ensure the next log starts on a new line
    return run
}

const extractCodeFromResponse = (response: string): string => {
    const match = response.match(/```\w+\n([\s\S]*?)```/)
    return match ? match[1] : ''
}

export const queryCodeMonkey = async (content: string) => {
    const assistant = await getAssistantByName(ASSISTANT_NAME)
    const thread = await openai.beta.threads.create({
        messages: [{ role: 'user', content }],
    })

    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
    })

    await waitForRunToComplete(thread.id, run.id)

    const response = await openai.beta.threads.messages.list(thread.id)
    const responseText = _.get(response, 'data.0.content.0.text.value')

    return extractCodeFromResponse(responseText)
}
