'use client';
import { useState, useEffect } from 'react';
import LandingDesktop from '@/components/LandingDesktop';
import LandingMobile from '@/components/LandingMobile';

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <LandingMobile />;
  }
  return <LandingDesktop />;
}
