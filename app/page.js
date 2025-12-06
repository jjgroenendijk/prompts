import { getAllSnippets } from '@/lib/snippets';
import config from '@/lib/config';
import { getCreateUrl, getConfigUrl } from '@/lib/github';
import MainPage from '@/components/MainPage';

export default function Page() {
  const snippets = getAllSnippets();
  
  return (
    <MainPage 
      initialSnippets={snippets} 
      config={config}
      urls={{
        create: getCreateUrl(),
        config: getConfigUrl()
      }}
    />
  );
}
