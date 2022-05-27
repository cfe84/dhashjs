Calculates a d-hash for pictures.

Usage:

```js
import { dHash } from "dhashjs";
import * as fs from "fs";

const content = fs.readFileSync("picture.jpg");
dHash.calculateHashAsync(content).then(hash => console.log(hash));
```