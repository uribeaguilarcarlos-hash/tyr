import { headers } from 'next/headers';
import LandingDesktop from '@/components/LandingDesktop';
import LandingMobile from '@/components/LandingMobile';

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return <LandingMobile />;
  }
  return <LandingDesktop />;
}
