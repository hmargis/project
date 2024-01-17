<style lang="postcss"></style>

<script>
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

export let character = {};

let tweenedHitpoints = tweened(0, {
  duration: 400,
  easing: cubicOut,
});

let tweenedDiceRoll = tweened(0, {
  duration: 800,
  easing: cubicOut,
});

$: tweenedHitpoints.set(parseInt(character.currentHitpoints));

function looseHitpoints(i) {
  character.currentHitpoints -= i;
  character.currentHitpoints =
    character.currentHitpoints < 0 ? 0 : character.currentHitpoints;
  if (character.currentHitpoints == 0) {
    character.unconcious = true;
  }
}

function gainHitpoints(i) {
  character.currentHitpoints += i;
  character.currentHitpoints =
    character.currentHitpoints > character.maxHitpoints
      ? character.maxHitpoints
      : character.currentHitpoints;
}

function rollHitPointDice() {
  if (character.currentHitpoints >= character.maxHitpoints) {
    return;
  }
  if (character.currentHitpointDice <= 0) {
    return;
  }

  let diceRoll = Math.floor(Math.random() * character.hitdice + 1);
  tweenedDiceRoll.set(diceRoll);

  character.currentHitpoints = character.currentHitpoints + diceRoll;
  character.currentHitpointDice--;
  character.currentHitpoints =
    character.currentHitpoints > character.maxHitpoints
      ? character.maxHitpoints
      : character.currentHitpoints;
  character.currentHitpointDice =
    character.currentHitpointDice < 0 ? 0 : character.currentHitpointDice;

  setTimeout(() => tweenedDiceRoll.set(0, { delay: 2000, duration: 1 }), 1000);
}
</script>

<div class="m-5">
  <h1 class="text-xl text-rodeo-dust-800">Hitpoints</h1>
  <div class="my-1">
    <span class="min-w-20"
      >Hitpoints: {parseInt($tweenedHitpoints)}/{character.maxHitpoints}</span>
    <div class="flex items-center">
      <button
        class="shadow-sm shadow-pohutukawa-600 transition ease-in-out m-1 bg-pohutukawa-300 rounded px-1 hover:scale-110 hover:bg-pohutukawa-500 duration-300"
        on:click="{() => looseHitpoints(1)}">
        <img
          class="inline"
          src="/heart-alt-svgrepo-com.svg"
          height="24"
          width="24"
          alt="" />-1</button>
      <button
        class="shadow-sm shadow-pohutukawa-600 transition ease-in-out m-1 bg-pohutukawa-300 rounded px-1 hover:scale-110 hover:bg-pohutukawa-500 duration-300"
        on:click="{() => looseHitpoints(10)}"
        ><img
          class="inline"
          src="/heart-alt-svgrepo-com.svg"
          height="24"
          width="24"
          alt="" />-10</button>
      <button
        class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-400 duration-300"
        on:click="{() => gainHitpoints(1)}">
        <img
          class="inline"
          src="/heart-alt-svgrepo-com.svg"
          height="24"
          width="24"
          alt="" />+1</button>
      <button
        class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-400 duration-300"
        on:click="{() => gainHitpoints(10)}"
        ><img
          class="inline"
          src="/heart-alt-svgrepo-com.svg"
          height="24"
          width="24"
          alt="" />+10</button>
    </div>

    <div class="">
      <div
        class="min-h-3 w-full bg-pohutukawa-600 rounded-full text-center text-justify-center">
        {#if $tweenedHitpoints > 0}
          <div
            class="min-h-3 min-w-0 bg-sage-900 text-pohutukawa-950 text-xs font-medium p-0.5 leading-none rounded-full"
            style="width: {($tweenedHitpoints / character.maxHitpoints) *
              100}%">
          </div>
        {/if}
      </div>
      <div>
        You have this hitpoint dice:
        {#if character.hitdice}
          W{character.hitdice}
        {/if}
        <br />
        Hitpoint Dice:
        {#if character.maxHitpointDice}
          {character.currentHitpointDice}/{character.maxHitpointDice}
        {/if}
        <br />
      </div>
      <button
        on:click="{rollHitPointDice}"
        class="shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300"
        >Roll HP Dice</button>
      <button
        disabled
        class="shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1">
        {parseInt($tweenedDiceRoll)}
      </button>
    </div>
  </div>
</div>
