<script>
export let character = {};
export let data;

let dndClasses = Object.keys(data.dndClasses);

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function classAndLevel() {
  if (dndClasses.includes(character.selectedClass)) {
    character.unconcious = false;
    character.dead = false;
    character.created = "1";
    character.hitdice = data.dndClasses[character.selectedClass].hitdice;
    character.maxHitpointDice = character.level;
    character.currentHitpointDice = character.maxHitpointDice;
    character.currentSpellslots =
      data.dndClasses[character.selectedClass].allSpellslots[
        character.level - 1
      ];
    console.log(character.created);
  }
  character.maxSpellslots = [...character.currentSpellslots];
  character.currentHitpoints = character.maxHitpoints;
  console.log(character);
}
</script>

<div class="m-5">
  <h1 class="text-xl text-rodeo-dust-800">Select your class and level</h1>
  <div class="">
    <form class="flex flex-col my-1" on:submit|preventDefault="{classAndLevel}">
      <label for="class">Class</label>
      <select
        id="class"
        class="max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400"
        bind:value="{character.selectedClass}">
        {#each dndClasses as dndClass}
          <option value="{dndClass}">{capitalizeFirstLetter(dndClass)}</option>
        {/each}
      </select>

      <label for="level">Level</label>
      <select
        id="level"
        class=" max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400"
        bind:value="{character.level}">
        {#each range(1, 21) as number}
          <option value="{number}">{number}</option>
        {/each}
      </select>
      <label for="Hitpoints">Hitpoints</label>
      <input
        id="Hitpoints"
        class="max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400 min-w-10"
        type="text"
        bind:value="{character.maxHitpoints}" />
      <button
        class="max-w-60 shadow-sm shadow-sage-600 transition ease-in-out my-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300"
        type="submit">
        Go!
      </button>
    </form>
  </div>
</div>
