import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { initialCards, shuffleCards } from "./utils/config";

const Memory = () => {
  const [memoryCards, setMemoryCards] = useState(shuffleCards(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [showFlipText, setShowFlipText] = useState(false);
  const [showMatchText, setShowMatchText] = useState(false);
  const [moves, setMoves] = useState(0);
  const [wonCards, setWonCards] = useState([]);

  const handleOnClick = (id) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    if (wonCards.includes(id)) return;

    setMoves(moves + 1);

    const newData = memoryCards.map((cards) => {
      if (cards.id === id) {
        return { ...cards, isFlipped: true };
      }
      return cards;
    });
    setMemoryCards(newData);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const firstCard = memoryCards.find((card) => card.id === flippedCards[0]);
      const secondCard = memoryCards.find(
        (card) => card.id === flippedCards[1]
      );
      if (firstCard.text === secondCard.text) {
        console.log("Match");
        setFlippedCards([]);
        setWonCards([...wonCards,firstCard.id,secondCard.id]);
        const checkWin = memoryCards.every((cards) => cards.isFlipped === true);
        checkWin && setHasWon(true);
        if (!checkWin) {
          setShowMatchText(true);
          setTimeout(()=>{
            setShowMatchText(false);
          },1000)
        }
      } else {
        setShowFlipText(true);
        setTimeout(() => {
          const newCards = memoryCards.map((cards) => {
            if (cards.id === flippedCards[0] || cards.id === flippedCards[1]) {
              return { ...cards, isFlipped: false };
            }
            return cards;
          });
          setMemoryCards(newCards);
          setFlippedCards([]);
          setShowFlipText(false);
        }, 1000);
      }
    }
  }, [flippedCards, memoryCards, wonCards]);

  const restartGame = () => {
    setFlippedCards([]);
    setMemoryCards(shuffleCards(initialCards));
    setHasWon(false);
    setMoves(0);
    setWonCards([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:space-x-20">
        <div className="mb-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-300 mb-1">
            Memory Game
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xs">
            Match all the pairs to win the game
          </p>
        </div>
        {!hasWon && (
          <div className="sm:ml-9 p-3 sm:p-4 rounded-lg text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              💡 Click on cards to flip them and find matching pairs
            </p>
          </div>
        )}
      </div>

      {/* Game Stats and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 px-4 sm:px-6 py-3 bg-teal-50 dark:bg-gray-400 rounded-xl">
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div>
            <p className="text-xs text-gray-600 mb-1">Moves</p>
            <p className="text-lg sm:text-xl font-bold text-gray-800">{moves}</p>
          </div>
          {showFlipText && (
            <div className="px-3 sm:px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium animate-pulse">
              Flipping cards...
            </div>
          )}
          {showMatchText && (
            <div className="px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium animate-pulse">
              Match...  
            </div>
          )}
        </div>
        <button
          onClick={restartGame}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white text-xs sm:text-sm font-medium transition w-full sm:w-auto"
        >
          <RotateCcw size={16} />
          Restart
        </button>
      </div>

      {/* Win Message */}
      {hasWon && (
        <div className="mb-6 p-4 sm:p-6 bg-linear-to-r from-teal-500 dark:from-teal-700 to-emerald-500 dark:to-emerald-700 rounded-xl text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-base sm:text-lg">You won in {moves} moves!</p>
          <button
            onClick={restartGame}
            className="mt-4 px-6 py-2 bg-white text-teal-600 hover:bg-gray-100 rounded-lg font-medium transition text-sm sm:text-base"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 place-items-center">
        {memoryCards.map((cards) => {
          return (
            <div
              key={cards.id}
              onClick={() => handleOnClick(cards.id)}
              className={`aspect-square flex items-center justify-center text-2xl sm:text-4xl rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 w-8/12 sm:h-20 ${
                cards.isFlipped
                  ? "bg-white dark:bg-gray-200 border-2 border-teal-500 shadow-md scale-105"
                  : "bg-teal-100 dark:bg-gray-300 hover:bg-teal-200 border-2 border-teal-300 dark:border-teal-700"
              }`}
            >
              <span 
                className={
                  cards.isFlipped ? "scale-100" : "scale-75 opacity-40"
                }
              >
                {cards.isFlipped ? cards.text : "❓"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
    </div>
  );
};

export default Memory;