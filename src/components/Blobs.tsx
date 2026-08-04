/** Soft ambient gradient blobs — pure CSS, no repaint cost while scrolling. */
export default function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="blob blob-d" />
    </div>
  );
}
