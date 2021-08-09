import * as fs from "fs"
import * as path from "path"
import * as should from "should"
import { DHash } from "../src/DHash"

describe("Dhash", function () {

  const tests = ["polar-bear", "frog"]
  tests.forEach(test => {
    it("calculates same hash for similar picture of " + test, async function () {
      //given
      const polarBear1 = fs.readFileSync(path.join(__dirname, "assets", test + "-1.jpg"))
      const polarBear2 = fs.readFileSync(path.join(__dirname, "assets", test + "-2.jpg"))

      //when
      const hash1 = await DHash.calculateHashAsync(polarBear1)
      const hash2 = await DHash.calculateHashAsync(polarBear2)

      //then
      should(hash1.length).be.greaterThan(0)
      should(hash1).not.eql("AAAAAAAAAAA=")
      should(hash1).eql(hash2)
    })
  })

})