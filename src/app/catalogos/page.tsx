import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { getNavieras, createNaviera, getClientes, createCliente, getPuertos, createPuerto } from '@/lib/actions';

export default async function CatalogosPage() {
  const navieras = await getNavieras();
  const clientes = await getClientes();
  const puertos = await getPuertos();

  return (
    <div className="container">
      <header className="header">
        <Link href="/">
          <Image src="/logo.png" alt="TYR Cargo Logo" width={180} height={80} style={{ objectFit: 'contain' }} />
        </Link>
        <div>
          <h1>Administración de Catálogos</h1>
          <p>Sistema Central - TYR Cargo</p>
        </div>
      </header>

      <main>
        <Link href="/" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Volver al Inicio</Link>
        
        <div className={styles.grid}>
          {/* Navieras */}
          <div className={styles.card}>
            <h2 className={styles.heading}>Navieras</h2>
            <form action={createNaviera} className={styles.formGroup}>
              <input type="text" name="nombre" placeholder="Nueva naviera..." className={styles.input} required />
              <button type="submit" className={styles.button}>Agregar</button>
            </form>
            <ul className={styles.list}>
              {navieras.length === 0 ? <li className={styles.listItem}>No hay navieras.</li> : null}
              {navieras.map(n => (
                <li key={n.id} className={styles.listItem}>{n.nombre}</li>
              ))}
            </ul>
          </div>

          {/* Clientes */}
          <div className={styles.card}>
            <h2 className={styles.heading}>Clientes</h2>
            <form action={createCliente} className={styles.formGroup}>
              <input type="text" name="nombre" placeholder="Nuevo cliente..." className={styles.input} required />
              <button type="submit" className={styles.button}>Agregar</button>
            </form>
            <ul className={styles.list}>
              {clientes.length === 0 ? <li className={styles.listItem}>No hay clientes.</li> : null}
              {clientes.map(c => (
                <li key={c.id} className={styles.listItem}>{c.nombre}</li>
              ))}
            </ul>
          </div>

          {/* Puertos */}
          <div className={styles.card}>
            <h2 className={styles.heading}>Puertos</h2>
            <form action={createPuerto} className={styles.formGroup}>
              <input type="text" name="nombre" placeholder="Nuevo puerto..." className={styles.input} required />
              <button type="submit" className={styles.button}>Agregar</button>
            </form>
            <ul className={styles.list}>
              {puertos.length === 0 ? <li className={styles.listItem}>No hay puertos.</li> : null}
              {puertos.map(p => (
                <li key={p.id} className={styles.listItem}>{p.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
