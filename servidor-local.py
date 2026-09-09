"""Servidor local simples para revisar o site das aulas."""

from argparse import ArgumentParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    """Serve os arquivos sem cache para facilitar a revisão de CSS e JavaScript."""

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main() -> None:
    parser = ArgumentParser(description="Inicia o site da disciplina localmente.")
    parser.add_argument("--porta", type=int, default=8000, help="porta HTTP (padrão: 8000)")
    parser.add_argument("--host", default="127.0.0.1", help="interface de rede (padrão: 127.0.0.1)")
    args = parser.parse_args()

    root = Path(__file__).resolve().parent
    handler = lambda *handler_args, **kwargs: NoCacheHandler(
        *handler_args,
        directory=str(root),
        **kwargs,
    )

    with ThreadingHTTPServer((args.host, args.porta), handler) as server:
        print(f"Site disponível em http://{args.host}:{args.porta}/", flush=True)
        print("Pressione Ctrl+C para encerrar.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")


if __name__ == "__main__":
    main()
