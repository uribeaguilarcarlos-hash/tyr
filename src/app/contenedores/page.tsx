import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { getContenedores } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const contenedores = await getContenedores();

  return (
    <div className="container">
      <header className="header">
        <Image src="/logo.png" alt="TYR Cargo Logo" width={180} height={80} style={{ objectFit: 'contain' }} />
        <div>
          <h1>Listado de Contenedores 2026</h1>
          <p>Sistema Central - TYR Cargo</p>
        </div>
      </header>

      <main className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Últimos Movimientos</h2>
          <div>
            <Link href="/catalogos" style={{ backgroundColor: '#fff', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', marginRight: '10px' }}>
              Catálogos
            </Link>
            <Link href="/contenedores/nuevo" style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
              + Registrar Contenedor
            </Link>
          </div>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Naviera</th>
                <th>Días Libres</th>
                <th>Puerto</th>
                <th>Estado (Semáforo)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contenedores.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No hay contenedores registrados. Registra uno nuevo.</td>
                </tr>
              ) : null}
              {contenedores.map(c => (
                <tr key={c.id}>
                  <td>{c.referencia}</td>
                  <td>{c.naviera.nombre}</td>
                  <td>{c.diasLibres}</td>
                  <td>{c.puerto.nombre}</td>
                  <td>
                    <span className={styles.statusCell} style={{ backgroundColor: c.estadoSemaforo === 'Demora' ? '#dc3545' : c.estadoSemaforo === 'Precaución' ? '#ffc107' : '#28a745', color: c.estadoSemaforo === 'Precaución' ? '#000' : '#fff', display: 'inline-block' }}>
                      {c.estadoSemaforo}
                    </span>
                  </td>
                  <td>
                    <Link href={`/contenedores/${c.id}`} className={styles.actionButton} style={{ textDecoration: 'none', display: 'inline-block' }}>
                      Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
