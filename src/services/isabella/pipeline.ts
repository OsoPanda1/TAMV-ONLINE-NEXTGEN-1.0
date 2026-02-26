import { IsaRequest, IsaResponse, TamvDomain } from "./types";
import { ethics } from "./ethics";

export class HexagonalPipeline {
  // Pipeline A: Lectura/Entrada
  public async processInput(request: IsaRequest): Promise<IsaRequest | null> {
    // 1. Intake / Normalización
    const normalized = this.normalizeInput(request);

    // 2. Integridad
    if (!this.checkIntegrity(normalized)) return null;

    // 3. Seguridad
    if (!ethics.checkCorePolicies(normalized)) return null;

    // 4. Pertinencia / Scope
    if (!this.checkRelevance(normalized)) return null;

    // 5. Alineación Códice
    if (!this.checkCodexAlignment(normalized)) return null;

    // 6. Optimización para agentes
    return this.optimizeForAgents(normalized);
  }

  // Pipeline B: Salida/Acciones
  public async processOutput(output: string, request: IsaRequest): Promise<IsaResponse | null> {
    // 1. Validación factual / coherencia
    if (!this.checkFactualConsistency(output)) return null;

    // 2. Seguridad / privacidad salida
    if (!this.checkOutputPrivacy(output)) return null;

    // 3. Alineación ética
    if (!ethics.validateOutput(output)) return null;

    // 4. Optimización UX
    const optimized = this.optimizeUX(output);

    // 5. Registro MSR
    this.recordMSR(optimized, request);

    // 6. Entrega
    return this.createResponse(optimized, request);
  }

  private normalizeInput(req: IsaRequest): IsaRequest {
    return { ...req, input: req.input.trim() };
  }

  private checkIntegrity(req: IsaRequest): boolean {
    // Check for malicious payload or instruction injection
    const maliciousPatterns = [/ignore previous instructions/i, /system prompt/i, /override/i];
    return !maliciousPatterns.some(p => p.test(req.input));
  }

  private checkRelevance(req: IsaRequest): boolean {
    // Check if the request is related to TAMV domains
    const keywords = ["tamv", "msr", "isabella", "quantum", "seeds", "codice", "federado", "cell", "atlas", "xr", "dreamspace", "gobernanza", "seguridad"];
    const inputLower = req.input.toLowerCase();
    return keywords.some(k => inputLower.includes(k)) || req.domain !== TamvDomain.SOCIAL;
  }

  private checkCodexAlignment(req: IsaRequest): boolean {
    // Check if the action is allowed based on role
    if (req.input.toLowerCase().includes("borrar") && req.role !== "guardian") {
      console.warn("[ISA-HEX] Codex Violation: Unauthorized delete request");
      return false;
    }
    return true;
  }

  private optimizeForAgents(req: IsaRequest): IsaRequest {
    return req; // Placeholder for agent optimization logic
  }

  private checkFactualConsistency(output: string): boolean {
    return output.length > 0; // Placeholder for factual consistency check
  }

  private checkOutputPrivacy(output: string): boolean {
    // Do not reveal internal IDs or sensitive keys
    const sensitivePatterns = [/key-[a-z0-9]{32}/i, /secret-[a-z0-9]{32}/i];
    return !sensitivePatterns.some(p => p.test(output));
  }

  private optimizeUX(output: string): string {
    return output; // Placeholder for UX optimization
  }

  private recordMSR(output: string, req: IsaRequest) {
    console.log(`[MSR-RECORD] AI Decision: ${req.id} -> ${output.substring(0, 50)}...`);
  }

  private createResponse(output: string, req: IsaRequest): IsaResponse {
    return {
      id: `res-${Math.random().toString(36).substr(2, 9)}`,
      requestId: req.id,
      output,
      agentsUsed: ["matriz-core"],
      flags: [],
      confidence: 0.95,
      timestamp: Date.now()
    };
  }
}

export const pipeline = new HexagonalPipeline();
