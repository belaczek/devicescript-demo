import { currentControl, mcuTemperature } from "@devicescript/runtime"

// setInterval(async () => {
//     const temp = await mcuTemperature()
//     console.log({ temp })
// }, 1000)

const temperature = currentControl().mcuTemperature.subscribe(temp => {
    console.log({ temp })
})
