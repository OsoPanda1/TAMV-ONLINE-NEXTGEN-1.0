export enum SecurityLayer {
  TENOCHTITLAN = "TENOCHTITLAN",
  QUETZALCOATL = "QUETZALCOATL",
  OJO_DE_RA = "OJO_DE_RA",
  ANUBIS = "ANUBIS",
  HORUS = "HORUS",
  DEKATEOTL = "DEKATEOTL",
  AZTEK_GODS = "AZTEK_GODS"
}

export enum HoneypotType {
  LOW_INTERACTION = "LOW",
  MEDIUM_INTERACTION = "MEDIUM",
  HIGH_INTERACTION = "HIGH"
}

export interface SecurityEvent {
  id: string;
  layer: SecurityLayer;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  timestamp: number;
  metadata?: any;
}

export interface RadarStatus {
  active: boolean;
  anomaliesDetected: number;
  trafficLoad: number;
  lastHeartbeat: number;
}

export interface OrchestratorLevel {
  level: number;
  name: string;
  status: "ACTIVE" | "DEGRADED" | "FAILOVER";
}

export interface SecurityStatus {
  globalThreatLevel: number; // 0-100
  activeHoneypots: number;
  layers: Record<SecurityLayer, {
    status: "OPTIMAL" | "WARNING" | "CRITICAL";
    health: number;
  }>;
  orchestrator: {
    current: "DEKATEOTL" | "AZTEK_GODS";
    level: number;
  };
}
