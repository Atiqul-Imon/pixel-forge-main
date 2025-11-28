import { Metadata } from 'next';
import { metadata as doctorMetadata } from './metadata';
import DoctorSolutionStructuredData from '@/components/DoctorSolutionStructuredData';

export const metadata: Metadata = doctorMetadata;

export default function DoctorSolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DoctorSolutionStructuredData />
      {children}
    </>
  );
}

