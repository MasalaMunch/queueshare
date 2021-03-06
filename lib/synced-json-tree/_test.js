S = require(`.`)
V = require(`./Version.js`)

newerV = V.Newer(V.oldest)

s = new S()

s.events.on(`change`, (c) => console.log(c.path, `was set to`, c.value))

s.receive({path: [`a`], versions: [newerV, newerV], value: 1})

s.receive({path: [], versions: [newerV], value: 1})