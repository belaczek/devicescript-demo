import { startButton, startLightBulb } from "@devicescript/servers"
import { pins } from "@dsboard/pico_w"
import { players } from "./players"

const button = startButton({
    pin: pins.GP28,
    activeHigh: true,
})

const light = startLightBulb({
    pin: pins.GP0,
})

let winner: string | null = null
let status: "init" | "started" | "finished" = "init"
let intervalId: number | null = null

console.log("Game initialized, players ready: ", players.join(", "))

button.pressed().subscribe(async state => {
    if (state) {
        if (status === "init") {
            status = "started"
            console.log("Game started")
            await light.on()
            await play(players)
        } else if (status === "started") {
            status = "finished"
            intervalId && clearInterval(intervalId)
            console.log("Game finished")
            console.warn("Winner: ", winner)
            await light.off()
        } else if (status === "finished") {
            status = "init"
            console.log("Game reset")
            winner = null
            await light.off()
        }
    }
})

async function play(players: string[]) {
    intervalId = setInterval(() => {
        winner = players[Math.floor(Math.random() * players.length)]
        console.log(winner)
    }, 10)
}
