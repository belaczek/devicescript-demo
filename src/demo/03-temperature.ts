// import { Temperature } from "@devicescript/core"
// import { threshold } from "@devicescript/observables"

// const thermometer = new Temperature()

// thermometer.reading.pipe(threshold(10)).subscribe(async value => {
//     console.log("Temperature:", value)
// })

/* ==== or ==== */

/** Thermostat */

import { Temperature, Relay } from "@devicescript/core"
import { ewma, tap, auditTime, levelDetector } from "@devicescript/observables"

const thermometer = new Temperature()
const t_ref = 20 // Celsius
const relay = new Relay()

thermometer.reading
    .pipe(
        tap(t_raw => console.data({ t_raw })),
        ewma(0.9),
        tap(t_ewma => console.data({ t_ewma })),
        auditTime(5000),
        tap(t_audit => console.data({ t_audit })),
        levelDetector(t_ref - 1, t_ref + 1),
        tap(level => console.data({ level }))
    )
    .subscribe(async level => {
        if (level < 0) await relay.enabled.write(true)
        else if (level > 0) await relay.enabled.write(false)
        console.data({ relay: await relay.enabled.read() })
    })
