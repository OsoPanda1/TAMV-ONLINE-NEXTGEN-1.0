export enum TamvDomain {
  SOCIAL = "social",
  LEARN = "learn",
  ECONOMY = "economy",
  GOV = "governance",
  XR = "xr",
  AI = "ai",
  CORE = "core",
  SECURITY = "security",
  DEVHUB = "devhub",
  ATLAS = "atlas"
}

export enum AgentStatus {
  OFF = "OFF",
  IDLE = "IDLE",
  ACTIVE = "ACTIVE",
  THROTTLED = "THROTTLED"
}

export enum SystemMode {
  NORMAL = "NORMAL",
  THROTTLED = "THROTTLED",
  SHUTDOWN_PENDING = "SHUTDOWN_PENDING",
  SHUTDOWN = "SHUTDOWN"
}

export interface AgentDescriptor {
  id: string;
  name: string;
  domain: TamvDomain;
  status: AgentStatus;
  capabilities: string[];
  description: string;
}

export interface IsaRequest {
  id: string;
  sessionId: string;
  input: string;
  profileId: string;
  role: string;
  domain: TamvDomain;
  context?: any;
  timestamp: number;
  signature?: string;
}

export interface IsaResponse {
  id: string;
  requestId: string;
  output: string;
  agentsUsed: string[];
  msrEvents?: any[];
  flags: string[];
  confidence: number;
  timestamp: number;
}

export interface VaultContext {
  activeAgents: string[];
  sessionHistory: any[];
  securityLevel: number;
}

export interface CodexRule {
  id: string;
  description: string;
  priority: number;
}

export const CREATOR_IDENTITY = {
  profileId: "ANUBIS_VILLASENOR_001",
  wallets: ["0xANUBIS_MASTER_WALLET"],
  publicKeys: ["ANUBIS_PUB_KEY_HEX"]
};
