<style lang="postcss"></style>

<script>
import { fade } from "svelte/transition";

export let character = {};

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

function spellExhausted(grade) {
  character.currentSpellslots[grade] =
    character.currentSpellslots[grade] > 0
      ? character.currentSpellslots[grade] - 1
      : 0;
}
</script>

<div class="m-5">
  <h1 class="text-xl text-rodeo-dust-800">Track your Spell Slots</h1>
  <div class="my-1">
    {#each character.maxSpellslots as spellSlot, i}
      <div
        class="flex m-1 items-center bg-rodeo-dust-300 rounded-md p-1 shadow-md shadow-rodeo-dust-400">
        <div class="min-w-16">Grade {i + 1}:</div>
        <div class="h-7 flex items-center flex-grow">
          {#each range(0, character.maxSpellslots[i]) as j}
            {#if j <= character.currentSpellslots[i] - 1}
              <div
                in:fade
                class="min-h-4 min-w-4 max-h-5 max-w-5 bg-sage-600 rounded-full mx-0.5">
              </div>
            {:else}
              <div
                in:fade
                class="min-h-4 min-w-4 max-h-5 max-w-5 bg-pohutukawa-600 rounded-full mx-0.5">
              </div>
            {/if}
          {/each}
        </div>
        {#if character.currentSpellslots[i] == "0"}
          <div class="">
            <button
              disabled
              on:click="{() => spellExhausted(i)}"
              class="m-1 bg-sage-200 shadow-sm shadow-sage-400 rounded px-1 duration-300">
              <img src="/spark-svgrepo-com.svg" height="24" width="24" alt="" />
            </button>
          </div>
        {:else}
          <div class="">
            <button
              on:click="{() => spellExhausted(i)}"
              class="shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300">
              <img src="/spark-svgrepo-com.svg" height="24" width="24" alt="" />
            </button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
