import { Metadata } from 'next';
import { metadata as doctorMetadata } from './metadata';
import DoctorSolutionStructuredData from '@/components/DoctorSolutionStructuredData';
import DoctorSolutionPixel from '@/components/DoctorSolutionPixel';

export const metadata: Metadata = doctorMetadata;

export default function DoctorSolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DoctorSolutionStructuredData />
      <DoctorSolutionPixel 
        pixelId={process.env.NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID'} 
      />
      {children}
    </>
  );
}

