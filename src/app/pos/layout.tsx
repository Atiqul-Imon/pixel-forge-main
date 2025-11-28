import { Metadata } from 'next';
import { metadata as posMetadata } from './metadata';
import POSStructuredData from '@/components/POSStructuredData';

export const metadata: Metadata = posMetadata;

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <POSStructuredData />
      {children}
    </>
  );
}

