export type Task = {
  prompt: string;
  options: string[];
};

export const tasks: Task[] = [
  // camel
  {
    prompt: "old-location",
    options: ["cold-location", "old-station", "old-location", "old-nation"],
  },
  {
    prompt: "move-source",
    options: ["move-south", "more-south", "mover-sound", "move-source"],
  },
  {
    prompt: "on-leave",
    options: ["off-leave", "on-leaf", "off-leave", "on-leave"],
  },
  {
    prompt: "happy-day",
    options: ["snappy-day", "happy-day", "nappy-day", "happy-play"],
  },
  {
    prompt: "deep-thought",
    options: ["sleet-thought", "deep-thought", "keep-thought", "deep-fought"],
  },
  // kebab
  {
    prompt: "minValue",
    options: ["newValue", "maxValue", "ondValue", "minValue"],
  },
  {
    prompt: "lookAround",
    options: ["seeAround", "lookUp", "seeDown", "lookAround"],
  },
  {
    prompt: "maxIterator",
    options: ["minIterator", "maxIterator", "oldIterator", "newIterator"],
  },
  {
    prompt: "selectedItems",
    options: [
      "selectedInfo",
      "chosenItems",
      "selectedItems",
      "selectedObjects",
    ],
  },
  {
    prompt: "setDirection",
    options: [
      "changeDirection",
      "sitDirection",
      "setDirection",
      "oneDirection",
    ],
  },
  // no-sep
  {
    prompt: "chooseitem",
    options: ["choseitem", "gooseitem", "chooseitem", "choosefighter"],
  },
  {
    prompt: "removeelement",
    options: ["moveelement", "removeobject", "removeelement", "addelement"],
  },
  {
    prompt: "myaccount",
    options: ["mymouse", "myaccount", "thisaccount", "nyaccount"],
  },
  {
    prompt: "updatefile",
    options: ["updatetile", "updatefile", "updatepile", "updatemile"],
  },
  {
    prompt: "exploreworld",
    options: ["exploreword", "explorerword", "exploreword", "exploresky"],
  },
];
