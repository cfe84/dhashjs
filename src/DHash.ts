import * as Jimp from "jimp"

export class DHash {
  static async calculateHashAsync(picture: Buffer): Promise<string> {
    const res: Uint8Array = new Uint8Array(8)
    const image = await Jimp.read(picture)
    const resized = await image.resize(9, 8)
    const gray = await resized.grayscale()
    for (let y = 0; y < 8; y++) {
      let rowRes = 0
      let pix1 = await gray.getPixelColor(0, y)
      for (let x = 1; x < 9; x++) {
        rowRes = rowRes << 1
        let pix2 = await gray.getPixelColor(x, y)
        const diff = pix1 - pix2
        if (diff >= 0) {
          rowRes += 1
        }
        pix1 = pix2
      }
      res[y] = rowRes
    }
    const buffer = Buffer.from(res)
    return buffer.toString("base64")
  }
}