'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Helpers para fechas
function calcularDias(fechaArribo: Date | null): number {
  if (!fechaArribo) return 0;
  const hoy = new Date();
  const diffTime = Math.abs(hoy.getTime() - fechaArribo.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function calcularSemaforo(diasTranscurridos: number, diasLibres: number): string {
  if (diasTranscurridos >= diasLibres) return "Demora";
  if (diasTranscurridos >= diasLibres - 3) return "Precaución";
  return "A Tiempo";
}

// Navieras
export async function getNavieras() {
  return await prisma.naviera.findMany({ orderBy: { nombre: 'asc' } });
}

export async function createNaviera(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  if (nombre) {
    await prisma.naviera.create({ data: { nombre: nombre.toString() } });
    revalidatePath('/catalogos');
  }
}

// Clientes
export async function getClientes() {
  return await prisma.cliente.findMany({ orderBy: { nombre: 'asc' } });
}

export async function createCliente(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  if (nombre) {
    await prisma.cliente.create({ data: { nombre: nombre.toString() } });
    revalidatePath('/catalogos');
  }
}

// Puertos
export async function getPuertos() {
  return await prisma.puerto.findMany({ orderBy: { nombre: 'asc' } });
}

export async function createPuerto(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  if (nombre) {
    await prisma.puerto.create({ data: { nombre: nombre.toString() } });
    revalidatePath('/catalogos');
  }
}

// Contenedores
export async function getContenedores() {
  const contenedores = await prisma.contenedor.findMany({
    include: { naviera: true, cliente: true, puerto: true },
    orderBy: { createdAt: 'desc' }
  });

  // Calculamos el semáforo al vuelo para que siempre esté actualizado
  return contenedores.map(c => {
    const diasTranscurridos = calcularDias(c.fechaArribo);
    const estadoReal = calcularSemaforo(diasTranscurridos, c.diasLibres);
    return { ...c, diasTranscurridos, estadoSemaforo: c.fechaArribo ? estadoReal : "Pendiente Arribo" };
  });
}

export async function getContenedorById(id: number) {
  const c = await prisma.contenedor.findUnique({
    where: { id },
    include: { naviera: true, cliente: true, puerto: true }
  });

  if (!c) return null;

  const diasTranscurridos = calcularDias(c.fechaArribo);
  const estadoReal = calcularSemaforo(diasTranscurridos, c.diasLibres);
  return { ...c, diasTranscurridos, estadoSemaforo: c.fechaArribo ? estadoReal : "Pendiente Arribo" };
}

export async function createContenedor(formData: FormData) {
  const folioInterno = formData.get('folioInterno') as string;
  const referencia = formData.get('referencia') as string;
  const bl = formData.get('bl') as string;
  const navieraId = parseInt(formData.get('navieraId') as string);
  const clienteId = parseInt(formData.get('clienteId') as string);
  const puertoId = parseInt(formData.get('puertoId') as string);
  const diasLibres = parseInt(formData.get('diasLibres') as string);

  await prisma.contenedor.create({
    data: {
      folioInterno,
      referencia,
      bl,
      navieraId,
      clienteId,
      puertoId,
      diasLibres: isNaN(diasLibres) ? 0 : diasLibres,
      estadoSemaforo: "Pendiente Arribo"
    }
  });

  revalidatePath('/');
  redirect('/');
}

export async function updateContenedor(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  
  const fArribo = formData.get('fechaArribo') as string;
  const fReval = formData.get('fechaRevalidacion') as string;
  const fPrevio = formData.get('fechaPrevio') as string;
  const fDespacho = formData.get('fechaDespacho') as string;

  await prisma.contenedor.update({
    where: { id },
    data: {
      fechaArribo: fArribo ? new Date(fArribo + "T12:00:00") : null,
      fechaRevalidacion: fReval ? new Date(fReval + "T12:00:00") : null,
      fechaPrevio: fPrevio ? new Date(fPrevio + "T12:00:00") : null,
      fechaDespacho: fDespacho ? new Date(fDespacho + "T12:00:00") : null,
    }
  });

  revalidatePath(`/contenedores/${id}`);
  revalidatePath('/');
  redirect('/');
}
