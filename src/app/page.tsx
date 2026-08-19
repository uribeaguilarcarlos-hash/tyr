import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <Image src="/logo.png" alt="TYR Cargo Logo" width={80} height={80} style={{ borderRadius: '8px', backgroundColor: 'white', padding: '5px' }} />
        <div>
          <h1>Listado de Contenedores 2026</h1>
          <p>Sistema Central - TYR Cargo</p>
        </div>
      </header>

      <main className="card">
        <h2>Últimos Movimientos</h2>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Naviera</th>
                <th>Días Libres</th>
                <th>Días Transcurridos</th>
                <th>Estado (Semáforo)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Ejemplo estático por ahora */}
              <tr>
                <td>MLC-26164</td>
                <td>COSCO</td>
                <td>21</td>
                <td>5</td>
                <td>
                  <span className={styles.statusCell} style={{ backgroundColor: 'var(--status-green)' }}>
                    A Tiempo
                  </span>
                </td>
                <td>
                  <button style={{ padding: '6px 12px', cursor: 'pointer' }}>Notificar</button>
                </td>
              </tr>
              <tr>
                <td>MLC-26165</td>
                <td>MSC</td>
                <td>14</td>
                <td>12</td>
                <td>
                  <span className={styles.statusCell} style={{ backgroundColor: 'var(--status-yellow)' }}>
                    Precaución
                  </span>
                </td>
                <td>
                  <button style={{ padding: '6px 12px', cursor: 'pointer' }}>Notificar</button>
                </td>
              </tr>
              <tr>
                <td>MLC-26166</td>
                <td>HAPAG</td>
                <td>10</td>
                <td>15</td>
                <td>
                  <span className={styles.statusCell} style={{ backgroundColor: 'var(--status-red)', color: 'white' }}>
                    Demora
                  </span>
                </td>
                <td>
                  <button style={{ padding: '6px 12px', cursor: 'pointer' }}>Notificar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
