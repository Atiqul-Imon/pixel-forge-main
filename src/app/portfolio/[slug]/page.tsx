import { redirect } from 'next/navigation';

/**
 * Legacy case-study URLs: send visitors to the generic solutions page.
 */
export default async function LegacyCaseStudyRedirect({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  redirect('/portfolio');
}
