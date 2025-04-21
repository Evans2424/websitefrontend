"use client";

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

export default function NavBarWrapper() {
  const pathname = usePathname();
  // Don't render the NavBar if we're in the admin section or member area
  const isAdminPage = pathname?.startsWith('/admin');
  const isMemberAreaPage = pathname?.startsWith('/area-membros');
  
  if (isAdminPage || isMemberAreaPage) {
    return null;
  }
  
  return <NavBar />;
}