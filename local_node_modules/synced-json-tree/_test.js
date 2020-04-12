T = require(`./SyncedStringTree.js`);
V = require(`./SyncableVersion.js`);

t = new T();

newerV = V.Newer(V.oldest);

t.receive({path: [`t`], fullPathVersions: [newerV, newerV]})
    .then(() => console.log("[`t`]"));

t.receive({path: [], fullPathVersions: [newerV]})
    .then(() => console.log("[]"));