T = require(`./SyncedJsonTree.js`);
V = require(`./SyncableVersion.js`);

t = new T();

bigV = V.Newer(V.oldest);

(async () => {

    console.log("starting");

    await t.receive({path: [`t`], value: `t`, fullPathVersions: [bigV, bigV]});

    console.log("done");
    console.log(t);

})();

t.receive({path: [], value: ``, fullPathVersions: [bigV]});