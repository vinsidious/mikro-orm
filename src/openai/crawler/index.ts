import { crawlerGithubForGPT } from 'repo-crawler-for-gpt'

crawlerGithubForGPT({
    githubRepoUrl: 'https://github.com/mikro-orm/mikro-orm/tree/e9820764d8815ebe421ff9eb24ee22c21287ac4c/packages/core',
    branch: 'master',
})
