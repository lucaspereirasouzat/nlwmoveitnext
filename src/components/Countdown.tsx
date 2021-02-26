import { useContext } from "react";
import { CountDonwContext } from "../contexts/CountdonwContext";
import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const {
    seconds,
    minutes,
    HasFinished,
    isActive,
    startCountDonw,
    resetCountDonw,
  } = useContext(CountDonwContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdonwContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <div>
          <span>:</span>
        </div>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {HasFinished ? (
        <button type="button" disabled className={styles.countdonwButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              onClick={resetCountDonw}
              type="button"
              className={`${styles.countdonwButton} ${styles.countdonwButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              onClick={startCountDonw}
              type="button"
              className={styles.countdonwButton}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
