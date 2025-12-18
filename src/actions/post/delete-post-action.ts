'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      error: 'Faca login novamente em outra aba',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados invalidos',
    };
  }

  let post;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: 'Erro desconhecido',
    };
  }
  return {
    error: '',
  };
}
