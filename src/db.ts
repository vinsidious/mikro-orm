import { MikroORM } from '@mikro-orm/postgresql'

let orm: MikroORM
let em: MikroORM['em']

export async function initializeDb() {
    orm = await MikroORM.init()
    em = orm.em

    return { orm, em }
}

export const getEm = () => em.fork()

initializeDb()

export { em, orm }
