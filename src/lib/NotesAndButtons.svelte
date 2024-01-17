<script>
import { slide } from "svelte/transition";

export let character = {
  created: 0,
  level: "",
  selectedClass: "",
  currentHitpoints: "",
  maxHitpoints: "",
  hitdice: "",
  maxSpellslots: "",
  currentSpellslots: "",
  maxHitpointDice: "",
  currentHitpointDice: "",
};

let notes = [
  {
    id: 1,
    text: "Here is some space for you to write some notes about your adventure",
  },
];
let inputField;
let newFieldValue = "";

function onInput(event) {
  let index = notes.length == 0 ? 1 : notes[notes.length - 1].id + 1;
  if (event.type == "click" && newFieldValue !== "") {
    notes = [...notes, { id: index, text: newFieldValue }];
  }
  if (event.key !== "Enter" || newFieldValue == "") return;
  notes = [...notes, { id: index, text: newFieldValue }];
  inputField.value = "";
  newFieldValue = "";
  console.log(notes);
}

function longRest() {
  character.currentSpellslots = [...character.maxSpellslots];
  character.currentHitpoints = character.maxHitpoints;
  character.currentHitpointDice = character.maxHitpointDice;
}
</script>

<div class="m-5">
  <h1 class="text-xl text-rodeo-dust-800">Notes</h1>
  <div class="flex items-center">
    <label hidden for="notesField">Notes</label>
    <input
      placeholder="Write your notes"
      class="flex-grow max-w-60 border-solid border-2 rounded-lg bg-sage-200 border-sage-400 min-w-10"
      bind:this="{inputField}"
      on:keydown="{onInput}"
      bind:value="{newFieldValue}"
      id="noteField"
      type="text" />
    <button
      class="transition ml-2 ease-in-out shadow-sm shadow-sage-600 bg-sage-400 rounded hover:scale-110 hover:bg-sage-500 duration-300"
      on:click|preventDefault="{onInput}"
      ><img
        src="/note-medical-svgrepo-com.svg"
        height="24"
        width="24"
        alt="" /></button>
  </div>
  <div class="max-h-96 overflow-y-auto">
    {#each notes as note (note.id)}
      <div
        transition:slide
        class="flex items-center m-1 bg-rodeo-dust-300 rounded-md p-1 shadow-md shadow-rodeo-dust-400">
        <p class="flex-grow min-w-0 text-wrap">
          • {note.text}
        </p>
        <button
          on:click="{() => (notes = notes.filter((i) => i.id !== note.id))}"
          class="min-w-8 min-h-8 shadow-sm shadow-sage-600 transition ease-in-out m-1 bg-sage-400 rounded px-1 hover:scale-110 hover:bg-sage-500 duration-300"
          ><img
            src="/trash-blank-svgrepo-com.svg"
            height="24"
            width="24"
            alt="" /></button>
      </div>
    {/each}
  </div>
  <button
    class="transition ease-in-out mt-5 mb-2 shadow-sm shadow-sage-600 bg-sage-400 rounded hover:scale-110 hover:bg-sage-500 duration-300"
    on:click="{longRest}">Long Rest</button>
</div>
