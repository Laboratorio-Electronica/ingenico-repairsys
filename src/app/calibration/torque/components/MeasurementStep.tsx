import { EscanerSieteSegmentos } from "./sevenSegments";
import styles from '../page.module.scss';
import clsx from "clsx";

const MeasurementStep = ({
  appliedTorque,
  setAppliedTorque,
  resultado,
  evaluar,
  guardar,
  limpiar,
  mostrarEscaner,
  setMostrarEscaner,
}: any) => {
  return (
    <div className={styles["step-card"]}>
      <h2>PASO 4: INGRESAR TORQUE APLICADO Y EVALUAR</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label htmlFor="">Torque aplicado (N·m):</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
            <input
              style={{ width: "200px" }}
              type="number"
              step="0.001"
              value={appliedTorque?.toString() || ""}
              onChange={(e) =>
                setAppliedTorque(parseFloat(e.target.value) || 0)
              }
            />

            <button
            type="button"
              className={styles["btn-small"]}
              onClick={() => setMostrarEscaner(true)}
              style={{
                background: "#004a8f",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "0 15px",
              }}
            >
              📷 Leer display
            </button>
          </div>
        </div>

        <button
          className={clsx(styles["btn"], styles["btn-primary"])}
          onClick={evaluar}
        >
          Evaluar
        </button>
      </div>

      {mostrarEscaner && (
        <EscanerSieteSegmentos
          onClose={() => setMostrarEscaner(false)}
          onCapture={(valor: string) => {
            setAppliedTorque(parseFloat(valor));
            setMostrarEscaner(false);
          }}
        />
      )}

      {/* {resultado !== null && (
        <div className={styles["resultBox"]}>
          <div className={resultado ? styles.resultOk : styles.resultNok}>                
            {resultado ? "OK" : "NOK"}
          </div>
        </div>
      )} */}
      {/* {resultado !== null && (
        <div className={styles.resultBox}>
          <div className={resultado ? styles.resultOk : styles.resultNok}>
            {resultado ? "Dentro de tolerancia" : "Fuera de tolerancia"}
          </div>
        </div>
      )} */}

      {resultado && (
        <div className={styles.resultBox}>
          <div className={`result-status ${resultado ? "ok" : "nok"}`}>
            {resultado
              ? "✅ DENTRO DE TOLERANCIA"
              : "❌ FUERA DE TOLERANCIA"}
          </div>
          <div className="result-diff">
          </div>
        </div>
      )}

      {/* <div style={{ marginTop: "20px" }}>
          <label>Observaciones:</label>
          <textarea
          rows={2}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid #c2d9f0",
          }}
        />
      </div> */}

      <div className={styles["btn-group"]}>
        <button
          className={clsx(styles["btn"], styles["btn-primary"])}
          disabled={!resultado}
          onClick={guardar}
        >
          Guardar
        </button>

        <button
          className={clsx(styles["btn"], styles["btn-warning"])}
          onClick={limpiar}
        >
          Limpiar
        </button>
      </div>


      

    </div>
  );
};

export default MeasurementStep;