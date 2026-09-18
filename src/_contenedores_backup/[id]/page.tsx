export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { getContenedorById, updateContenedor } from '@/lib/actions';

export default async function ExpedientePage({ params }: { params: { id: string } }) {
  // En Next.js recientes params es una promesa
  const resolvedParams = await Promise.resolve(params);
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) return notFound();

  const contenedor = await getContenedorById(id);
  if (!contenedor) return notFound();

  // Helper para mostrar la fecha en formato YYYY-MM-DD para el input type="date"
  const formatYMD = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="container">
      <header className="header">
        <Link href="/">
          <Image src="/logo.png" alt="TYR Cargo Logo" width={180} height={80} style={{ objectFit: 'contain' }} />
        </Link>
        <div>
          <h1>Expediente: {contenedor.referencia}</h1>
          <p>Folio: {contenedor.folioInterno}</p>
        </div>
      </header>

      <main>
        <Link href="/" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Volver al Inicio</Link>

        <div className={styles.grid}>
          
          {/* Tarjeta de Resumen Izquierda */}
          <div className={styles.summaryCard}>
            <h2 className={styles.heading}>Datos Generales</h2>
            
            <div className={styles.infoRow}>
              <strong>Cliente:</strong> <span>{contenedor.cliente.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Naviera:</strong> <span>{contenedor.naviera.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Puerto:</strong> <span>{contenedor.puerto.nombre}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>BL Hijo:</strong> <span>{contenedor.bl || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Días Libres:</strong> <span>{contenedor.diasLibres}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Días Transcurridos:</strong> <span>{contenedor.diasTranscurridos}</span>
            </div>

            <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>Estado Actual</h3>
            <span className={styles.badge} style={{ 
              backgroundColor: contenedor.estadoSemaforo === 'Demora' ? '#dc3545' : contenedor.estadoSemaforo === 'Precaución' ? '#ffc107' : contenedor.estadoSemaforo === 'Pendiente Arribo' ? '#6c757d' : '#28a745', 
              color: (contenedor.estadoSemaforo === 'Precaución' || contenedor.estadoSemaforo === 'Pendiente Arribo') ? '#000' : '#fff' 
            }}>
              {contenedor.estadoSemaforo.toUpperCase()}
            </span>
          </div>

          {/* Formulario de Fechas Derecha */}
          <div className={styles.formCard}>
            <h2 className={styles.heading}>Actualizar Tiempos</h2>
            <form action={updateContenedor}>
              <input type="hidden" name="id" value={contenedor.id} />

              <div className={styles.formGroup}>
                <label htmlFor="fechaArribo">Fecha de Arribo al Puerto</label>
                <input type="date" id="fechaArribo" name="fechaArribo" className={styles.input} defaultValue={formatYMD(contenedor.fechaArribo)} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fechaRevalidacion">Fecha de Revalidación</label>
                <input type="date" id="fechaRevalidacion" name="fechaRevalidacion" className={styles.input} defaultValue={formatYMD(contenedor.fechaRevalidacion)} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fechaPrevio">Fecha de Previo</label>
                <input type="date" id="fechaPrevio" name="fechaPrevio" className={styles.input} defaultValue={formatYMD(contenedor.fechaPrevio)} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fechaDespacho">Fecha de Despacho / Salida</label>
                <input type="date" id="fechaDespacho" name="fechaDespacho" className={styles.input} defaultValue={formatYMD(contenedor.fechaDespacho)} />
              </div>

              <button type="submit" className={styles.button}>Guardar Cambios</button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

