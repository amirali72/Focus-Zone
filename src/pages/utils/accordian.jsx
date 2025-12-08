import React from "react";

export const accordianData = [
  {
    id: 1,
    text:
      "Focus Zone is a productivity web app that combines a Pomodoro timer, a full-featured todo list, a notes workspace, live weather, and a memory game into a single, focused interface so you can plan sessions, execute tasks, and take intentional breaks without leaving the app. It is built with React and Tailwind CSS, uses localStorage to persist key data across sessions, and taps into browser geolocation plus a weather API to keep you aware of current conditions while you work    ",
    heading: " Focus Zone Overview",
  },
  {
    id: 2,
    text:
      "The Pomodoro timer follows the traditional structure of four 25-minute work rounds separated by 5-minute short breaks, with a longer 15-minute break after the fourth round, and it automatically switches between work and break states while tracking the current round and total completed pomodoros, which are also saved to localStorage so your daily progress survives refreshes",
    heading: "Pomodoro Timer",
  },
  {
    id: 3,
    text:
      "The Todo section is a full-featured task manager that lets you add, edit, delete, and complete tasks, filter them by All, Active, or Completed, and persist everything in localStorage so your task list stays intact between visits, making it ideal for planning what to tackle in each Pomodoro block ",
    heading: "Todo List",
  },
  {
    id: 4,
    text:
      "The Notes area provides a two-panel layout where you can see a list of notes on the left and edit the selected note on the right, allowing quick switching between ideas while keeping context visible; notes support creating, updating, and deleting entries, and are automatically stored in localStorage to avoid losing anything you jot down during deep work",
    heading: "Notes",
  },
  {
    id: 5,
    text:
      "The Weather section shows real-time conditions using a third-party weather API, supporting both automatic location detection via the browser’s Geolocation API and manual city search, and it displays clear information like temperature, condition, wind speed, precipitation, and humidity so you can plan focus sessions and breaks around your environment",
    heading: "Weather",
  },
  {
    id: 6,
    text:
      "The Memory Game is a classic 4x4 matching game with 16 cards (8 emoji pairs) that shuffles on each start, tracks your moves, and lets you restart easily, giving you a quick, light mental break between Pomodoro rounds while still keeping you engaged and inside the Focus Zone experience",
    heading: "Memory Game",
  },
  {
    id: 7,
    text: `Focus Zone was created by Amir Ali, built this project as part of a React-focused learning journey and is especially interested in clean UI, practical productivity tools, and modern front-end patterns; you can explore more of this work and other projects through the linked GitHub and LinkedIn profiles`,
    heading: "About Me",
    links: [
      { label: "GitHub", url: "https://github.com/amirali72" },
      { label: "LinkedIn", url: "https://linkedin.com/in/amirali72" },
      { label: "Portfolio", url: "https://amiraliportfolio.netlify.app/" },
    ],
  },
];
