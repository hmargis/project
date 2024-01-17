import { n as noop, c as create_ssr_component, d as each, e as escape, f as assign, i as identity, a as subscribe, h as add_attribute, v as validate_component } from "../../chunks/hooks.server.js";
import { w as writable } from "../../chunks/index.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
const Spells = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { character = {} } = $$props;
  const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  return `<div class="m-5"><h1 class="text-xl text-rodeo-dust-800" data-svelte-h="svelte-nfb2w7">Track your Spell Slots</h1> <div class="my-1">${each(character.maxSpellslots, (spellSlot, i) => {
    return `<div class="flex m-1 items-center bg-rodeo-dust-300 rounded-md p-1 shadow-md shadow-rodeo-dust-400"><div class="min-w-16">Grade ${escape(i + 1)}:</div> <div class="h-7 flex items-center flex-grow">${each(range(0, character.maxSpellslots[i]), (j) => {
      return `${j <= character.currentSpellslots[i] - 1 ? `<div class="min-h-4 min-w-4 max-h-5 max-w-5 bg-sage-600 rounded-full mx-0.5" data-svelte-h="svelte-3l3iop"></div>` : `<div class="min-h-4 min-w-4 max-h-5 max-w-5 bg-pohutukawa-600 rounded-full mx-0.5" data-svelte-h="svelte-wu2626"></div>`}`;
    })}</div> ${character.currentSpellslots[i] == "0" ? `<div class=""><button disabled class="m-1 bg-sage-200 shadow-sm shadow-sage-400 rounded px-1 duration-300" data-svelte-h="svelte-1ljx1yx"><img src="/spark-svgrepo-com.svg" height="24" width="24" alt=""></button> </div>` : `<div class=""><button class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300" data-svelte-h="svelte-qfmlma"><img src="/spark-svgrepo-com.svg" height="24" width="24" alt=""></button> </div>`} </div>`;
  })}</div></div>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const Hitpoints = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tweenedHitpoints, $$unsubscribe_tweenedHitpoints;
  let $tweenedDiceRoll, $$unsubscribe_tweenedDiceRoll;
  let { character = {} } = $$props;
  let tweenedHitpoints = tweened(0, { duration: 400, easing: cubicOut });
  $$unsubscribe_tweenedHitpoints = subscribe(tweenedHitpoints, (value) => $tweenedHitpoints = value);
  let tweenedDiceRoll = tweened(0, { duration: 800, easing: cubicOut });
  $$unsubscribe_tweenedDiceRoll = subscribe(tweenedDiceRoll, (value) => $tweenedDiceRoll = value);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  {
    tweenedHitpoints.set(parseInt(character.currentHitpoints));
  }
  $$unsubscribe_tweenedHitpoints();
  $$unsubscribe_tweenedDiceRoll();
  return `<div class="m-5"><h1 class="text-xl text-rodeo-dust-800" data-svelte-h="svelte-chn2ci">Hitpoints</h1> <div class="my-1"><span class="min-w-20">Hitpoints: ${escape(parseInt($tweenedHitpoints))}/${escape(character.maxHitpoints)}</span> <div class="flex items-center"><button class="shadow-sm shadow-pohutukawa-600 transition ease-in-out m-1 bg-pohutukawa-300 rounded px-1 hover:scale-110 hover:bg-pohutukawa-500 duration-300" data-svelte-h="svelte-nbk5hc"><img class="inline" src="/heart-alt-svgrepo-com.svg" height="24" width="24" alt="">-1</button> <button class="shadow-sm shadow-pohutukawa-600 transition ease-in-out m-1 bg-pohutukawa-300 rounded px-1 hover:scale-110 hover:bg-pohutukawa-500 duration-300" data-svelte-h="svelte-1pxjw9o"><img class="inline" src="/heart-alt-svgrepo-com.svg" height="24" width="24" alt="">-10</button> <button class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-400 duration-300" data-svelte-h="svelte-1apogs6"><img class="inline" src="/heart-alt-svgrepo-com.svg" height="24" width="24" alt="">+1</button> <button class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-400 duration-300" data-svelte-h="svelte-srvo12"><img class="inline" src="/heart-alt-svgrepo-com.svg" height="24" width="24" alt="">+10</button></div> <div class=""><div class="min-h-3 w-full bg-pohutukawa-600 rounded-full text-center text-justify-center">${$tweenedHitpoints > 0 ? `<div class="min-h-3 min-w-0 bg-sage-900 text-pohutukawa-950 text-xs font-medium p-0.5 leading-none rounded-full" style="${"width: " + escape($tweenedHitpoints / character.maxHitpoints * 100, true) + "%"}"></div>` : ``}</div> <div>You have this hitpoint dice:
        ${character.hitdice ? `W${escape(character.hitdice)}` : ``} <br>
        Hitpoint Dice:
        ${character.maxHitpointDice ? `${escape(character.currentHitpointDice)}/${escape(character.maxHitpointDice)}` : ``} <br></div> <button class="shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300" data-svelte-h="svelte-qaa01e">Roll HP Dice</button> <button disabled class="shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1">${escape(parseInt($tweenedDiceRoll))}</button></div></div></div>`;
});
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ClassAndLevelSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { character = {} } = $$props;
  let { data } = $$props;
  let dndClasses = Object.keys(data.dndClasses);
  const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="m-5"><h1 class="text-xl text-rodeo-dust-800" data-svelte-h="svelte-19iaklg">Select your class and level</h1> <div class=""><form class="flex flex-col my-1"><label for="class" data-svelte-h="svelte-1n4mhj6">Class</label> <select id="class" class="max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400">${each(dndClasses, (dndClass) => {
    return `<option${add_attribute("value", dndClass, 0)}>${escape(capitalizeFirstLetter(dndClass))}</option>`;
  })}</select> <label for="level" data-svelte-h="svelte-wg7nou">Level</label> <select id="level" class="max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400">${each(range(1, 21), (number) => {
    return `<option${add_attribute("value", number, 0)}>${escape(number)}</option>`;
  })}</select> <label for="Hitpoints" data-svelte-h="svelte-yzf7ge">Hitpoints</label> <input id="Hitpoints" class="max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400 min-w-10" type="text"${add_attribute("value", character.maxHitpoints, 0)}> <button class="max-w-60 shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300" type="submit" data-svelte-h="svelte-rbr180">Go!</button></form></div></div>`;
});
const NotesAndButtons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { character = {
    created: 0,
    level: "",
    selectedClass: "",
    currentHitpoints: "",
    maxHitpoints: "",
    hitdice: "",
    maxSpellslots: "",
    currentSpellslots: "",
    maxHitpointDice: "",
    currentHitpointDice: ""
  } } = $$props;
  let notes = [
    {
      id: 1,
      text: "Here is some space for you to write some notes about your adventure"
    }
  ];
  let inputField;
  let newFieldValue = "";
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  return `<div class="m-5"><h1 class="text-xl text-rodeo-dust-800" data-svelte-h="svelte-t1ptl7">Notes</h1> <div class="flex items-center"><label hidden for="notesField" data-svelte-h="svelte-b0bkbi">Notes</label> <input placeholder="Write your notes" class="flex-grow max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400 min-w-10" id="noteField" type="text"${add_attribute("this", inputField, 0)}${add_attribute("value", newFieldValue, 0)}> <button class="transition ml-2 ease-in-out shadow-sm shadow-sage-600 bg-sage-400 rounded hover:scale-110 hover:bg-sage-500 duration-300" data-svelte-h="svelte-9junuf"><img src="/note-medical-svgrepo-com.svg" height="24" width="24" alt=""></button></div> <div class="max-h-96 overflow-y-auto">${each(notes, (note) => {
    return `<div class="flex items-center m-1 bg-rodeo-dust-300 rounded-md p-1 shadow-md shadow-rodeo-dust-400"><p class="flex-grow min-w-0 text-wrap">• ${escape(note.text)}</p> <button class="min-w-8 min-h-8 shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300" data-svelte-h="svelte-1kzqbge"><img src="/trash-blank-svgrepo-com.svg" height="24" width="24" alt=""></button> </div>`;
  })}</div> <button class="transition ease-in-out mt-5 mb-2 shadow-sm shadow-sage-600 bg-sage-400 rounded hover:scale-110 hover:bg-sage-500 duration-300" data-svelte-h="svelte-p4r1w8">Long Rest</button></div>`;
});
const DeathScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $diceRoll, $$unsubscribe_diceRoll;
  let { character } = $$props;
  let failedSavingThrows = 0;
  let succeededSavingThrows = 0;
  let diceRoll = tweened(0, { duration: 800, easing: cubicOut });
  $$unsubscribe_diceRoll = subscribe(diceRoll, (value) => $diceRoll = value);
  const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  $$unsubscribe_diceRoll();
  return `<div class="m-5"><h1 class="text-rodeo-dust-800 text-xl" data-svelte-h="svelte-1t7dsz">Unconscious</h1> <p class="text-sm" data-svelte-h="svelte-1vjjvj2">You are unconscious and need to make death saving throws. If you succeed 3
    times you are stabilised if you fail 3 times you die</p> <div class="grid grid-cols-3 bg-rodeo-dust-300 rounded-md my-3"><div class="flex">${each(range(0, succeededSavingThrows), (success) => {
    return `<div class="m-1 h-4 w-4 bg-sage-600 shadow-sm shadow-sage-700 rounded-full px-1 duration-300" data-svelte-h="svelte-i2fq12"></div>`;
  })}</div> <div class="flex flex-row items-center"><button class="mr-3" data-svelte-h="svelte-ei33um">Roll</button> <div>${escape(parseInt($diceRoll))}</div></div> <div class="flex max-h-5">${each(range(0, failedSavingThrows), (fail) => {
    return `<div class="h-4 w-4 m-1 bg-pohutukawa-600 shadow-sm shadow-pohutukawa-700 rounded-full px-1 duration-300" data-svelte-h="svelte-h5h1sq"></div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let character = {
    created: "",
    level: "",
    selectedClass: "",
    currentHitpoints: "0",
    maxHitpoints: "0",
    hitdice: "",
    maxSpellslots: "",
    currentSpellslots: "",
    stabilised: false,
    unconcious: false,
    dead: false
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="grid grid-cols-1 md:grid-cols-3">${character.created == 0 || character.dead ? `<div class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">${validate_component(ClassAndLevelSelector, "ClassAndLevelSelector").$$render(
      $$result,
      { data, character },
      {
        character: ($$value) => {
          character = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : `<div class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">${validate_component(NotesAndButtons, "NotesAndButtons").$$render(
      $$result,
      { character },
      {
        character: ($$value) => {
          character = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`} ${character.unconcious ? `<div class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">${validate_component(DeathScreen, "DeathScreen").$$render(
      $$result,
      { character },
      {
        character: ($$value) => {
          character = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : `<div class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">${validate_component(Hitpoints, "Hitpoints").$$render(
      $$result,
      { character },
      {
        character: ($$value) => {
          character = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`} <div class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">${validate_component(Spells, "Spells").$$render(
      $$result,
      { character },
      {
        character: ($$value) => {
          character = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div data-svelte-h="svelte-1slklwu">hallo</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
