import { delay } from "@devicescript/core"
import { setStatusLight } from "@devicescript/runtime"

while (true) {
    await setStatusLight(0xffffff)
    console.log("Blink")
    await delay(250)
    await setStatusLight(0x000000)
    await delay(250)
}
