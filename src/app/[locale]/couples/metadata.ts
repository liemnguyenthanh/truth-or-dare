import { generateMetadata as generateMetadataFn } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return generateMetadataFn(params.locale as 'vi' | 'en' | 'es');
}
