import styles from '../page.module.scss';

const ScrewdriverStep = ({ screwdrivers, selected, onSelect }: any) => {
  return (
    <div className={styles["step-card"]}>
      <h2>PASO 1: SELECCIONAR ATORNILLADOR</h2>

      <select
        className={styles["select"]}
        value={selected?.id || ""}
        onChange={(e) =>
          onSelect(
            screwdrivers.find((s: any) => s.id.toString() === e.target.value)
          )
        }
      >
        <option value="">-- Destornillador --</option>

        {screwdrivers.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.serialNumber} - {s.model}
          </option>
        ))}
      </select>
      {selected && (
        <div className={styles["info-card"]}>
          {selected.lastCalibration ? (
            <>
              <div className={styles["info-row"]}>
                <span className={styles["info-label"]}>Fecha:</span>
                {new Date(selected.lastCalibration).toLocaleString()}
              </div>
              <div className={styles["info-row"]}>
                <span className={styles["info-label"]}>Torque Actual:</span>
                {selected.currentTorque} N·m
              </div>
            </>
          ) : (
            <div>No hay calibraciones previas (primera vez)</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScrewdriverStep;