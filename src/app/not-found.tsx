import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Pagina nao encontrada'
      contentTitle='Erro 404 😓'
      content='A pagina que voce esta tentando acessar nao existe'
    />
  );
}
