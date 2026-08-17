/**
 * Soft ambient gradient blobs — pure CSS, no repaint cost while scrolling.
 * Deep layer (e–g) sits underneath and carries the colour weight; the pastel
 * layer (a–d) floats over it on slower, offset cycles so the two drift apart
 * and recombine instead of moving as one mass.
 */
export default function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="blob blob-e" />
      <div className="blob blob-f" />
      <div className="blob blob-g" />
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="blob blob-d" />
    </div>
  );
}
