Task = require(`.`)

state = {}

state.finalizeState = new Task({

    f: () => console.log(`finalizing state`),

    })

state.parent1 = new Task({

    prereqs: [state.finalizeState],

    f: () => console.log(`doing parent1`),

    })

state.parent2 = new Task({

    prereqs: [state.finalizeState],

    f: () => console.log(`doing parent2`),

    })

state.child = new Task({

    prereqs: [state.parent1, state.parent2],

    f: () => console.log(`doing child`),

    })

state.finalizeState.do()

for (const [key, s] of Object.entries(state)) {

    console.log(key, `is done:`, s.isDone);
    
}