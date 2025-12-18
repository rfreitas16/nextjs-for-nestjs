import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { postsTable } from './schemas';
import { drizzleDb } from '.';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  console.log(posts);
  try {
    await drizzleDb.delete(postsTable); //deleta tudo da base de dados
    await drizzleDb.insert(postsTable).values(posts);
  } catch (e) {
    console.log('ocorreu um erro na conexao com o db');
    console.log(e);
  }
})();
