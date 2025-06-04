// import { delay, gpio, GPIOMode } from "@devicescript/core"
// import "@devicescript/gpio"

// const btn = gpio(28)
// const led = gpio(0)

// btn.setMode(GPIOMode.InputPullDown)
// led.setMode(GPIOMode.Output)

// while (true) {
//     const state = btn.value
//     console.log("Button pressed:", state)

//     if (state) {
//         led.write(1)
//     } else {
//         led.write(0)
//     }
//     await delay(100)
// }

/* ======== Or ========= */

import { Button, LightBulb, Temperature } from "@devicescript/core"
import { startButton, startLightBulb } from "@devicescript/servers"
import { pins } from "@dsboard/pico_w"

// const button = new Button()
const button = startButton({
    pin: pins.GP28,
    activeHigh: true,
})
// const light = new LightBulb()
const light = startLightBulb({
    pin: pins.GP0,
})

button.pressed().subscribe(async sate => {
    console.log("Button pressed:", sate)

    if (sate) {
        await light.on()
    } else {
        await light.off()
    }
})
