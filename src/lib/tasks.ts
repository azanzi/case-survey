export type Task = {
  prompt: string;
  options: string[];
};

export const tasks: Task[] = [
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
];
