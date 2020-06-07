"use strict";

const Elm = require(`../elm`);
const EventEmitter = require(`events`);
const Interval = require(`../interval`);
const JsonFetch = require(`../json-fetch`);
const State = require(`../state`);
const Task = require(`../task`);

const serverApiPaths = require(`../qss-api-paths`);

const state = {};

state.finalizeState = new Task();

state.serverPid = new State({inputs: [state.finalizeState], update: () => {

    

}});

// (async () => {

//     const isDev = await JsonFetch(serverApiPaths.isDev);

//     const changeDelay = 1000;

//     const state = {};

//     state.serverPid = new EventEmitter();

//     Interval.set(async () => {

//         const 

//         const serverPidResponse = await fetch(serverApiPaths.isDev);

//         const isDev = await 

//         const isDev = await ((await fetch(serverApiPaths.isDev)).json());

//     }, changeDelay);



// })();

// Interval.set(async () => {

//     const isDevResponse = await fetch(serverApiPaths.isDev);

//     const isDev = await 

//     const isDev = await ((await fetch(serverApiPaths.isDev)).json());

// }, changeDelay);

const contentElm = Elm(`div`, {className: `content`, innerText: `

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis venenatis nibh sollicitudin interdum. Vivamus finibus ex leo, eu vehicula arcu pulvinar quis. Morbi ut iaculis arcu. Fusce blandit elit id odio accumsan, consectetur semper justo elementum. Morbi viverra eros in justo suscipit tristique. Morbi in augue vel leo malesuada rhoncus. Donec lorem massa, maximus sed sollicitudin sit amet, volutpat eget massa. Donec tincidunt auctor lacus, in fermentum ante consequat eu. Ut blandit massa et urna finibus, ac molestie magna lacinia. Integer pulvinar, mi lobortis eleifend volutpat, turpis lacus accumsan elit, nec ornare ante turpis eu libero. Duis pharetra magna dolor, ac ultrices justo vestibulum id. Nam mattis eget dolor sed tempus. Phasellus fringilla massa magna, a tincidunt orci congue sed.

    In eros urna, feugiat in lacus ut, vulputate mollis quam. Nullam pellentesque sagittis luctus. Duis placerat turpis sit amet arcu faucibus, quis tempor metus auctor. Vivamus ac urna convallis, pulvinar dui a, feugiat est. Nam vehicula egestas iaculis. Nulla arcu nunc, ornare id tristique vel, ornare et tellus. Ut at tincidunt libero. Morbi eget mauris id dolor volutpat semper quis ac nisi. Vivamus interdum fringilla quam ut placerat.

    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse id volutpat nunc. Integer tristique lorem eu libero suscipit sagittis. Donec vel libero et nisi ultrices porttitor ut eget leo. Nam sit amet erat lectus. Proin pulvinar ex sit amet orci convallis dictum. Fusce lobortis urna est, ac varius urna consectetur sit amet. Donec vulputate non enim consectetur pulvinar. Sed porttitor quam ut quam accumsan, vitae cursus mi feugiat. Mauris sed erat non purus hendrerit convallis. Pellentesque tincidunt lacinia felis id ornare. Proin vitae mauris velit. Sed posuere, nunc nec interdum dictum, lectus neque luctus nisi, molestie semper urna risus et neque. Ut est ipsum, tincidunt vitae interdum congue, viverra eget felis.

    Duis posuere lobortis tortor, non egestas purus posuere eget. Donec sollicitudin luctus tortor at ultricies. Aliquam quis nunc ut nulla semper ullamcorper vel eget orci. Sed consequat molestie nibh sed fringilla. Quisque pharetra suscipit ipsum, quis rhoncus tellus fringilla at. Sed sed eleifend eros. Cras vitae aliquet est, in egestas leo. Aliquam tincidunt sit amet arcu dignissim dapibus.

    Suspendisse nec est id dolor accumsan sagittis condimentum at nisi. Nam dapibus metus eget massa rhoncus commodo interdum ac elit. Phasellus tempor lectus at vestibulum imperdiet. Maecenas ut libero tincidunt, porta mauris a, aliquam tortor. Praesent nec sem elementum, fermentum justo id, commodo metus. Praesent sagittis sagittis nunc, sed suscipit magna tristique vel. Nullam eleifend, turpis at volutpat sollicitudin, tortor lectus semper purus, in tincidunt nunc nulla in turpis. Praesent efficitur tempus ante, eu porttitor erat aliquam consequat. Nullam justo nulla, tempor et commodo a, lacinia sed neque. Ut tempor orci pretium, ornare eros molestie, semper ex. Donec semper eget tellus sit amet ultrices. Donec ut dolor vel est consequat efficitur.

    `});

document.body.appendChild(contentElm);

const fabElm = Elm(`div`, {className: `fab`, childNodes: [Elm(`button`)]});

document.body.appendChild(fabElm);
