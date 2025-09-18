"use client";
import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useMemo } from "react";


export default function WorldMap({
  dots = [
    {
      start: { lat: 16.5062, lng: 80.6480 }, // Vijayawada
      end: { lat: 16.5062, lng: 80.6480 },   // Same point (pulse only)
    },
  ],
  lineColor = "#dd4848ffff",
}) {
  const svgRef = useRef(null);

  // ✅ This is INSIDE the function now
  const svgMap = useMemo(() => {
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  return map.getSVG({
    radius: 0.22,
    color: "#FFFFFF40",
    shape: "circle",
    backgroundColor: "black",
  });
}, []);


  // Convert lat/lng → x/y
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
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
        {dots.map((dot, i) => (
          <g key={`dot-${i}`}>
            <circle
              cx={projectPoint(dot.start.lat, dot.start.lng).x}
              cy={projectPoint(dot.start.lat, dot.start.lng).y}
              r="3"
              fill={lineColor}
            />
            <circle
              cx={projectPoint(dot.start.lat, dot.start.lng).x}
              cy={projectPoint(dot.start.lat, dot.start.lng).y}
              r="3"
              fill={lineColor}
              opacity="0.5"
            >
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
        ))}
      </svg>
    </div>
  );
}
