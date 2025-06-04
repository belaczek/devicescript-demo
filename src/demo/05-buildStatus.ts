import { readSetting } from "@devicescript/settings"
import { fetch } from "@devicescript/net"
import { schedule, setStatusLight } from "@devicescript/runtime"

const token = await readSetting("GITLAB_TOKEN", "")

// track state of last fetch
let state: "failure" | "pending" | "success" | "error" | "" = ""
let blinki = 0

// update status light periodically
setInterval(async () => {
    blinki++
    let c = 0x000000
    if (state === "failure")
        c = blinki % 2 === 0 ? 0x100000 : 0x000000 // fast blinking red
    else if (state === "pending")
        c = (blinki >> 1) % 2 === 0 ? 0x100500 : 0x000000
    // slow blinking orange
    else if (state === "success") c = 0x000a00 // solid green
    else c = 0x000000 // off on error
    await setStatusLight(c)
}, 500)

schedule(
    async () => {
        // Fetch pipelines for the given branch
        const res = await fetch(
            `https://gitlab.ataccama.dev/api/v4/projects/1625/pipelines?ref=main`,
            {
                headers: {
                    Accept: "application/json",
                    // Authorization: token ? `Bearer ${token}` : undefined,
                    PRIVATE_TOKEN: token,
                },
            }
        )
        if (res.status === 200) {
            const pipelines = await res.json()
            if (pipelines.length > 0) {
                const latest = pipelines[0]
                const pipelineStatus = latest.status
                // Map GitLab status to our state
                if (pipelineStatus === "success") state = "success"
                else if (
                    pipelineStatus === "failed" ||
                    pipelineStatus === "canceled" ||
                    pipelineStatus === "skipped"
                )
                    state = "failure"
                else if (
                    [
                        "pending",
                        "running",
                        "created",
                        "preparing",
                        "waiting_for_resource",
                    ].includes(pipelineStatus)
                )
                    state = "pending"
                else state = "error"
                console.log({ latest, state })
            } else {
                state = "error"
                console.log("No pipelines found for ref main")
            }
        } else {
            state = "error"
            console.log("Error fetching pipeline status:", res.status)
        }
    },
    { timeout: 1000, interval: 60000 }
)
