let magicSpellslots = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];
let rangerSpellslots = [
  [],
  [2],
  [3],
  [3],
  [4, 2],
  [4, 2],
  [4, 3],
  [4, 3],
  [4, 3, 2],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2]
];
let fighterSpellslots = [
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0]
];
function load({ params }) {
  return {
    dndClasses: {
      mage: {
        hitdice: 8,
        allSpellslots: [...magicSpellslots]
      },
      sorceror: {
        hitdice: 6,
        allSpellslots: [...magicSpellslots]
      },
      druid: {
        hitdice: 8,
        allSpellslots: [...magicSpellslots]
      },
      fighter: {
        hitdice: 10,
        allSpellslots: [...fighterSpellslots]
      },
      barbarian: {
        hitdice: 12,
        allSpellslots: [...fighterSpellslots]
      },
      bard: {
        hitdice: 8,
        allSpellslots: [...magicSpellslots]
      },
      warlock: {
        hitdice: 8,
        allSpellslots: [[1], [2], [2], [2], [2], [2], [2], [2], [2], [2], [3], [3], [3], [3], [3], [3], [4], [4], [4], [4]]
      },
      cleric: {
        hitdice: 8,
        allSpellslots: [...magicSpellslots]
      },
      monk: {
        hitdice: 8,
        allSpellslots: [...fighterSpellslots]
      },
      rogue: {
        hitdice: 8,
        allSpellslots: [...fighterSpellslots]
      },
      ranger: {
        hitdice: 10,
        allSpellslots: [...rangerSpellslots]
      },
      paladin: {
        hitdice: 12,
        allSpellslots: [...rangerSpellslots]
      }
    }
  };
}
export {
  load
};
