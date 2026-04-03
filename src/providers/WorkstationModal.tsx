'use client';

import { useState } from 'react';
import styles from './WorkstationModal.module.scss';

interface Props {
  onSuccess: (workstation: any) => void;
}

export const WorkstationModal: React.FC<Props> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    if (!code) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/v1/workstations/code/${code}`);

      if (!res.ok) {
        throw new Error('Workstation inválido');
      }

      const data = await res.json();

      // guardar en cookie
      // document.cookie = `workstation=${JSON.stringify(data)}; path=/`;
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      document.cookie =
        'workstation=' +
        JSON.stringify(data) +
        '; path=/; expires=' +
        expires.toUTCString() +
        '; SameSite=Strict';

      onSuccess(data);

    } catch (err) {
      setError('Código inválido o no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        
        <h2>Seleccionar estación de trabajo</h2>
        <p>Ingresa el código del workstation</p>

        <input
          type="text"
          placeholder="Ej: WS-01"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button onClick={handleValidate} disabled={loading}>
          {loading ? 'Validando...' : 'Ingresar'}
        </button>

      </div>
    </div>
  );
};