import { readFileSync } from 'fs'

export const combinePromptAndCode = (
    promptPath: string,
    code: string,
    language = 'ts'
) => {
    const promptContent = readFileSync(promptPath, 'utf-8')
    return `
    ${promptContent}

    \`\`\`${language}
    ${code}
    \`\`\`
    `.trim()
}
