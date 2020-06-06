"use strict";

const Elm = require(`../elm`);
const StoredJsonLog = require(`../stored-json-log`);

const uiElm = Elm(`div`, {

    innerText: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula, sapien non convallis porta, lacus leo efficitur ipsum, quis scelerisque nibh massa in tellus. Phasellus posuere congue porta. Proin gravida luctus blandit. Quisque et nunc pellentesque, pulvinar tellus in, vestibulum libero. Vivamus nisl ipsum, vestibulum vitae molestie quis, lacinia vitae nisi. Sed nec maximus eros. Morbi urna orci, porttitor eu ornare sit amet, convallis a nisi. Nunc semper consectetur justo non ullamcorper. Aenean sed metus accumsan, cursus leo id, bibendum turpis. Vivamus id risus a risus facilisis vestibulum. Etiam vitae egestas sem. Nulla facilisi. Fusce tempus quam lacus, et cursus mauris tempus a. Sed vehicula ipsum risus, sit amet lobortis ipsum aliquam et.

        Duis pulvinar ornare tortor eu dignissim. Nullam quis nisl bibendum, consequat dolor quis, fringilla urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas quam ipsum, ac lacinia risus egestas in. Fusce hendrerit quam eget euismod volutpat. Cras et metus iaculis, semper enim eu, malesuada erat. Aliquam gravida tempus tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam sed elit sed libero feugiat vulputate quis tempor ante. Integer sit amet purus dignissim, tristique ex at, ullamcorper mauris.

        Donec tempus sapien lectus, eu elementum urna aliquam ut. Integer eget auctor nulla, ut tincidunt turpis. Phasellus luctus lobortis ligula a imperdiet. Fusce iaculis eu ipsum nec consequat. Suspendisse vitae dui tincidunt, feugiat lacus at, aliquam mi. In sapien sapien, sagittis ut risus sed, rhoncus vehicula nibh. Nulla facilisi.

        Proin tempor non purus volutpat pretium. Suspendisse fermentum viverra felis, sagittis porttitor ex ultricies non. Pellentesque lobortis tristique neque, at fringilla lectus condimentum sed. Cras quis nisi quis massa facilisis pulvinar. In eleifend dui ipsum, eget ultrices sem tincidunt nec. Donec venenatis, neque vel consectetur euismod, massa orci euismod ligula, nec porta augue ex vitae risus. In eu luctus neque.

        Nam massa odio, elementum eu nibh non, tristique volutpat tellus. Maecenas blandit est eget lectus pellentesque mollis. Mauris turpis lorem, mollis aliquam nulla vehicula, aliquet faucibus risus. Aenean id justo enim. Duis pharetra faucibus varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam placerat, sapien eu sollicitudin malesuada, turpis odio sollicitudin diam, sed luctus enim diam ut odio. Curabitur magna lectus, pellentesque eu molestie et, molestie sit amet justo. Mauris tempus massa et pellentesque luctus. Pellentesque faucibus nisi aliquam pellentesque imperdiet. Vestibulum luctus, neque quis suscipit dignissim, elit est mattis magna, a fringilla lacus libero id nisl.

        `,

    classList: [`ui`],

    });

document.body.appendChild(uiElm);
