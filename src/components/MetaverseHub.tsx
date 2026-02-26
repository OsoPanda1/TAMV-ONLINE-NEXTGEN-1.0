import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Portal({ position, color, label, path, icon: Icon }: any) {
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <FloatDrei speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <Sphere
          args={[1, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => navigate(path)}
        >
          <MeshDistortMaterial
            color={hovered ? "#00f3ff" : color}
            speed={2}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCOjFwrW2mtfCYS6m62.woff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </FloatDrei>
  );
}

function CentralCore() {
  const meshRef = React.useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.z = Math.sin(t / 4) / 2;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#00a3ff"
          wireframe
          emissive="#00a3ff"
          emissiveIntensity={2}
        />
      </mesh>
      <pointLight intensity={2} color="#00a3ff" />
    </group>
  );
}

export default function MetaverseHub() {
  return (
    <div className="w-full h-[600px] relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">TAMV METAVERSE</h2>
        <p className="text-xs font-mono text-tamv-blue uppercase tracking-widest">Navega el ecosistema dimensional • Haz clic en los portales</p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#050505"]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <CentralCore />

        <Portal position={[-4, 2, 0]} color="#3b82f6" label="ISABELLA AI" path="/isabella" />
        <Portal position={[4, 2, 0]} color="#10b981" label="ECONOMÍA" path="/economy" />
        <Portal position={[-4, -2, 0]} color="#f59e0b" label="GOBERNANZA" path="/governance" />
        <Portal position={[4, -2, 0]} color="#8b5cf6" label="DREAMSPACES" path="/dreamspaces" />
        <Portal position={[0, 4, -2]} color="#06b6d4" label="ARQUITECTURA" path="/architecture" />
        <Portal position={[0, -4, -2]} color="#ec4899" label="UTAMV" path="/university" />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2 text-right">
        <div className="text-[10px] font-mono text-white/40 uppercase">Controles de Navegación</div>
        <div className="flex gap-4 text-[10px] font-mono text-tamv-blue">
          <span>🖱️ Arrastrar: Rotar</span>
          <span>👆 Click: Acceder</span>
        </div>
      </div>
    </div>
  );
}
