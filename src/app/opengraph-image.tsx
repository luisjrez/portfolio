import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#090d12",
          backgroundImage:
            "linear-gradient(rgba(0,230,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,138,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              border: "3px solid #00e68a",
              color: "#00e68a",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            LJ
          </div>
          <div style={{ color: "#00e68a", fontSize: "26px" }}>
            {profile.availability}
          </div>
        </div>
        <div
          style={{
            color: "#f1f5f9",
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div style={{ color: "#00e68a", fontSize: "40px", marginTop: "12px" }}>
          {`> ${profile.role}`}
        </div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: "26px",
            marginTop: "28px",
            maxWidth: "900px",
          }}
        >
          10+ years shipping React & React Native · full-stack · AI-powered
          products
        </div>
      </div>
    ),
    { ...size },
  );
}
