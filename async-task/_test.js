AsyncTask = require(`.`)
eventually = require(`../eventually`)
Task = require(`../task`)

state = {}

state.finalizeState = new Task({

    f: () => console.log(`finalizing state`),

    })

state.parent1 = new AsyncTask({

    prereqs: [state.finalizeState],

    f: () => eventually(() => console.log(`doing parent1`)),

    })

state.parent2 = new AsyncTask({

    prereqs: [state.finalizeState],

    f: () => eventually(() => console.log(`doing parent2`)),

    })

state.child = new AsyncTask({

    prereqs: [state.parent1, state.parent2],

    f: () => eventually(() => console.log(`doing child`)),

    })

state.finalizeState.do()

for (const [key, s] of Object.entries(state)) {

    console.log(key, `is done:`, s.isDone);
    
}