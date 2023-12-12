export type Task = {
  prompt: string;
  options: string[];
};

export const tasks: Task[] = [
  // camel 2 words
  {
    prompt: "old location",
    options: ["cold-location", "old-station", "old-location", "old-nation"],
  },
  {
    prompt: "move source",
    options: ["move-south", "more-south", "mover-sound", "move-source"],
  },
  {
    prompt: "on leave",
    options: ["off-leave", "on-leaf", "off-leave", "on-leave"],
  },
  {
    prompt: "happy day",
    options: ["snappy-day", "happy-day", "nappy-day", "happy-play"],
  },
  {
    prompt: "deep thought",
    options: ["sleet-thought", "deep-thought", "keep-thought", "deep-fought"],
  },
  //camel 3 words
  {
    prompt: "set new profile",
    options: [
      "set-new-profile",
      "get-new-profile",
      "set-new-file",
      "get-old-profile",
    ],
  },
  {
    prompt: "create user account",
    options: [
      "create-use-account",
      "get-user-account",
      "create-user-account",
      "create-user-profile",
    ],
  },
  {
    prompt: "add new task",
    options: ["get-new-task", "add-new-task", "add-new-tank", "set-new-task"],
  },
  {
    prompt: "send  new email",
    options: [
      "get-new-email",
      "send-new-email",
      "send-new-mail",
      "delete-old-email",
    ],
  },
  {
    prompt: "upload updated document",
    options: [
      "upload-updated-document",
      "upload-outdated-doc",
      "update-outdated-document",
      "updated-upload-document",
    ],
  },
  // kebab 2 words
  {
    prompt: "min value",
    options: ["newValue", "maxValue", "ondValue", "minValue"],
  },
  {
    prompt: "look around",
    options: ["seeAround", "lookUp", "seeDown", "lookAround"],
  },
  {
    prompt: "max iterator",
    options: ["minIterator", "maxIterator", "oldIterator", "newIterator"],
  },
  {
    prompt: "selected items",
    options: [
      "selectedInfo",
      "chosenItems",
      "selectedItems",
      "selectedObjects",
    ],
  },
  {
    prompt: "set direction",
    options: [
      "changeDirection",
      "sitDirection",
      "setDirection",
      "oneDirection",
    ],
  },
  // kebab 3 words
  {
    prompt: "delete all database",
    options: [
      "delete-all-datebase",
      "remove-all-database",
      "delete-all-database",
      "complete-all-database",
    ],
  },
  {
    prompt: "create new project",
    options: [
      "create-new-project",
      "crate-new-project",
      "initiate-new-project",
      "create-ny-project",
    ],
  },
  {
    prompt: "update software version",
    options: [
      "update-hardware-version",
      "update-software-version",
      "install-software-version",
      "software-update-version",
    ],
  },
  {
    prompt: "enhance user experience",
    options: [
      "enhance-user-experience",
      "improve-customer-satisfaction",
      "optimize-interface-design",
      "upgrade-overall-interaction"
    ]
  },  
  {
    prompt: "archive old files",
    options: [
      "archive-old-file",
      "archive-new-files",
      "arc-new-file",
      "archive-old-files",
    ],
  },
  // no-sep 2 words
  {
    prompt: "choose item",
    options: ["choseitem", "gooseitem", "chooseitem", "choosefighter"],
  },
  {
    prompt: "remove element",
    options: ["moveelement", "removeobject", "removeelement", "addelement"],
  },
  {
    prompt: "my account",
    options: ["mymouse", "myaccount", "thisaccount", "nyaccount"],
  },
  {
    prompt: "update file",
    options: ["updatetile", "updatefile", "updatepile", "updatemile"],
  },
  {
    prompt: "explore world",
    options: ["exploreword", "explorerword", "exploreword", "exploresky"],
  },
  // no-sep 3 words
  {
    prompt: "reset complete system",
    options: [
      "resetcompleatesystem",
      "resetcompletesystem",
      "setcompletesystem",
      "resetcompleteaccount",
    ],
  },
  {
    prompt: "create unique password",
    options: [
      "createuniquepasscode",
      "createuniquepassword",
      "setuniquepassword",
      "crateuniquepassword",
    ],
  },
  {
    prompt: "update system software",
    options: [
      "upgradesystemsoftware",
      "updatesystemhardware",
      "updatesystemsoftware",
      "outdatesystemsoftware",
    ],
  },
  {
    prompt: "delete sensitive data",
    options: [
      "deletesensitivedata",
      "removesensitivedata",
      "deletesensitivedate",
      "deleteoutdateddata",
    ],
  },
  {
    prompt: "backup important files",
    options: [
      "backupimportantfile",
      "backupimportantfiles",
      "updateimportantfiles",
      "backupnonimportantfiles",
    ],
  },
];
