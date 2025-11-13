import { Metadata } from 'next';
import { metadata as posMetadata } from './metadata';

export const metadata: Metadata = posMetadata;

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

