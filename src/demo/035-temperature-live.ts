import { delay } from "@devicescript/core"
import { mcuTemperature } from "@devicescript/runtime"

while (true) {
    const value = await mcuTemperature()
    console.log("MCU Temperature:", value)
    await delay(1000)
}
