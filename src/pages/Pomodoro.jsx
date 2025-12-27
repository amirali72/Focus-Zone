import React, { useEffect, useState } from "react";

const Pomodoro = () => {
  const [timeLeft, SetTimeLeft] = useState(1500);
  const [round, SetRound] = useState(1);
  const [session, SetSession] = useState("Work Session");
  const [completeCount, setCompleteCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const totalRound = 4;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    SetTimeLeft(1500);
    SetRound(1);
    SetSession("Work Session");
    setCompleteCount(0);
  };

  useEffect(() => {
    if (!isRunning) return;
    let myInterval = setInterval(() => {
      SetTimeLeft((prev) => {
        if (prev <= 1) {
          if (session === "Work Session") {
            setIsRunning(false);
            if (round === 4) {
              SetSession("Long Break");
              return 900;
            }
            SetSession("Break");
            return 300;
          }
          setIsRunning(false);
          SetSession("Work Session");
          round < totalRound
            ? SetRound(round + 1)
            : SetRound(1) & setCompleteCount(completeCount + 1);
          return 1500;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(myInterval);
  }, [isRunning, round, completeCount, session]);

  useEffect(() => {
    const completeCountData = localStorage.getItem("completeCount");
    if (completeCountData) {
      const completeCounter = Number(completeCountData)
      setCompleteCount(completeCounter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completeCount", completeCount);
  }, [completeCount]);

  useEffect(() => {
    if (!hasStarted) return; 

    const handleBeforeUnload = (e) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasStarted]);

  return (
    <div className="max-w-2xl mx-auto pb-4">
      {/* Session + Round */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="px-3 sm:px-4 py-1.5 rounded-md bg-gray-100 dark:bg-gray-400 text-gray-700 text-xs sm:text-sm font-medium">
          {hasStarted ? session : "Idle"}
        </div>

        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-200 text-xs sm:text-sm">
          {hasStarted && (
            <>
              <span>
                Round {round} of {totalRound}
              </span>
              <div className="flex gap-1">
                {[...Array(totalRound)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < round ? "bg-teal-500 dark:bg-teal-700" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Timer + Right side */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center">
        {/* Timer */}
        <div className="flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full border-8 border-teal-500 dark:border-teal-700 bg-white dark:bg-gray-300 shrink-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            {hasStarted
              ? `${minutes}:${seconds.toString().padStart(2, "0")}`
              : "00:00"}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
            {hasStarted
              ? session === "Work Session"
                ? "Deep work in progress"
                : session === "Break"
                ? "Short Break"
                : "Long Break"
              : "Ready to focus?"}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
            {hasStarted
              ? session === "Work Session"
                ? "Stay focused for this 25-minute block, then take a short break."
                : session === "Break"
                ? "Nice work. Take a quick 5-minute break – stand up, hydrate, and rest your eyes."
                : "Long break unlocked. Take 15 minutes to fully disconnect – walk, stretch, or relax."
              : "Focus for 25 minutes, then rest for 5. Complete 4 rounds to finish a full cycle."}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
            <button
              onClick={startTimer}
              className="px-5 sm:px-6 py-2 bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-teal-700 transition"
            >
              Start
            </button>

            {hasStarted && (
              <>
                <button
                  onClick={pauseTimer}
                  className="px-5 sm:px-6 py-2 bg-white dark:bg-gray-300 border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Pause
                </button>

                <button
                  onClick={resetTimer}
                  className="px-5 sm:px-6 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 transition"
                >
                  Reset
                </button>
              </>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Completed Pomodoros :
            <span className="font-semibold text-gray-800 dark:text-gray-300 "> {completeCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;