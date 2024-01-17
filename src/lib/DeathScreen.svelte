<script>
export let character;
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import { fade } from "svelte/transition";

let stabilised = false;
let dead = false;
let failedSavingThrows = 0;
let succeededSavingThrows = 0;
let diceRoll = tweened(0, {
  duration: 800,
  easing: cubicOut,
});

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

function rollSavingThrow() {
  $diceRoll = Math.floor(Math.random() * 20 + 1);
  if ($diceRoll >= 10) {
    succeededSavingThrows++;
  } else {
    failedSavingThrows++;
  }
  if (failedSavingThrows == 3) {
    character.dead = true;
  }
  if (succeededSavingThrows == 3) {
    character.stabilised = true;
    setTimeout(() => {
      character.unconcious = false;
    }, 1000);
  }
  setTimeout(() => diceRoll.set(0, { delay: 2000, duration: 1 }), 1500);
}
</script>

<div class="m-5">
  <h1 class=" text-rodeo-dust-800 text-xl">Unconscious</h1>
  <p class="text-sm">
    You are unconscious and need to make death saving throws. If you succeed 3
    times you are stabilised if you fail 3 times you die
  </p>

  <div class="grid grid-cols-3 bg-rodeo-dust-300 rounded-md my-3">
    <div class="flex">
      {#each range(0, succeededSavingThrows) as success}
        <div
          in:fade="{{ delay: 800 }}"
          class="m-1 h-4 w-4 bg-sage-600 shadow-sm shadow-sage-700 rounded-full px-1 duration-300">
        </div>
      {/each}
    </div>

    <div class="flex flex-row items-center">
      <button class="mr-3" on:click="{rollSavingThrow}">Roll</button>
      <div>{parseInt($diceRoll)}</div>
    </div>

    <div class="flex max-h-5">
      {#each range(0, failedSavingThrows) as fail}
        <div
          in:fade="{{ delay: 800 }}"
          class="h-4 w-4 m-1 bg-pohutukawa-600 shadow-sm shadow-pohutukawa-700 rounded-full px-1 duration-300">
        </div>
      {/each}
    </div>
  </div>
</div>
