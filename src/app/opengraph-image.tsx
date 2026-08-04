import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fafaff 0%, #ede9fe 55%, #cffafe 100%)",
          color: "#17103a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(8,145,178,0.2), transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#0891b2", display: "flex" }}>
          {profile.role.toUpperCase()}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16, display: "flex" }}>{profile.name}</div>
        <div style={{ fontSize: 32, color: "#4b4a63", marginTop: 20, maxWidth: 900, display: "flex" }}>
          {profile.tagline}
        </div>
        <div style={{ fontSize: 24, color: "#7c3aed", marginTop: 48, display: "flex" }}>
          github.com/yashsharma499
        </div>
      </div>
    ),
    size
  );
}
