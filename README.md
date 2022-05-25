Calculates a d-hash for pictures.

Usage:

```js
import dhash from "dhashjs";
import * as fs from "fs";

const content = fs.readFileSync("picture.jpg");
dhash.calculateHashAsync(content).then(hash => console.log(hash));
```