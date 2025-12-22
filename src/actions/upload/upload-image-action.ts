'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await getLoginSessionForApi();
  if (!isAuthenticated) {
    return makeResult({ error: 'Faca login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados invalidos' });
  }
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo invalidos' });
  }
  const uploadMaxSize = Number(process.env.IMAGE_UPLOAD_MAX_SIZE) || 921600;
  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'arquivo muito grande' });
  }
  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem invalida' });
  }
  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );
  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makeResult({ url });
}
