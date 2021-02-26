import { createContext, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallage: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setcurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallage, setActiveChallage] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challange = challenges[ramdomChallengeIndex];
    setActiveChallage(challange);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challange.amount}xp`,
      });
    }
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function resetChallenge() {
    setActiveChallage(null);
  }

  function completeChallenge() {
    if (!activeChallage) {
      return;
    }

    const { amount } = activeChallage;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setcurrentExperience(finalExperience);
    setActiveChallage(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallage,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}
    >
      {isLevelUpModalOpen && (
        <LevelUpModal closeLevelUpModal={closeLevelUpModal} />
      )}
      {children}
    </ChallengesContext.Provider>
  );
}
