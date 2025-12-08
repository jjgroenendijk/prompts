import { getAllSnippets } from '@/lib/snippets';
import { getCachedConfig } from '@/lib/config';
import { getCreateUrl, getConfigUrl, ensureConfig } from '@/lib/github';
import MainPage from '@/components/MainPage';

export default async function Page() {
  // Load config first
  const config = await getCachedConfig();

  // Ensure github module has config
  await ensureConfig();

  // Get all snippets
  const snippets = await getAllSnippets(config);

  return (
    <MainPage
      initialSnippets={snippets}
      config={config}
      urls={{
        create: getCreateUrl(null, config),
        config: getConfigUrl(config)
      }}
    />
  );
}
