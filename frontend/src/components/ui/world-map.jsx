"use client";
import { useRef, useMemo } from "react";

import DottedMap from "dotted-map";

export default function WorldMap({
  dots = [
    {
      start: { lat: 16.5062, lng: 80.6480 }, // Vijayawada
      // Same point (pulse only)
       },
      ],
      lineColor = "#0ea5e9",
    }) {
  const svgRef = useRef(null);

  // Create map once
  const map = useMemo(() => new DottedMap({ height: 50, grid: "diagonal" }), []);

  // Generate the base map SVG
  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.22,
      color: "#FFFDD0",
      shape: "circle",
      backgroundColor: "black",
    });
  }, [map]);

  // ✅ Manual projection
  const projectPoint = (lat, lng) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  return (
    <div className="w-full h-full bg-black relative font-sans">
      {/* Base dotted map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-cover pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />

      {/* Overlay dots */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const { x, y } = projectPoint(dot.start.lat, dot.start.lng);
          return (
            <g key={`dot-${i}`}>
              <circle cx={x} cy={y} r="3" fill={lineColor} />
              <circle cx={x} cy={y} r="3" fill={lineColor} opacity="0.5">
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
