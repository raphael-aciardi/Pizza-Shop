import { Link, useRouteError } from "react-router-dom";

export function Error() {

    const error = useRouteError() as Error 

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Whoops, algo aconteceu...</h1>
      <p>Ocorreu um erro inesperado, abaixo você encontra mais detalhes</p>
      <pre>{error?.message} || JSON.stringify(error)</pre>
      <p className="text-accent-foreground">
        Voltar para o <Link to="http://localhost:5173" className="text-sky-600 dark:text-sky-400">Dashboard</Link>
      </p>
    </div>
  )
}