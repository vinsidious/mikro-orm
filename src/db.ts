import { MikroORM } from '@mikro-orm/core'

let orm: MikroORM
let em: MikroORM['em']

async function initializeDb() {
    orm = await MikroORM.init()
    em = orm.em
}

export const getEm = () => em.fork()

initializeDb()

export { em, orm }
