"use strict";

const execa = require(`execa`);
const fs = require(`fs`);
const path = require(`path`);

const submodulesDir = path.join(__dirname, `local_node_modules`);

const installDependenciesOf = (submoduleName) => {

    execa.sync(`npm`, [`up`], {cwd: path.join(submodulesDir, submoduleName)});

    console.log(`installed ${submoduleName}`);

};

const failedSubmoduleNames = [];

for (const submoduleName of fs.readdirSync(submodulesDir)) {

    if (submoduleName[0] !== `.`) {

        try {

            installDependenciesOf(submoduleName);

        } catch (error) {

            failedSubmoduleNames.push(submoduleName);

        }

    }

}

failedSubmoduleNames.forEach(installDependenciesOf);
