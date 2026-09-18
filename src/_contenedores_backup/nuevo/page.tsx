export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { getNavieras, getClientes, getPuertos, createContenedor } from '@/lib/actions';

export default async function NuevoContenedorPage() {
  // Obtenemos los catálogos para llenar las listas desplegables
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
          <h1>Alta de Contenedor</h1>
          <p>Sistema Central - TYR Cargo</p>
        </div>
      </header>

      <main>
        <Link href="/" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Volver al Inicio</Link>

        <div className={styles.card}>
          <h2 className={styles.heading}>Registrar Nuevo Contenedor</h2>
          
          <form action={createContenedor}>
            <div className={styles.grid}>
              
              {/* Información General */}
              <div className={styles.formGroup}>
                <label htmlFor="folioInterno">Folio Interno / BL Master</label>
                <input type="text" id="folioInterno" name="folioInterno" className={styles.input} required placeholder="Ej: BL-12345" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="referencia">Referencia Interna (MLC)</label>
                <input type="text" id="referencia" name="referencia" className={styles.input} required placeholder="Ej: MLC-26164" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bl">BL Hijo (Opcional)</label>
                <input type="text" id="bl" name="bl" className={styles.input} placeholder="Opcional" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="diasLibres">Días Libres Iniciales</label>
                <input type="number" id="diasLibres" name="diasLibres" className={styles.input} required defaultValue="21" />
              </div>

              {/* Catálogos */}
              <div className={styles.formGroup}>
                <label htmlFor="clienteId">Cliente</label>
                <select id="clienteId" name="clienteId" className={styles.select} required>
                  <option value="">Selecciona un cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="navieraId">Naviera</label>
                <select id="navieraId" name="navieraId" className={styles.select} required>
                  <option value="">Selecciona una naviera...</option>
                  {navieras.map(n => (
                    <option key={n.id} value={n.id}>{n.nombre}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="puertoId">Puerto de Arribo</label>
                <select id="puertoId" name="puertoId" className={styles.select} required>
                  <option value="">Selecciona un puerto...</option>
                  {puertos.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className={styles.buttonContainer}>
              <Link href="/" className={styles.cancelButton}>Cancelar</Link>
              <button type="submit" className={styles.button}>Guardar Contenedor</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}


