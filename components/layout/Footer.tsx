import { Container } from "./Container";

/** Catatan sumber data — sengaja dipertahankan sebagai konteks rate. */
export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-4">
      <Container>
        <p className="text-center text-xs text-slate-500">
          Sumber rate:{" "}
          <code className="rounded bg-slate-50 px-1.5 py-0.5">
            Mock Trip.com API
          </code>{" "}
          ·{" "}
          <code className="rounded bg-slate-50 px-1.5 py-0.5">
            GET /api/hotels
          </code>
        </p>
      </Container>
    </footer>
  );
}
