import * as fs from "fs"
import { DHash } from "./DHash"

export {
  DHash as dHash
}

const filePath = process.argv[2]
const content = fs.readFileSync(filePath)
const hash = DHash.calculateHashAsync(content)
console.log(hash)