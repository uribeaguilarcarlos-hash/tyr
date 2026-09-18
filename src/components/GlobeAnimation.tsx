'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeAnimation({ interactive = true }: { interactive?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    // Cargar geojson para la silueta de los continentes
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => setCountries(data.features));
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Configuraciones originales que funcionaban bien
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.pointOfView({ lat: 20, lng: -100, altitude: 2.2 });
      if (!interactive) {
        globeEl.current.controls().enableZoom = false;
        globeEl.current.controls().enableRotate = false;
        globeEl.current.controls().enablePan = false;
      }
    }
  }, [mounted]);

  if (!mounted) return <div style={{ height: '400px', width: '100%' }} />;

  const places = [
    { name: 'Manzanillo', lat: 19.0535, lng: -104.3160, size: 0.4, color: '#23acdd' }, 
    { name: 'Veracruz', lat: 19.1738, lng: -96.1342, size: 0.4, color: '#23acdd' },
    { name: 'Laredo', lat: 27.5064, lng: -99.5075, size: 0.4, color: '#23acdd' },
    { name: 'Lázaro Cárdenas', lat: 17.9554, lng: -102.1957, size: 0.4, color: '#23acdd' },
    { name: 'Panama', lat: 8.9824, lng: -79.5199, size: 0.2, color: '#ffffff' },
    { name: 'New York', lat: 40.7128, lng: -74.0060, size: 0.2, color: '#ffffff' },
    { name: 'Shanghai', lat: 31.2304, lng: 121.4737, size: 0.2, color: '#ffffff' },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, size: 0.2, color: '#ffffff' },
    { name: 'Rotterdam', lat: 51.9225, lng: 4.4791, size: 0.2, color: '#ffffff' },
    { name: 'Xiamen', lat: 24.4798, lng: 118.0894, size: 0.2, color: '#ffffff' },
    { name: 'Ningbo', lat: 29.8683, lng: 121.5439, size: 0.2, color: '#ffffff' },
    { name: 'Busan', lat: 35.1796, lng: 129.0756, size: 0.2, color: '#ffffff' },
  ];

  const arcsData = [
    { startLat: 31.2304, startLng: 121.4737, endLat: 19.0535, endLng: -104.3160, color: ['#ffffff', '#23acdd'] },
    { startLat: 34.0522, startLng: -118.2437, endLat: 19.0535, endLng: -104.3160, color: ['#ffffff', '#23acdd'] },
    { startLat: 51.9225, startLng: 4.4791, endLat: 19.1738, endLng: -96.1342, color: ['#ffffff', '#23acdd'] },
    { startLat: 34.0522, startLng: -118.2437, endLat: 27.5064, endLng: -99.5075, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 8.9824, startLng: -79.5199, endLat: 19.1738, endLng: -96.1342, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 40.7128, startLng: -74.0060, endLat: 27.5064, endLng: -99.5075, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 31.2304, startLng: 121.4737, endLat: 34.0522, endLng: -118.2437, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 24.4798, startLng: 118.0894, endLat: 17.9554, endLng: -102.1957, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 29.8683, startLng: 121.5439, endLat: 19.0535, endLng: -104.3160, color: ['#ffffff', '#23acdd'] }, 
    { startLat: 35.1796, startLng: 129.0756, endLat: 17.9554, endLng: -102.1957, color: ['#ffffff', '#23acdd'] }, 
  ];

  return (
    <div 
      style={{ width: '100%', display: 'flex', justifyContent: 'center', cursor: 'default', zIndex: 10 }}
      onWheelCapture={(e) => {
        // Detener la propagación del evento wheel para que react-globe.gl no lo escuche y no haga zoom,
        // pero sin hacer e.preventDefault() para que el navegador sí pueda hacer scroll de la página.
        e.stopPropagation();
      }}
    >
      <Globe
        ref={globeEl}
        width={Math.min(window.innerWidth - 40, 500)}
        height={Math.min(window.innerWidth - 40, 500)}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={false} 
        showAtmosphere={true}
        atmosphereColor="#23acdd"
        atmosphereAltitude={0.15}
        polygonsData={countries}
        polygonCapColor={() => 'rgba(35, 172, 221, 0.2)'} // Cian translúcido
        polygonSideColor={() => 'rgba(35, 172, 221, 0.05)'}
        polygonStrokeColor={() => '#23acdd'} // Bordes cyan
        pointsData={places}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius="size"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcsTransitionDuration={0}
        arcStroke={1}
      />
    </div>
  );
}


