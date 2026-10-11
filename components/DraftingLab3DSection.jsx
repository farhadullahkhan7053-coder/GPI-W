"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Compass,
  Layers,
  Sparkles,
  RotateCw,
  Maximize2,
  Minimize2,
  Eye,
  Info,
  Camera,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  CheckCircle2,
  Scissors,
  Ruler,
  Box,
  Image as ImageIcon,
  Move3d,
  HelpCircle,
  X
} from "lucide-react";

// Hotspot definitions with 3D coordinates and rich educational metadata
const HOTSPOTS_DATA = [
  {
    id: "mannequins",
    title: "Dressmaker Mannequins & Covers",
    shortTitle: "Dress Forms",
    position: [-5.2, 1.6, -1.8],
    icon: Sparkles,
    tag: "GARMENT DRAPING & FITTING",
    summary:
      "Full lineup of adult (size 8–12) and pediatric/child dressmaker mannequins on adjustable metal stands, fitted with protective transparent plastic covers.",
    specs: [
      { label: "Form Sizes", value: "Adult S/M/L & Child Sizing" },
      { label: "Protection", value: "Dust-Proof Transparent Vinyl Wraps" },
      { label: "Application", value: "3D Draping, Moulage, Grain Alignment" },
      { label: "Base Support", value: "Heavy-Duty Cast Iron Pedestal & Tripod" }
    ],
    description:
      "Positioned along the studio's north wall, these padded calico dress forms allow female students to transform two-dimensional flat patterns into three-dimensional draped garments. The custom transparent covers prevent chalk dust, fabric dye transfer, and humidity from degrading the canvas pinnable core between practical training sessions.",
    cameraTarget: { pos: [-3.8, 1.8, -0.6], target: [-5.2, 1.4, -1.8] }
  },
  {
    id: "cutting-mats",
    title: "Drafting Tools & Cutting Mats",
    shortTitle: "Precision Tools",
    position: [-0.6, 1.15, 0.1],
    icon: Ruler,
    tag: "PATTERN ENGINEERING",
    summary:
      "Custom teal/blue-green self-healing cutting mats equipped with metric gridlines, L-square rulers, French curves, and meter sticks.",
    specs: [
      { label: "Mat Tech", value: "5-Layer Self-Healing Composite (A1 Size)" },
      { label: "Rulers", value: "L-Square 90°, Acrylic French Curves, Meter Rulers" },
      { label: "Grid Lines", value: "10mm Grid, 50mm Accent, 45°/60° Bias Guides" },
      { label: "Covering", value: "Transparent Protective Sleeve" }
    ],
    description:
      "Each student cutting station features high-grade self-healing cutting mats protected by clear plastic sleeves. Precision steel L-squares guarantee true right-angle hemlines and grainline truing, while acrylic French curves enable smooth drafting of armscye, neckline, and collar contours according to NAVTTC and TEVTA technical curricula.",
    cameraTarget: { pos: [0.0, 1.8, 1.4], target: [-0.6, 1.05, 0.1] }
  },
  {
    id: "worktables",
    title: "Ergonomic Layout Worktables",
    shortTitle: "Work Tables",
    position: [1.6, 1.15, -0.2],
    icon: Box,
    tag: "STUDIO ERGONOMICS",
    summary:
      "Sturdy long wooden-top cutting tables finished with terracotta steel aprons, paired with slatted wooden student chairs.",
    specs: [
      { label: "Dimensions", value: "4.2m Long × 1.8m Wide × 0.88m Height" },
      { label: "Construction", value: "Hardwood Top on Heavy Gauge Steel" },
      { label: "Seating", value: "Welded Steel Tubular Chairs with Writing Arms" },
      { label: "Capacity", value: "Multi-Station Practical Batches (25–30 Students)" }
    ],
    description:
      "Engineered specifically for the physical demands of pattern drafting and bulk textile layout. The 88cm elevated height prevents spinal strain during prolonged standing cutting operations, while integrated tablet chairs allow seamless switching between theoretical drafting lectures and hands-on pattern tracing.",
    cameraTarget: { pos: [2.8, 2.2, 1.8], target: [1.6, 0.9, -0.2] }
  },
  {
    id: "accessories",
    title: "Tailoring Accessories & Utility Kits",
    shortTitle: "Tailor Kits",
    position: [-1.4, 1.12, 0.25],
    icon: Scissors,
    tag: "WORKBENCH ACCESSORIES",
    summary:
      "Professional fabric shears, desk calculation units, blue utility component kits, and flexible vinyl measuring tapes.",
    specs: [
      { label: "Shears", value: "10-inch Stainless Steel Dressmaking Shears" },
      { label: "Measuring", value: "60-inch Fiberglass Measuring Tapes with Brass Tips" },
      { label: "Tool Kits", value: "Notchers, Tracing Wheels, Tailor's Chalk Boxes" },
      { label: "Scaling", value: "Desktop Ease Calculation Tools" }
    ],
    description:
      "Precision drafting requires exact ease tolerances and millimeter seam allowances. The dedicated blue utility kits contain rotary notchers, chalk markers, and tracing wheels, alongside heavy tailor shears that cut cleanly through multi-ply fabric without shifting pattern alignment.",
    cameraTarget: { pos: [-1.0, 1.5, 0.9], target: [-1.4, 1.0, 0.25] }
  },
  {
    id: "sunlight",
    title: "Natural Sunlight & Architecture",
    shortTitle: "Daylight Windows",
    position: [5.8, 2.3, 0.8],
    icon: Sun,
    tag: "STUDIO ARCHITECTURE",
    summary:
      "Large side-wall casement windows flooding the studio with natural daylight, complemented by smooth light-tinted walls.",
    specs: [
      { label: "Window Type", value: "Dual Casement with Outer Protective Screen" },
      { label: "Lighting", value: "Natural Diffused Daylight + Overhead Fluorescents" },
      { label: "Wall Finish", value: "Light-Tinted Smooth Reflective Plaster" },
      { label: "Flooring", value: "Polished High-Durability Terrazzo Concrete" }
    ],
    description:
      "Accurate color rendering, grainline inspection, and fine stitch tension require ample natural illumination. The expansive east-facing windows provide abundant, glare-free indirect sunlight throughout the academic day, reducing eye strain during intricate grading and pattern drafting sessions.",
    cameraTarget: { pos: [3.5, 2.2, 0.2], target: [6.2, 2.3, 0.8] }
  }
];

// High-resolution photo gallery items (3:2 aspect ratio, 1200 x 800)
const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/drafting-lab/lab_view_1.jpg",
    title: "Main Drafting Studio — Long Cutting Tables & Natural Sunlight",
    subtitle: "Drafting & Pattern Making Lab, GPIW D.I. Khan",
    description:
      "Wide-angle perspective showing the sturdy terracotta-framed wooden cutting tables equipped with blue-green cutting mats, straight rulers, L-squares, and dressmaker mannequins positioned along the light sky-blue walls. Natural daylight streams through the high-efficiency side casement windows.",
    tags: ["Cutting Tables", "Cutting Mats", "L-Square Rulers", "Natural Lighting", "Student Chairs"],
    specs: "Studio Center View • Full Student Workstation Setup"
  },
  {
    id: 2,
    src: "/drafting-lab/lab_view_2.jpg",
    title: "Pattern Layout & Draping Station — Dressmaker Forms & Charts",
    subtitle: "Draping & Pattern Development Area",
    description:
      "Detailed view highlighting the dressmaker mannequins draped in dust-proof transparent covers, mounted instructional pattern drafting charts, overhead studio lighting, and organized workstations prepared for practical vocational training.",
    tags: ["Dressmaker Mannequins", "Protective Covers", "Instructional Charts", "Utility Toolkits"],
    specs: "Wall Display View • Draping & Moulage Station"
  },
  {
    id: 3,
    src: "/drafting-lab/lab_view_3.jpg",
    title: "Panoramic Studio Perspective — Multi-Station Student Capacity",
    subtitle: "Full Lab Layout & Ergonomic Workspaces",
    description:
      "Comprehensive panoramic view illustrating the multi-station capacity of the GPIW D.I. Khan Drafting Studio. Showcases the alignment of cutting surfaces, ergonomic student tablet chairs, and organized precision instruments designed for simultaneous batch learning.",
    tags: ["Panoramic Layout", "Multi-Station Desk", "Precision Accessories", "Terrazzo Flooring"],
    specs: "Complete Studio View • Batch Capacity 30+ Students"
  }
];

// Procedural texture generators for photorealistic in-browser 3D rendering
function generateCuttingMatTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Deep teal/blue-green background matching photo
  ctx.fillStyle = "#125e5b";
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer border
  ctx.strokeStyle = "#4daaa7";
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, 976, 976);

  // 10mm minor grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1;
  for (let i = 40; i < 984; i += 20) {
    ctx.beginPath();
    ctx.moveTo(40, i);
    ctx.lineTo(984, i);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 40);
    ctx.lineTo(i, 984);
    ctx.stroke();
  }

  // 50mm major grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 2;
  for (let i = 40; i <= 984; i += 100) {
    ctx.beginPath();
    ctx.moveTo(40, i);
    ctx.lineTo(984, i);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 40);
    ctx.lineTo(i, 984);
    ctx.stroke();
  }

  // 45-degree and 60-degree bias lines
  ctx.strokeStyle = "rgba(255, 215, 0, 0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(984, 984);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(984, 40);
  ctx.lineTo(40, 984);
  ctx.stroke();

  // Branding text on cutting mat
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "bold 22px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GPIW D.I. KHAN • PROFESSIONAL DRAFTING MAT", 512, 70);

  ctx.font = "bold 16px Inter, sans-serif";
  ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
  ctx.fillText("SELF-HEALING 5-PLY METRIC CUTTING SURFACE", 512, 100);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function generateTerrazzoFloorTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Base terrazzo cement color
  ctx.fillStyle = "#d2d8dc";
  ctx.fillRect(0, 0, 1024, 1024);

  // Speckles / chips
  const colors = [
    "rgba(85, 98, 112, 0.6)",
    "rgba(255, 255, 255, 0.8)",
    "rgba(40, 50, 60, 0.5)",
    "rgba(165, 155, 140, 0.55)",
    "rgba(110, 125, 135, 0.4)"
  ];

  for (let i = 0; i < 4500; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 3.5 + 0.8;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Subtle tile expansion joint lines
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.lineWidth = 2;
  for (let x = 0; x <= 1024; x += 256) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 256) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function generateWallChartTexture(title, sub, diagramType) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Chart white paper board
  ctx.fillStyle = "#fafbfc";
  ctx.fillRect(0, 0, 512, 768);

  // Chart outer frame border
  ctx.strokeStyle = "#083e6b";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 492, 748);

  // Header band
  ctx.fillStyle = "#0a2540";
  ctx.fillRect(15, 15, 482, 90);

  ctx.fillStyle = "#f59e0b";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GOVERNMENT POLYTECHNIC INSTITUTE FOR WOMEN D.I. KHAN", 256, 45);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px Inter, sans-serif";
  ctx.fillText(title, 256, 80);

  // Subheader
  ctx.fillStyle = "#0c5a94";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.fillText(sub, 256, 130);

  // Diagram drawings based on type
  if (diagramType === "bodice") {
    ctx.strokeStyle = "#0a2540";
    ctx.lineWidth = 3;

    // Outer pattern outline
    ctx.strokeRect(80, 170, 350, 400);

    // Neckline curve
    ctx.beginPath();
    ctx.moveTo(80, 220);
    ctx.quadraticCurveTo(140, 220, 180, 170);
    ctx.stroke();

    // Shoulder seam
    ctx.beginPath();
    ctx.moveTo(180, 170);
    ctx.lineTo(340, 210);
    ctx.stroke();

    // Armhole curve
    ctx.beginPath();
    ctx.moveTo(340, 210);
    ctx.quadraticCurveTo(290, 320, 430, 360);
    ctx.stroke();

    // Darts
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(250, 570);
    ctx.lineTo(250, 420);
    ctx.lineTo(270, 570);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#475569";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("Center Front (Grainline ↑)", 160, 380);
    ctx.fillText("Bust Level: Ease + 2.5cm", 256, 410);
    ctx.fillText("Waist Dart Allowance: 3cm", 256, 600);
  } else if (diagramType === "measurements") {
    // Grid table
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    const rows = [
      ["Body Metric", "Size 34 (S)", "Size 38 (M)", "Size 42 (L)"],
      ["Bust Girth", "88 cm", "96 cm", "104 cm"],
      ["Waistline", "68 cm", "76 cm", "84 cm"],
      ["Hip Contour", "94 cm", "102 cm", "110 cm"],
      ["Across Back", "34 cm", "36 cm", "38 cm"],
      ["Nape to Waist", "40 cm", "41 cm", "42 cm"],
      ["Sleeve Length", "56 cm", "58 cm", "60 cm"]
    ];

    rows.forEach((row, rIdx) => {
      const y = 170 + rIdx * 50;
      if (rIdx === 0) {
        ctx.fillStyle = "#e0f0fe";
        ctx.fillRect(40, y - 25, 432, 40);
        ctx.fillStyle = "#0c5a94";
        ctx.font = "bold 13px Inter, sans-serif";
      } else {
        ctx.fillStyle = "#1e293b";
        ctx.font = "12px Inter, sans-serif";
      }
      ctx.textAlign = "left";
      ctx.fillText(row[0], 55, y);
      ctx.textAlign = "center";
      ctx.fillText(row[1], 230, y);
      ctx.fillText(row[2], 330, y);
      ctx.fillText(row[3], 420, y);

      ctx.beginPath();
      ctx.moveTo(40, y + 15);
      ctx.lineTo(472, y + 15);
      ctx.stroke();
    });

    ctx.fillStyle = "#64748b";
    ctx.font = "italic 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("* Complies with NAVTTC National Dressmaking Standards", 256, 610);
  } else {
    // French Curve & Sleeve
    ctx.strokeStyle = "#083e6b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 480);
    ctx.bezierCurveTo(120, 220, 360, 200, 420, 460);
    ctx.stroke();

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(260, 330, 90, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FRENCH CURVE ALIGNMENT GUIDE", 256, 540);
    ctx.font = "12px Inter, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Armscye & Sleeve Cap Smooth Blending", 256, 570);
  }

  // Footer bar
  ctx.fillStyle = "#0a2540";
  ctx.fillRect(15, 690, 482, 60);
  ctx.fillStyle = "#ffffff";
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("TECHNICAL EDUCATION & VOCATIONAL TRAINING AUTHORITY", 256, 725);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function DraftingLab3DSection() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Interactive View States
  const [activeTab, setActiveTab] = useState("3d"); // "3d" or "gallery"
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightingPreset, setLightingPreset] = useState("daylight"); // "daylight", "studio", "warm"
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [activeCameraPreset, setActiveCameraPreset] = useState("overview");

  // Lights reference for preset switching
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const windowFillLightRef = useRef(null);

  // Screen 2D Hotspot coordinates for rendering overlay badges
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState([]);

  // Setup Three.js WebGL 3D Studio Environment
  useEffect(() => {
    if (activeTab !== "3d" || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#d3e4ef"); // Airy sky light ambient background
    scene.fog = new THREE.FogExp2("#d3e4ef", 0.025);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 80);
    camera.position.set(3.8, 2.7, 6.2);
    cameraRef.current = camera;

    // 3. Renderer with high photographic quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mountRef.current.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
    controls.minDistance = 1.2;
    controls.maxDistance = 14;
    controls.target.set(-0.2, 1.1, -0.2);
    controlsRef.current = controls;

    // 5. Lighting Setup (Simulating reference photo sunlight through large side windows)
    const ambientLight = new THREE.AmbientLight("#d0e3f4", 0.95);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Natural Sunlight coming from the right wall windows
    const sunLight = new THREE.DirectionalLight("#fff5df", 2.2);
    sunLight.position.set(9, 6.5, 1.5);
    sunLight.target.position.set(-0.5, 0.8, -0.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    scene.add(sunLight.target);
    sunLightRef.current = sunLight;

    // Window soft interior spill light
    const windowFillLight = new THREE.PointLight("#e2f0fd", 1.4, 18);
    windowFillLight.position.set(6.2, 3.2, 0);
    scene.add(windowFillLight);
    windowFillLightRef.current = windowFillLight;

    // Subtle downward ceiling light fixtures
    const ceilingFill = new THREE.HemisphereLight("#ffffff", "#a0b2c2", 0.6);
    scene.add(ceilingFill);

    // ==========================================
    // 6. Architectural Room Modeling
    // ==========================================
    const roomWidth = 15;
    const roomHeight = 4.8;
    const roomDepth = 15;

    // Floor (Polished Terrazzo Concrete)
    const floorGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMat = new THREE.MeshStandardMaterial({
      map: generateTerrazzoFloorTexture(),
      roughness: 0.35,
      metalness: 0.08
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: "#eef3f7",
      roughness: 0.85
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = roomHeight;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Ceiling concrete structural cross-beams (as visible in reference image)
    const beamGeo = new THREE.BoxGeometry(roomWidth, 0.45, 0.45);
    const beamMat = new THREE.MeshStandardMaterial({ color: "#dde6ee", roughness: 0.7 });
    for (let z = -4.5; z <= 4.5; z += 4.5) {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, roomHeight - 0.22, z);
      scene.add(beam);
    }

    // Walls (Smooth light-tinted sky-blue/grey as shown in photos)
    const wallMat = new THREE.MeshStandardMaterial({
      color: "#cfe0ed",
      roughness: 0.65
    });

    // Back Wall
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), wallMat);
    backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall (where mannequins and charts reside)
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, roomHeight), wallMat);
    leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right Wall (Window Wall)
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, roomHeight), wallMat);
    rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Windows on Right Wall with Natural Sunlight
    const createWindow = (zPos) => {
      const windowGroup = new THREE.Group();
      windowGroup.position.set(roomWidth / 2 - 0.05, 2.5, zPos);

      // Outer window frame
      const frameGeo = new THREE.BoxGeometry(0.12, 2.2, 2.4);
      const frameMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0", roughness: 0.4 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      windowGroup.add(frame);

      // Glass panes (translucent sunlight)
      const glassGeo = new THREE.BoxGeometry(0.04, 1.9, 2.1);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        transmission: 0.9,
        ior: 1.5
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      windowGroup.add(glass);

      // Window mullions / grid
      const mullionMat = new THREE.MeshStandardMaterial({ color: "#cbd5e1" });
      const vMullion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.9, 0.08), mullionMat);
      windowGroup.add(vMullion);

      const hMullion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 2.1), mullionMat);
      windowGroup.add(hMullion);

      // Outdoor sky backdrop plane
      const skyBackdropGeo = new THREE.PlaneGeometry(3.5, 3.2);
      const skyBackdropMat = new THREE.MeshBasicMaterial({ color: "#c6e3ff" });
      const sky = new THREE.Mesh(skyBackdropGeo, skyBackdropMat);
      sky.position.set(0.3, 0, 0);
      sky.rotation.y = -Math.PI / 2;
      windowGroup.add(sky);

      return windowGroup;
    };

    scene.add(createWindow(-2.2));
    scene.add(createWindow(2.2));

    // Door on Back Wall (Left Corner)
    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 2.6, 0.08),
      new THREE.MeshStandardMaterial({ color: "#d97706", roughness: 0.5 })
    );
    doorFrame.position.set(-5.2, 1.3, -roomDepth / 2 + 0.04);
    scene.add(doorFrame);

    const doorLeaf = new THREE.Mesh(
      new THREE.BoxGeometry(1.18, 2.48, 0.05),
      new THREE.MeshStandardMaterial({ color: "#f3ebd7", roughness: 0.4 })
    );
    doorLeaf.position.set(-5.2, 1.25, -roomDepth / 2 + 0.06);
    scene.add(doorLeaf);

    // ==========================================
    // 7. Instructional Charts & Posters on Walls
    // ==========================================
    const createMountedChart = (title, sub, type, pos, rotY) => {
      const chartGroup = new THREE.Group();
      chartGroup.position.copy(pos);
      chartGroup.rotation.y = rotY;

      // Board
      const boardGeo = new THREE.BoxGeometry(1.4, 1.9, 0.04);
      const boardMat = new THREE.MeshStandardMaterial({
        map: generateWallChartTexture(title, sub, type),
        roughness: 0.4
      });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.castShadow = true;
      chartGroup.add(board);

      return chartGroup;
    };

    // Chart 1 on Left Wall (Measurement Chart)
    scene.add(
      createMountedChart(
        "MEASUREMENT & EASE CHART",
        "STANDARD FEMALE SIZING SPECIFICATIONS",
        "measurements",
        new THREE.Vector3(-roomWidth / 2 + 0.08, 2.7, -4.0),
        Math.PI / 2
      )
    );

    // Chart 2 on Left Wall (Bodice Block Drafting)
    scene.add(
      createMountedChart(
        "BASIC BODICE DRAFTING",
        "FLAT PATTERN ENGINEERING & DARTS",
        "bodice",
        new THREE.Vector3(-roomWidth / 2 + 0.08, 2.7, -1.8),
        Math.PI / 2
      )
    );

    // Chart 3 on Left Wall (French Curve & Sleeve)
    scene.add(
      createMountedChart(
        "FRENCH CURVE & SLEEVE",
        "ARMSCYE & NECKLINE CONTOURING",
        "curve",
        new THREE.Vector3(-roomWidth / 2 + 0.08, 2.7, 0.4),
        Math.PI / 2
      )
    );

    // Wall-mounted green bulletin board on back wall
    const bulletinGeo = new THREE.BoxGeometry(1.8, 1.2, 0.04);
    const bulletinMat = new THREE.MeshStandardMaterial({ color: "#166534", roughness: 0.7 });
    const bulletin = new THREE.Mesh(bulletinGeo, bulletinMat);
    bulletin.position.set(-2.5, 2.6, -roomDepth / 2 + 0.04);
    scene.add(bulletin);

    // ==========================================
    // 8. Sturdy Long Wooden Worktables & Cutting Mats
    // ==========================================
    const sharedMatTexture = generateCuttingMatTexture();

    const createWorktable = (xOffset, zOffset) => {
      const tableGroup = new THREE.Group();
      tableGroup.position.set(xOffset, 0, zOffset);

      const tableLength = 5.6;
      const tableWidth = 1.9;
      const tableHeight = 0.88;
      const topThickness = 0.08;

      // Wooden Top with warm polished finish
      const topGeo = new THREE.BoxGeometry(tableLength, topThickness, tableWidth);
      const topMat = new THREE.MeshStandardMaterial({
        color: "#963c20", // Reddish-brown / mahogany wood top matching reference photos
        roughness: 0.38,
        metalness: 0.05
      });
      const tabletop = new THREE.Mesh(topGeo, topMat);
      tabletop.position.y = tableHeight - topThickness / 2;
      tabletop.castShadow = true;
      tabletop.receiveShadow = true;
      tableGroup.add(tabletop);

      // Terracotta/Red-Coated Steel Frame & Legs
      const legGeo = new THREE.BoxGeometry(0.1, tableHeight - topThickness, 0.1);
      const legMat = new THREE.MeshStandardMaterial({
        color: "#b91c1c", // Characteristic bold red/terracotta coated steel legs from image
        roughness: 0.5,
        metalness: 0.3
      });

      const legX = tableLength / 2 - 0.15;
      const legZ = tableWidth / 2 - 0.15;

      const legPositions = [
        [-legX, (tableHeight - topThickness) / 2, -legZ],
        [legX, (tableHeight - topThickness) / 2, -legZ],
        [-legX, (tableHeight - topThickness) / 2, legZ],
        [legX, (tableHeight - topThickness) / 2, legZ],
        [0, (tableHeight - topThickness) / 2, -legZ], // Center support legs
        [0, (tableHeight - topThickness) / 2, legZ]
      ];

      legPositions.forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        tableGroup.add(leg);
      });

      // Bottom steel stretchers / foot rails
      const stretcherGeoX = new THREE.BoxGeometry(tableLength - 0.3, 0.06, 0.06);
      const stretcherX1 = new THREE.Mesh(stretcherGeoX, legMat);
      stretcherX1.position.set(0, 0.18, -legZ);
      tableGroup.add(stretcherX1);

      const stretcherX2 = new THREE.Mesh(stretcherGeoX, legMat);
      stretcherX2.position.set(0, 0.18, legZ);
      tableGroup.add(stretcherX2);

      // Blue-green Cutting Mats laid out along the table surface
      const matGeo = new THREE.PlaneGeometry(1.4, 0.82);
      const matMat = new THREE.MeshStandardMaterial({
        map: sharedMatTexture,
        roughness: 0.3,
        metalness: 0.05
      });

      // Clear plastic protective sleeve over each mat with specular highlights
      const coverGeo = new THREE.PlaneGeometry(1.42, 0.84);
      const coverMat = new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        clearcoat: 0.8,
        reflectivity: 0.9
      });

      const matXPositions = [-1.75, 0, 1.75];

      matXPositions.forEach((mx, mIdx) => {
        // Cutting mat
        const mat = new THREE.Mesh(matGeo, matMat);
        mat.rotation.x = -Math.PI / 2;
        mat.position.set(mx, tableHeight + 0.002, 0);
        mat.receiveShadow = true;
        tableGroup.add(mat);

        // Plastic protective sleeve
        const cover = new THREE.Mesh(coverGeo, coverMat);
        cover.rotation.x = -Math.PI / 2;
        cover.position.set(mx, tableHeight + 0.005, 0);
        tableGroup.add(cover);

        // ==========================================
        // 9. Precision Drafting Tools on Mat
        // ==========================================

        // L-Square Ruler (Framing Square 90°)
        const lSquareGroup = new THREE.Group();
        lSquareGroup.position.set(mx - 0.25, tableHeight + 0.008, 0.12);
        lSquareGroup.rotation.y = mIdx === 1 ? 0.1 : -0.2;

        const metalRulerMat = new THREE.MeshStandardMaterial({
          color: "#cbd5e1",
          metalness: 0.85,
          roughness: 0.2
        });

        // Long arm of L-square
        const lLong = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.006, 0.05), metalRulerMat);
        lLong.position.set(0.325, 0, 0);
        lSquareGroup.add(lLong);

        // Short arm of L-square (90 degree angle)
        const lShort = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.006, 0.42), metalRulerMat);
        lShort.position.set(0.025, 0, -0.185);
        lSquareGroup.add(lShort);

        tableGroup.add(lSquareGroup);

        // French Curve (Translucent acrylic curved drafting template)
        const curveMat = new THREE.MeshPhysicalMaterial({
          color: "#93c5fd",
          transparent: true,
          opacity: 0.6,
          roughness: 0.15,
          transmission: 0.7
        });

        const frenchCurve = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 24, Math.PI * 1.3), curveMat);
        frenchCurve.rotation.x = Math.PI / 2;
        frenchCurve.rotation.z = 0.5 + mIdx * 0.3;
        frenchCurve.position.set(mx + 0.35, tableHeight + 0.008, -0.15);
        tableGroup.add(frenchCurve);

        // Wooden Straight Meter Ruler
        const woodRulerMat = new THREE.MeshStandardMaterial({
          color: "#d97706",
          roughness: 0.35
        });
        const straightRuler = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.008, 0.04), woodRulerMat);
        straightRuler.position.set(mx, tableHeight + 0.007, -0.32);
        straightRuler.rotation.y = 0.05;
        tableGroup.add(straightRuler);

        // Professional Fabric Shears / Scissors (Chrome Blades)
        const shearsGroup = new THREE.Group();
        shearsGroup.position.set(mx + 0.45, tableHeight + 0.01, 0.2);
        shearsGroup.rotation.y = -0.4;

        const shearsBladeMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0", metalness: 0.9, roughness: 0.15 });
        const shearsHandleMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.4 });

        const blade1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.005, 0.02), shearsBladeMat);
        blade1.position.x = 0.09;
        shearsGroup.add(blade1);

        const handle1 = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.008, 6, 12), shearsHandleMat);
        handle1.position.set(-0.02, 0, 0.015);
        shearsGroup.add(handle1);

        tableGroup.add(shearsGroup);

        // Blue Utility Accessories Kit Box (as seen in photo)
        const boxMat = new THREE.MeshStandardMaterial({ color: "#0284c7", roughness: 0.3 });
        const utilityBox = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.12), boxMat);
        utilityBox.position.set(mx - 0.45, tableHeight + 0.02, -0.18);
        utilityBox.castShadow = true;
        tableGroup.add(utilityBox);

        // Yellow Coiled Measuring Tape
        const tapeMat = new THREE.MeshStandardMaterial({ color: "#eab308", roughness: 0.5 });
        const tape = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16), tapeMat);
        tape.position.set(mx - 0.38, tableHeight + 0.015, 0.28);
        tableGroup.add(tape);

        // Small Desktop Calculator (Station 2)
        if (mIdx === 1) {
          const calcMat = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.4 });
          const calc = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.015, 0.15), calcMat);
          calc.position.set(mx + 0.15, tableHeight + 0.01, 0.26);
          tableGroup.add(calc);

          const calcScreen = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.002, 0.03),
            new THREE.MeshStandardMaterial({ color: "#a3e635", roughness: 0.2 })
          );
          calcScreen.position.set(mx + 0.15, tableHeight + 0.019, 0.22);
          tableGroup.add(calcScreen);
        }
      });

      return tableGroup;
    };

    // Table 1 (Foreground / Center)
    const table1 = createWorktable(0.2, 0.2);
    scene.add(table1);

    // Table 2 (Background / Parallel Table as visible in photos)
    const table2 = createWorktable(0.2, -3.2);
    scene.add(table2);

    // ==========================================
    // 10. Student Chairs Arranged Around Tables
    // ==========================================
    const createStudentChair = (pos, rotY) => {
      const chairGroup = new THREE.Group();
      chairGroup.position.copy(pos);
      chairGroup.rotation.y = rotY;

      // Metal frame material
      const chairFrameMat = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.4, metalness: 0.6 });
      // Slatted varnished wood material
      const chairWoodMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.4 });

      // 4 Legs
      const legGeo = new THREE.BoxGeometry(0.03, 0.45, 0.03);
      const legOffsets = [
        [-0.18, 0.225, -0.18],
        [0.18, 0.225, -0.18],
        [-0.18, 0.225, 0.18],
        [0.18, 0.225, 0.18]
      ];
      legOffsets.forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, chairFrameMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        chairGroup.add(leg);
      });

      // Wooden Slatted Seat
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.025, 0.4), chairWoodMat);
      seat.position.set(0, 0.45, 0);
      seat.castShadow = true;
      chairGroup.add(seat);

      // Backrest Uprights
      const backPostGeo = new THREE.BoxGeometry(0.025, 0.42, 0.025);
      const backPostL = new THREE.Mesh(backPostGeo, chairFrameMat);
      backPostL.position.set(-0.18, 0.66, -0.18);
      chairGroup.add(backPostL);

      const backPostR = new THREE.Mesh(backPostGeo, chairFrameMat);
      backPostR.position.set(0.18, 0.66, -0.18);
      chairGroup.add(backPostR);

      // Wooden Slatted Backrest Panels
      const backPanel = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.02), chairWoodMat);
      backPanel.position.set(0, 0.76, -0.18);
      chairGroup.add(backPanel);

      // Student Tablet Writing Arm (Right-hand armrest tablet as in reference image)
      const tabletArm = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.24, 0.025), chairFrameMat);
      tabletArm.position.set(0.22, 0.57, 0.05);
      chairGroup.add(tabletArm);

      const tabletDesk = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.32), chairWoodMat);
      tabletDesk.position.set(0.22, 0.68, 0.14);
      tabletDesk.castShadow = true;
      chairGroup.add(tabletDesk);

      return chairGroup;
    };

    // Position chairs neatly on both sides of Table 1
    const chairXOffsets = [-1.7, 0.1, 1.9];
    chairXOffsets.forEach((cx) => {
      // Front side of Table 1 (facing table)
      scene.add(createStudentChair(new THREE.Vector3(cx, 0, 1.45), Math.PI));
      // Back side of Table 1 (facing table)
      scene.add(createStudentChair(new THREE.Vector3(cx, 0, -1.05), 0));

      // Front side of Table 2
      scene.add(createStudentChair(new THREE.Vector3(cx, 0, -2.0), Math.PI));
      // Back side of Table 2
      scene.add(createStudentChair(new THREE.Vector3(cx, 0, -4.4), 0));
    });

    // ==========================================
    // 11. Dressmaker Mannequins (Dress Forms)
    // ==========================================
    const createMannequin = (pos, scale = 1.0, hasClearCover = true) => {
      const mannequinGroup = new THREE.Group();
      mannequinGroup.position.copy(pos);
      mannequinGroup.scale.set(scale, scale, scale);

      // Base Stand (Tripod or round cast metal base)
      const baseMat = new THREE.MeshStandardMaterial({
        color: "#475569",
        metalness: 0.8,
        roughness: 0.25
      });

      const baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 24), baseMat);
      baseDisc.position.y = 0.02;
      baseDisc.castShadow = true;
      mannequinGroup.add(baseDisc);

      // Chrome Central Support Pole
      const poleGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.35, 16);
      const pole = new THREE.Mesh(poleGeo, baseMat);
      pole.position.y = 0.7;
      mannequinGroup.add(pole);

      // Height Adjusting Collar
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16), baseMat);
      collar.position.y = 0.9;
      mannequinGroup.add(collar);

      // Torso Group (Female dress form proportions)
      const torsoGroup = new THREE.Group();
      torsoGroup.position.y = 1.25;

      // Padded calico/linen fabric material
      const linenMat = new THREE.MeshStandardMaterial({
        color: "#f3ede2",
        roughness: 0.75
      });

      // Hips / Lower Pelvis
      const hipsGeo = new THREE.CylinderGeometry(0.19, 0.17, 0.28, 20);
      const hips = new THREE.Mesh(hipsGeo, linenMat);
      hips.position.y = -0.14;
      torsoGroup.add(hips);

      // Waist
      const waistGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.22, 20);
      const waist = new THREE.Mesh(waistGeo, linenMat);
      waist.position.y = 0.08;
      torsoGroup.add(waist);

      // Bust / Chest
      const bustGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.32, 20);
      const bust = new THREE.Mesh(bustGeo, linenMat);
      bust.position.y = 0.32;
      torsoGroup.add(bust);

      // Neck
      const neckGeo = new THREE.CylinderGeometry(0.075, 0.09, 0.12, 16);
      const neck = new THREE.Mesh(neckGeo, linenMat);
      neck.position.y = 0.52;
      torsoGroup.add(neck);

      // Wooden neck cap finial
      const finialMat = new THREE.MeshStandardMaterial({ color: "#854d0e", roughness: 0.3 });
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), finialMat);
      finial.position.y = 0.6;
      torsoGroup.add(finial);

      // Reference seam lines (Bustline, Waistline, Center Front)
      const seamMat = new THREE.MeshBasicMaterial({ color: "#0f172a" });
      const waistLine = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.003, 4, 24), seamMat);
      waistLine.rotation.x = Math.PI / 2;
      waistLine.position.y = 0.08;
      torsoGroup.add(waistLine);

      const bustLine = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.003, 4, 24), seamMat);
      bustLine.rotation.x = Math.PI / 2;
      bustLine.position.y = 0.32;
      torsoGroup.add(bustLine);

      mannequinGroup.add(torsoGroup);

      // ==========================================
      // PROTECTIVE TRANSPARENT PLASTIC COVER
      // Fitted translucent vinyl sheath as specifically described in user prompt
      // ==========================================
      if (hasClearCover) {
        const coverGeo = new THREE.CylinderGeometry(0.24, 0.28, 1.1, 24, 1, true);
        const coverMat = new THREE.MeshPhysicalMaterial({
          color: "#ffffff",
          transparent: true,
          opacity: 0.45,
          roughness: 0.12,
          transmission: 0.85,
          ior: 1.45,
          clearcoat: 0.9,
          side: THREE.DoubleSide
        });

        const cover = new THREE.Mesh(coverGeo, coverMat);
        cover.position.y = 1.35;
        cover.scale.set(1.15, 1.05, 1.15);
        mannequinGroup.add(cover);

        // Plastic drape creases top rim
        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(0.12, 0.015, 8, 20),
          new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.7 })
        );
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 1.9;
        mannequinGroup.add(rim);
      }

      return mannequinGroup;
    };

    // Lineup of dress forms along the left wall (matching photo layout)
    // Features Adult Size, Child/Junior Size, etc.
    const mannequinsData = [
      { pos: new THREE.Vector3(-5.6, 0, -4.6), scale: 1.0, cover: true }, // Adult
      { pos: new THREE.Vector3(-5.5, 0, -3.2), scale: 0.75, cover: true }, // Child / Junior Size (distinct small form)
      { pos: new THREE.Vector3(-5.6, 0, -1.8), scale: 1.05, cover: true }, // Adult Tall
      { pos: new THREE.Vector3(-5.5, 0, -0.4), scale: 0.98, cover: true }, // Adult Standard
      { pos: new THREE.Vector3(-5.6, 0, 1.0), scale: 0.78, cover: true }, // Junior Form 2
      { pos: new THREE.Vector3(-5.5, 0, 2.4), scale: 1.02, cover: true } // Adult Form
    ];

    mannequinsData.forEach(({ pos, scale, cover }) => {
      scene.add(createMannequin(pos, scale, cover));
    });

    // 12. Animation Loop & Hotspot 3D-to-2D Coordinate Tracking
    let isMounted = true;

    const animate = () => {
      if (!isMounted) return;

      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Handle auto-rotate if enabled
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 0.8;
        controlsRef.current.update();
      }

      // Update Hotspot 2D screen projections
      if (cameraRef.current && mountRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        const positions = HOTSPOTS_DATA.map((h) => {
          const v = new THREE.Vector3(...h.position);
          v.project(cameraRef.current);

          const isVisible = v.z < 1;
          const x = ((v.x + 1) * rect.width) / 2;
          const y = ((-v.y + 1) * rect.height) / 2;

          return { id: h.id, x, y, isVisible };
        });
        setHotspotScreenPositions(positions);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();
    setIs3DReady(true);

    // 13. Responsive Window Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [activeTab, autoRotate]);

  // Handle Camera Presets
  const handleCameraPreset = (presetName) => {
    if (!controlsRef.current || !cameraRef.current) return;
    setActiveCameraPreset(presetName);
    setSelectedHotspot(null);

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const presets = {
      overview: { pos: [3.8, 2.7, 6.2], target: [-0.2, 1.1, -0.2] },
      cutting: { pos: [0.2, 2.0, 1.8], target: [0.1, 0.95, 0.2] },
      mannequins: { pos: [-3.6, 2.0, -0.6], target: [-5.4, 1.4, -1.6] },
      tools: { pos: [-0.6, 1.5, 0.85], target: [-0.6, 0.98, 0.1] },
      windows: { pos: [-1.2, 2.2, -1.0], target: [5.8, 2.3, 0.8] }
    };

    const targetPreset = presets[presetName] || presets.overview;

    // Smoothly fly camera to coordinates
    animateCameraTransition(camera, controls, targetPreset.pos, targetPreset.target);
  };

  // Smooth Camera Lerp Helper
  const animateCameraTransition = (camera, controls, endPos, endTarget) => {
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const targetEnd = new THREE.Vector3(...endTarget);
    const posEnd = new THREE.Vector3(...endPos);

    let progress = 0;
    const duration = 45; // Frames

    const step = () => {
      progress++;
      const t = Math.min(progress / duration, 1);
      // Smooth ease-in-out curve
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      camera.position.lerpVectors(startPos, posEnd, ease);
      controls.target.lerpVectors(startTarget, targetEnd, ease);
      controls.update();

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Hotspot Click Handler
  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    if (cameraRef.current && controlsRef.current && hotspot.cameraTarget) {
      animateCameraTransition(
        cameraRef.current,
        controlsRef.current,
        hotspot.cameraTarget.pos,
        hotspot.cameraTarget.target
      );
    }
  };

  // Toggle Fullscreen Mode
  const toggleFullscreen = () => {
    const el = document.getElementById("drafting-3d-container");
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Lighting Mode Preset Switcher
  const handleLightingChange = (mode) => {
    setLightingPreset(mode);
    if (!sunLightRef.current || !ambientLightRef.current) return;

    if (mode === "daylight") {
      sunLightRef.current.intensity = 2.2;
      sunLightRef.current.color.set("#fff5df");
      ambientLightRef.current.intensity = 0.95;
      ambientLightRef.current.color.set("#d0e3f4");
    } else if (mode === "studio") {
      sunLightRef.current.intensity = 1.2;
      sunLightRef.current.color.set("#ffffff");
      ambientLightRef.current.intensity = 1.35;
      ambientLightRef.current.color.set("#ffffff");
    } else if (mode === "warm") {
      sunLightRef.current.intensity = 2.5;
      sunLightRef.current.color.set("#fed7aa");
      ambientLightRef.current.intensity = 0.85;
      ambientLightRef.current.color.set("#fef08a");
    }
  };

  return (
    <section id="drafting-3d-lab" className="relative bg-slate-900 text-white overflow-hidden py-20 border-y border-slate-800">
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* ==========================================
            1. SECTION HEADER (Title & Subtitle from prompt)
           ========================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-brand-350 shadow-inner">
              <Move3d size={14} className="text-gold" />
              Interactive 3D Virtual Environment
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-3 leading-tight">
              Drafting & Pattern Making Lab – <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300">GPIW D.I. Khan</span>
            </h2>
            <p className="text-slate-350 text-sm md:text-base max-w-2xl mt-3 font-medium leading-relaxed">
              Explore our fully equipped garment design and pattern-making studio in an interactive 3D virtual environment. Inspect precision workstations, draping mannequins with protective vinyl covers, and technical drafting suites.
            </p>
          </div>

          {/* Mode Switcher Buttons: 3D View vs 3:2 Photo Gallery */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl shrink-0 backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab("3d");
                setSelectedHotspot(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === "3d"
                  ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-700/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Move3d size={16} /> 3D Virtual Studio
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === "gallery"
                  ? "bg-gradient-to-r from-gold-dark to-gold text-slate-950 shadow-lg shadow-gold/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ImageIcon size={16} /> 3:2 Photo Gallery (1200×800)
            </button>
          </div>
        </div>

        {/* ==========================================
            2. MAIN VISUALIZATION STAGE (3D Canvas or Gallery)
           ========================================== */}
        <div
          id="drafting-3d-container"
          className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all"
          style={{ minHeight: "620px" }}
        >
          {/* TAB 1: INTERACTIVE 3D WEBGL STUDIO */}
          {activeTab === "3d" && (
            <div className="relative w-full h-[620px] select-none">
              
              {/* Three.js canvas mount point */}
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Top Controls Overlay Bar */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
                
                {/* Camera View Presets */}
                <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-xl">
                  <span className="px-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hidden sm:inline">
                    Views:
                  </span>
                  {[
                    { id: "overview", label: "Overview", icon: Camera },
                    { id: "cutting", label: "Cutting Station", icon: Ruler },
                    { id: "mannequins", label: "Mannequins", icon: Sparkles },
                    { id: "tools", label: "Drafting Tools", icon: Scissors },
                    { id: "windows", label: "Daylight Windows", icon: Sun }
                  ].map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleCameraPreset(preset.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeCameraPreset === preset.id
                            ? "bg-brand-600 text-white shadow-md shadow-brand-600/30 font-black"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={12} />
                        <span className="hidden md:inline">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Side Tools: Auto-Rotate, Lighting, Fullscreen */}
                <div className="pointer-events-auto flex items-center gap-2">
                  {/* Lighting Selector */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-xl text-xs font-bold text-slate-300">
                    <button
                      title="Natural Daylight"
                      onClick={() => handleLightingChange("daylight")}
                      className={`p-1.5 rounded-lg transition-all ${
                        lightingPreset === "daylight" ? "bg-amber-500/20 text-amber-300 font-black" : "hover:text-white"
                      }`}
                    >
                      <Sun size={15} />
                    </button>
                    <button
                      title="Studio Overhead Lighting"
                      onClick={() => handleLightingChange("studio")}
                      className={`p-1.5 rounded-lg transition-all ${
                        lightingPreset === "studio" ? "bg-blue-500/20 text-blue-300 font-black" : "hover:text-white"
                      }`}
                    >
                      <Layers size={15} />
                    </button>
                    <button
                      title="Warm Atmosphere"
                      onClick={() => handleLightingChange("warm")}
                      className={`p-1.5 rounded-lg transition-all ${
                        lightingPreset === "warm" ? "bg-orange-500/20 text-orange-300 font-black" : "hover:text-white"
                      }`}
                    >
                      <Moon size={15} />
                    </button>
                  </div>

                  {/* Auto-Rotate Turntable Toggle */}
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold backdrop-blur-md border shadow-xl transition-all ${
                      autoRotate
                        ? "bg-brand-600 border-brand-400 text-white shadow-brand-500/30"
                        : "bg-slate-900/85 border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    <RotateCw size={14} className={autoRotate ? "animate-spin" : ""} />
                    <span className="hidden sm:inline">{autoRotate ? "Orbiting" : "360° Orbit"}</span>
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    title="Toggle Fullscreen"
                    className="p-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white shadow-xl transition-all"
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                </div>
              </div>

              {/* 3D Hotspot Interactive Overlay Tags */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {hotspotScreenPositions.map((pos) => {
                  const hotspot = HOTSPOTS_DATA.find((h) => h.id === pos.id);
                  if (!hotspot || !pos.isVisible) return null;

                  const isSelected = selectedHotspot?.id === hotspot.id;
                  const Icon = hotspot.icon;

                  return (
                    <div
                      key={pos.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-150"
                      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                    >
                      {/* Pulsing Beacon Ring */}
                      <div className="relative group">
                        <button
                          onClick={() => handleHotspotClick(hotspot)}
                          className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 ${
                            isSelected
                              ? "bg-gold text-slate-950 ring-4 ring-gold/40 scale-105"
                              : "bg-brand-900/90 text-white border border-brand-400/40 backdrop-blur-md hover:bg-brand-700"
                          }`}
                        >
                          {/* Inner pulse circle */}
                          <span className="relative flex h-2 w-2">
                            <span className="hotspot-pulse absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                          </span>

                          <Icon size={12} className={isSelected ? "text-slate-950" : "text-brand-350"} />
                          <span className="tracking-wide hidden sm:inline whitespace-nowrap">{hotspot.shortTitle}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Instructions Badge */}
              <div className="absolute bottom-4 left-4 pointer-events-none z-20">
                <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-400 text-xs flex items-center gap-2">
                  <Compass size={14} className="text-gold animate-spin" style={{ animationDuration: "12s" }} />
                  <span>
                    <strong className="text-white">Controls:</strong> Left click & drag to rotate 360° • Scroll to zoom • Right click to pan
                  </span>
                </div>
              </div>

              {/* Selected Hotspot Detail Slide-over Card */}
              {selectedHotspot && (
                <div className="absolute top-16 right-4 sm:w-96 w-[calc(100%-32px)] z-30 pointer-events-auto animate-fade-in-right">
                  <div className="p-6 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-brand-500/40 shadow-2xl text-white">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                          {selectedHotspot.tag}
                        </span>
                        <h4 className="text-lg font-black text-white mt-2 leading-snug">
                          {selectedHotspot.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedHotspot(null)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {selectedHotspot.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                      {selectedHotspot.specs.map((item) => (
                        <div key={item.label} className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</p>
                          <p className="text-xs font-black text-brand-200 mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleCameraPreset("overview")}
                        className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 transition-colors"
                      >
                        Reset Camera
                      </button>
                      <button
                        onClick={() => setActiveTab("gallery")}
                        className="w-full py-2 rounded-lg bg-gold hover:bg-yellow-500 text-slate-950 text-xs font-black transition-colors"
                      >
                        View in Photo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HIGH-RESOLUTION 3:2 PHOTO GALLERY (1200 x 800) */}
          {activeTab === "gallery" && (
            <div className="p-6 md:p-8 bg-slate-950 min-h-[620px] flex flex-col justify-between">
              
              {/* Top Photo Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-gold">
                    HIGH RESOLUTION 3:2 DOCUMENTATION GALLERY
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                    {GALLERY_ITEMS[activeGalleryIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    {GALLERY_ITEMS[activeGalleryIndex].subtitle} • Standard Aspect Ratio 3:2 (1200 × 800 px)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all"
                  >
                    <ZoomIn size={14} /> Fullscreen Lightbox
                  </button>
                </div>
              </div>

              {/* Main 3:2 Showcase Image Container (1200 x 800 Aspect Ratio) */}
              <div className="relative my-6 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group aspect-[3/2]">
                <img
                  src={GALLERY_ITEMS[activeGalleryIndex].src}
                  alt={GALLERY_ITEMS[activeGalleryIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20 pointer-events-none" />

                {/* Prev / Next Navigation Arrows */}
                <button
                  onClick={() =>
                    setActiveGalleryIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-gold text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setActiveGalleryIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-gold text-white hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Floating Bottom Meta Badge on image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-white">{GALLERY_ITEMS[activeGalleryIndex].specs}</p>
                    <p className="text-xs text-slate-350 mt-1 max-w-2xl leading-relaxed">
                      {GALLERY_ITEMS[activeGalleryIndex].description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {GALLERY_ITEMS[activeGalleryIndex].tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto w-full pt-4 border-t border-slate-800">
                {GALLERY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[3/2] border-2 transition-all ${
                      activeGalleryIndex === idx
                        ? "border-gold shadow-lg shadow-gold/20 scale-102"
                        : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                    }`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-2 text-[10px] font-black text-white bg-black/60 px-1.5 py-0.5 rounded">
                      View {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            3. TECHNICAL HIGHLIGHTS & EQUIPMENT SPECIFICATIONS
           ========================================== */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Dressmaker Mannequins",
              icon: Sparkles,
              tag: "Standard & Pediatric",
              desc: "Adult and child dress forms equipped with dust-proof transparent covers for 3D moulage, garment fitting, and silhouette balancing."
            },
            {
              title: "Self-Healing Cutting Mats",
              icon: Ruler,
              tag: "5-Layer Metric Composite",
              desc: "A1 size heavy-duty cutting mats with 10mm grid lines, 45°/60° bias guides, and protective transparent overlays for precision rotary trimming."
            },
            {
              title: "Precision Drafting Suite",
              icon: Scissors,
              tag: "L-Squares & French Curves",
              desc: "90° metal framing squares, acrylic French curves, and 100cm straight wooden meter rulers for armscye, neck, and grainline truing."
            },
            {
              title: "Daylight Workstations",
              icon: Sun,
              tag: "Natural Illumination",
              desc: "4.2m sturdy wooden cutting tables with terracotta steel frames, paired with large casement windows providing glare-free indirect sunlight."
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/40"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-brand-500/10 group-hover:bg-brand-600 p-3 text-brand-350 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                    {feature.tag}
                  </span>
                </div>
                <h4 className="text-base font-black text-white group-hover:text-brand-300 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* LIGHTBOX MODAL FOR 3:2 HIGH-RES INSPECTION */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="max-w-6xl w-full flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[3/2] max-h-[80vh]">
              <img
                src={GALLERY_ITEMS[activeGalleryIndex].src}
                alt={GALLERY_ITEMS[activeGalleryIndex].title}
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-black text-white">{GALLERY_ITEMS[activeGalleryIndex].title}</h3>
              <p className="text-xs text-slate-400 mt-1">{GALLERY_ITEMS[activeGalleryIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
