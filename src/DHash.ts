import * as Jimp from "jimp"
import * as JPEG from "jpeg-js"

export class DHash {
  static memoryExtensionInMb: 1024
  static memoryExtensionRequired = true

  private static extendMemory() {
    if (this.memoryExtensionRequired) {
      Jimp.decoders['image/jpeg'] = (data: Buffer) => JPEG.decode(data, { maxMemoryUsageInMB: DHash.memoryExtensionInMb })
      this.memoryExtensionRequired = false
    }
  }

  static async calculateHashAsync(picture: Buffer): Promise<string> {
    try {

      this.extendMemory()
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

    } catch (err) {
      throw err
    }
  }
}