import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDonwContext } from "../contexts/CountdonwContext";
import styles from "../styles/components/ChallangeBox.module.css";

export default function ChallangeBox() {
  const { activeChallage, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountDonw } = useContext(CountDonwContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountDonw();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountDonw();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallage ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallage.amount} xp</header>

          <main>
            <img src={`icons/${activeChallage.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallage.description}</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={handleChallengeSucceeded}
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
