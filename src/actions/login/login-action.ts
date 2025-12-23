'use server';

import { createLoginSessionFromApi } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { verifyHoneypotInput } from '@/utils/verify-honeypot-input';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login allowed'],
    };
  }
  await asyncDelay(5000); // Vou manter

  const isBot = await verifyHoneypotInput(formData, 5000);

  if (isBot) {
    return {
      email: '',
      errors: ['nice'],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados Invalidos'],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const forEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: forEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );
  if (!loginResponse.success) {
    return {
      email: forEmail,
      errors: loginResponse.errors,
    };
  }
  console.log(loginResponse.data);

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect('/admin/post');
}
