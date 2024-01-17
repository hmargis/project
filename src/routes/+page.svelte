<script>
/** @type {import('./$types').PageLoad} */

export let data;

import { cubicIn, cubicOut } from "svelte/easing";
import { fade } from "svelte/transition";
import Spells from "../lib/spells.svelte";
import Hitpoints from "../lib/hitpoints.svelte";
import ClassAndLevelSelector from "../lib/classAndLevelSelector.svelte";
import NotesAndButtons from "../lib/NotesAndButtons.svelte";
import DeathScreen from "../lib/DeathScreen.svelte";

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
  dead: false,
};
</script>

{#if !character.dead}
  <div class="grid grid-cols-1 md:grid-cols-3">
    {#if character.created == 0 || character.dead}
      <div
        class=" bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">
        <ClassAndLevelSelector bind:character="{character}" data="{data}" />
      </div>
    {:else}
      <div
        in:fade="{{ delay: 0, duration: 500, easing: cubicIn }}"
        class="bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">
        <NotesAndButtons bind:character="{character}" />
      </div>
    {/if}
    {#if character.unconcious}
      <div
        in:fade="{{ delay: 0, duration: 500, easing: cubicIn }}"
        class=" bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">
        <DeathScreen bind:character="{character}" />
      </div>
    {:else}
      <div
        in:fade="{{ delay: 0, duration: 500, easing: cubicIn }}"
        class=" bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">
        <Hitpoints bind:character="{character}" />
      </div>
    {/if}
    <div
      class=" bg-gradient-to-t shadow-md shadow-rodeo-dust-400 from-rodeo-dust-200 to-rodeo-dust-400 rounded-md m-1">
      <Spells bind:character="{character}" />
    </div>
  </div>
{:else}
  <div>You Died!</div>
{/if}
