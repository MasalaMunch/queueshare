T = require(`./SyncedStringTree.js`);
V = require(`./SyncableVersion.js`);

t = new T();

newerV = V.Newer(V.oldest);

(async () => {

    await t.receive({path: [`t`], fullPathVersions: [newerV, newerV]});

    console.log(t.ChangesSince(0));

})();

t.receive({path: [], fullPathVersions: [newerV]});