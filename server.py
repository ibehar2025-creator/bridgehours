import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


PUBLIC_DIR = Path(__file__).parent / "public"


class StaticHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)


def main() -> None:
    host = "0.0.0.0"
    port = int(os.environ.get("PORT", "8000"))
    with ThreadingHTTPServer((host, port), StaticHandler) as server:
        print(f"BridgeHours starter site running at http://{host}:{port}")
        server.serve_forever()


if __name__ == "__main__":
    main()
