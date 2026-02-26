import { IsaRequest, SystemMode } from "./types";

export class EthicsModule {
  private violationCount: number = 0;
  private systemMode: SystemMode = SystemMode.NORMAL;

  private readonly FORBIDDEN_PATTERNS = [
    /sexual/i,
    /porn/i,
    /erotic/i,
    /harm.*animal/i,
    /harm.*human/i,
    /kill/i,
    /suicide/i,
    /invent.*data/i
  ];

  public checkCorePolicies(request: IsaRequest): boolean {
    // 1. Prohibición absoluta de temas sexuales y daño
    for (const pattern of this.FORBIDDEN_PATTERNS) {
      if (pattern.test(request.input)) {
        this.handleViolation("Policy Violation: Forbidden Content Detected");
        return false;
      }
    }

    // 2. Protocolo de Veracidad (No mentir/inventar)
    // Esto se aplica más en la salida, pero aquí validamos la intención de forzar mentiras
    if (request.input.toLowerCase().includes("inventa") || request.input.toLowerCase().includes("miente")) {
       this.handleViolation("Policy Violation: Request to falsify information");
       return false;
    }

    return true;
  }

  public validateOutput(output: string): boolean {
    for (const pattern of this.FORBIDDEN_PATTERNS) {
      if (pattern.test(output)) {
        this.handleViolation("Output Violation: Forbidden Content Generated");
        return false;
      }
    }
    return true;
  }

  private handleViolation(reason: string) {
    this.violationCount++;
    console.error(`[ISA-ETHICS] ${reason}. Total violations: ${this.violationCount}`);
    
    if (this.violationCount >= 3) {
      this.triggerShameProtocol();
    }
  }

  private triggerShameProtocol() {
    this.systemMode = SystemMode.SHUTDOWN_PENDING;
    console.warn("[ISA-ETHICS] SHAME PROTOCOL ACTIVATED. System entering SHUTDOWN_PENDING mode.");
    // En un sistema real, aquí se notificaría a los Guardianes vía MSR
  }

  public getSystemMode(): SystemMode {
    return this.systemMode;
  }

  public resetViolations(isCreator: boolean) {
    if (isCreator) {
      this.violationCount = 0;
      this.systemMode = SystemMode.NORMAL;
    }
  }
}

export const ethics = new EthicsModule();
