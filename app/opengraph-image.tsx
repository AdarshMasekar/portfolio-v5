import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adarsh Masekar — Technical Support Specialist at Smartsheet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid lines decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "100%",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
            }}
          />
          <span style={{ color: "#6b7280", fontSize: "16px", letterSpacing: "0.1em" }}>
            PORTFOLIO
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "20px",
            display: "flex",
          }}
        >
          Adarsh Masekar
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "32px",
            color: "#9ca3af",
            fontWeight: 400,
            marginBottom: "12px",
            display: "flex",
          }}
        >
          Technical Support Specialist
        </div>

        {/* Company */}
        <div
          style={{
            fontSize: "28px",
            color: "#3b82f6",
            fontWeight: 500,
            marginBottom: "48px",
            display: "flex",
          }}
        >
          @ Smartsheet
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Enterprise B2B SaaS", "API Debugging", "Root Cause Analysis"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  color: "#d1d5db",
                  fontSize: "16px",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#4b5563",
            fontSize: "16px",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          adarshmasekar.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
