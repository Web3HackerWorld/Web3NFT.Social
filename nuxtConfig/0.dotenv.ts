import * as dotenv from 'dotenv'
import fs from 'fs-extra'

const { APP } = process.env
export const appFolder = name => `./apps/${APP}/${name}`
export const isExist = name => fs.pathExistsSync(`${appFolder(name)}`)

if (isExist('.env'))
  dotenv.config({ path: appFolder('.env') })
