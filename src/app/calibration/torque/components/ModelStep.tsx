import styles from '../page.module.scss';

const ModelStep = ({ models, selected, onChange }: any) => {
  return (
    <div className={styles["step-card"]}>
      <h2>PASO 2: SELECCIONAR MODELO</h2>

      <select
        value={selected?.id || ""}
        onChange={onChange}
      >
        <option value="">-- Modelo --</option>

        {models.map((m: any) => (
          <option key={m.id} value={m.id}>
            {m.code} ({m.technology})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelStep;