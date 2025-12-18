import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const minhaSenha = 'SUA_SENHA_AQUI'; // qualquer coisa que por aqui vira um hash
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);
  console.log({ hashDaSuaSenhaEmBase64 });
})();
