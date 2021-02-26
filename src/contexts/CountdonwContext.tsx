import { createContext, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDonwContextData {
  minutes: number;
  seconds: number;
  HasFinished: boolean;
  isActive: boolean;
  startCountDonw: () => void;
  resetCountDonw: () => void;
}

export const CountDonwContext = createContext({} as CountDonwContextData);

let countDonwTimeout: NodeJS.Timeout;

export function CountDonwProvider({ children }: { children: React.ReactNode }) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setisActive] = useState(false);
  const [HasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDonw() {
    setisActive(true);
  }
  function resetCountDonw() {
    setisActive(false);
    clearTimeout(countDonwTimeout);
    setHasFinished(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDonwTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      startNewChallenge();
      setisActive(false);
    }
  }, [isActive, time]);

  return (
    <CountDonwContext.Provider
      value={{
        minutes,
        seconds,
        HasFinished,
        isActive,
        startCountDonw,
        resetCountDonw,
      }}
    >
      {children}
    </CountDonwContext.Provider>
  );
}
