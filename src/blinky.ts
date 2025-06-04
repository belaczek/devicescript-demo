import {
    delay,
    gpio,
    GPIOMode,
    Led,
    OutputPin,
    PinBase,
} from "@devicescript/core"
import { pinMode } from "@devicescript/gpio"
import { currentControl, setStatusLight } from "@devicescript/runtime"
import { startLightBulb } from "@devicescript/servers"
import { pins, board } from "@dsboard/pico_w"

// const statusLed = startLightBulb({
//     pin: gpio(25),
// })

const p0 = gpio(25)
pinMode(p0, GPIOMode.Output)
// await p0.setMode(GPIOMode.Output)
await p0.write(1)

// await statusLed.on()

// await setStatusLight(0xffffff)

// statusLed.report().subscribe(function (state) {
//     console.log("LED state changed", state)
// })

// while (true) {
//     await setStatusLight(0xffffff)
//     // console.log("LED is blinking")
//     await delay(100)
//     await setStatusLight(0x000000)
//     // console.log("LED is off")
//     // // wait 0.5s
//     await delay(100)
// }

// setInterval(async () => {
//     await statusLed.toggle(1)
//     console.log("toggle")
// }, 100)

// setInterval(async () => {
//     // red
//     await setStatusLight(0xffffff)
//     console.log("LED is blinking")
//     await delay(100)
//     await setStatusLight(0x000000)
//     console.log("LED is off")
//     // // wait 0.5s
//     await delay(100)
// }, 100)
