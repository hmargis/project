import { c as create_ssr_component } from "../../chunks/hooks.server.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const prerender = true;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  return `${slots.default ? slots.default({}) : ``} <footer class="text-xs" data-svelte-h="svelte-1f6936q"><div class="bg-rodeo-dust-400 shadow-sm shadow-rodeo-dust-500 m-1 rounded p-1">This webapp is unofficial Fan Content permitted under the Fan Content
    Policy. Not approved/endorsed by Wizards. Portions of the materials used are
    property of Wizards of the Coast. ©Wizards of the Coast LLC.</div></footer>`;
});
export {
  Layout as default
};
