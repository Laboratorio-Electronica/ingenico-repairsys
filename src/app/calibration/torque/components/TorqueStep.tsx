import styles from '../page.module.scss';

const TorqueStep = ({ torques, selected, onSelect }: any) => {
  return (
    <div className={styles["step-card"]}>
      <h2>PASO 3: SELECCIONAR TORQUE</h2>

      <div className={styles["torque-grid"]}>
        {torques.map((t: any) => (
          <button
          className={styles["torque-btn"]}
            key={t.id}
            onClick={() => onSelect(t)}
          >
            <div>{t.torque.toFixed(3)} N·m</div>
            <div className={styles["small"]}>{t.use}</div>
            <div className={styles["small"]}>±{t.tolerance}</div>
            {/* {t.torque.toFixed(3)} ±{t.tolerance} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TorqueStep;