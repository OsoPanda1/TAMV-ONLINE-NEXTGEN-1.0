import { 
  SecurityStatus, 
  SecurityLayer, 
  SecurityEvent, 
  HoneypotType 
} from "./types";

class SecurityEngine {
  private status: SecurityStatus = {
    globalThreatLevel: 5,
    activeHoneypots: 1240,
    layers: {
      [SecurityLayer.TENOCHTITLAN]: { status: "OPTIMAL", health: 100 },
      [SecurityLayer.QUETZALCOATL]: { status: "OPTIMAL", health: 99 },
      [SecurityLayer.OJO_DE_RA]: { status: "OPTIMAL", health: 100 },
      [SecurityLayer.ANUBIS]: { status: "OPTIMAL", health: 100 },
      [SecurityLayer.HORUS]: { status: "OPTIMAL", health: 100 },
      [SecurityLayer.DEKATEOTL]: { status: "OPTIMAL", health: 100 },
      [SecurityLayer.AZTEK_GODS]: { status: "OPTIMAL", health: 100 },
    },
    orchestrator: {
      current: "DEKATEOTL",
      level: 11
    }
  };

  private events: SecurityEvent[] = [];

  constructor() {
    this.startSimulation();
  }

  private startSimulation() {
    setInterval(() => {
      this.generateRandomEvent();
      this.updateStatus();
    }, 5000);
  }

  private generateRandomEvent() {
    const layers = Object.values(SecurityLayer);
    const layer = layers[Math.floor(Math.random() * layers.length)];
    
    const event: SecurityEvent = {
      id: `evt-${Math.random().toString(36).substr(2, 9)}`,
      layer,
      type: "ANOMALY_DETECTED",
      severity: Math.random() > 0.8 ? "MEDIUM" : "LOW",
      message: `Patrón inusual detectado en capa ${layer}`,
      timestamp: Date.now()
    };

    this.events.unshift(event);
    if (this.events.length > 50) this.events.pop();
  }

  private updateStatus() {
    // Simulate slight fluctuations
    this.status.globalThreatLevel = Math.max(2, Math.min(15, this.status.globalThreatLevel + (Math.random() - 0.5)));
    this.status.activeHoneypots += Math.floor(Math.random() * 10 - 5);
  }

  public getStatus(): SecurityStatus {
    return this.status;
  }

  public getRecentEvents(): SecurityEvent[] {
    return this.events;
  }

  public deployHoneypot(type: HoneypotType) {
    console.log(`[TENOCHTITLAN] Deploying ${type} interaction honeypot...`);
    this.status.activeHoneypots += 1;
  }
}

export const securityEngine = new SecurityEngine();
