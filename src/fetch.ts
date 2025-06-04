import { sleep } from "@devicescript/core"
import { fetch } from "@devicescript/net"
import { setStatusLight } from "@devicescript/runtime"

const url = "http://api.github.com/users/belaczek/repos?per_page=1&page=1"

try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
} catch (error) {
    console.error("Error fetching weather data:", error)
}
