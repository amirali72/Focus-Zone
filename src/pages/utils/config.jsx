import React from 'react'

export const initialCards = [
  { id: 1, text: "🍎", isFlipped: false },
  { id: 2, text: "🍎", isFlipped: false },

  { id: 3, text: "🍉", isFlipped: false },
  { id: 4, text: "🍉", isFlipped: false },

  { id: 5, text: "🍆", isFlipped: false },
  { id: 6, text: "🍆", isFlipped: false },

  { id: 7, text: "🍌", isFlipped: false },
  { id: 8, text: "🍌", isFlipped: false },

  { id: 9, text: "🍇", isFlipped: false },
  { id: 10, text: "🍇", isFlipped: false },

  { id: 11, text: "🍒", isFlipped: false },
  { id: 12, text: "🍒", isFlipped: false },

  { id: 13, text: "🍍", isFlipped: false },
  { id: 14, text: "🍍", isFlipped: false },

  { id: 15, text: "🥝", isFlipped: false },
  { id: 16, text: "🥝", isFlipped: false },
];

export const shuffleCards = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};