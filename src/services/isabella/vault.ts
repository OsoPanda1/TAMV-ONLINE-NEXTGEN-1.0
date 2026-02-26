import { AgentDescriptor, AgentStatus, TamvDomain } from "./types";

export class AgentVault {
  private agents: Map<string, AgentDescriptor> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    const defaultAgents: AgentDescriptor[] = [
      {
        id: "utamv-tutor",
        name: "Tutor UTAMV",
        domain: TamvDomain.LEARN,
        status: AgentStatus.IDLE,
        capabilities: ["learning_help", "curriculum_design"],
        description: "Especialista en trayectoria académica y pedagogía civilizatoria."
      },
      {
        id: "econ-oracle",
        name: "Oráculo Económico",
        domain: TamvDomain.ECONOMY,
        status: AgentStatus.IDLE,
        capabilities: ["quantum_seeds_analysis", "market_trends"],
        description: "Analista de flujos de energía creativa y activos TCEP."
      },
      {
        id: "xr-architect",
        name: "Arquitecto XR",
        domain: TamvDomain.XR,
        status: AgentStatus.IDLE,
        capabilities: ["dreamspace_design", "immersive_logic"],
        description: "Diseñador de entornos 4D y experiencias multisensoriales."
      },
      {
        id: "msr-guardian",
        name: "Guardián MSR",
        domain: TamvDomain.SECURITY,
        status: AgentStatus.IDLE,
        capabilities: ["blockchain_audit", "threat_detection"],
        description: "Protector de la integridad del ledger y la soberanía de datos."
      },
      {
        id: "devhub-coder",
        name: "Coder DevHub",
        domain: TamvDomain.DEVHUB,
        status: AgentStatus.IDLE,
        capabilities: ["code_refactoring", "system_architecture"],
        description: "Especialista en desarrollo de cells y orquestación de servicios."
      }
    ];

    defaultAgents.forEach(agent => this.agents.set(agent.id, agent));
  }

  public getAgent(id: string): AgentDescriptor | undefined {
    return this.agents.get(id);
  }

  public activateAgents(domain: TamvDomain): string[] {
    const activated: string[] = [];
    this.agents.forEach(agent => {
      if (agent.domain === domain || agent.domain === TamvDomain.CORE) {
        agent.status = AgentStatus.ACTIVE;
        activated.push(agent.id);
      } else {
        agent.status = AgentStatus.IDLE;
      }
    });
    return activated;
  }

  public deactivateAll() {
    this.agents.forEach(agent => {
      agent.status = AgentStatus.IDLE;
    });
  }

  public getAllAgents(): AgentDescriptor[] {
    return Array.from(this.agents.values());
  }
}

export const vault = new AgentVault();
