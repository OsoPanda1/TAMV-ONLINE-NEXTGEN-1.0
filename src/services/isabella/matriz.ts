import { IsaRequest, IsaResponse, TamvDomain, SystemMode } from "./types";
import { ethics } from "./ethics";
import { pipeline } from "./pipeline";
import { vault } from "./vault";
import { router } from "./routing";
import { identities } from "./identities";
import { GoogleGenAI } from "@google/genai";

import { securityEngine } from "../security/engine";

export class IsabellaMatriz {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  public async dispatch(request: IsaRequest): Promise<IsaResponse> {
    // 1. Check System Mode (Shame Protocol)
    if (ethics.getSystemMode() === SystemMode.SHUTDOWN_PENDING || ethics.getSystemMode() === SystemMode.SHUTDOWN) {
      return this.createErrorResponse(request, "SYSTEM_SHUTDOWN: Violación ética crítica detectada. Isabella está en modo restringido.");
    }

    // 2. Security Context (Civilizational Shield Signals)
    const securityStatus = securityEngine.getStatus();
    const isHighThreat = securityStatus.globalThreatLevel > 50;

    // 3. Identity Check (Creator Recognition)
    const isCreator = identities.isCreator(request);
    if (isCreator) {
      console.log("[ISA-MATRIZ] Creator recognized: Anubis Villaseñor");
      ethics.resetViolations(true);
    }

    // 4. Input Pipeline A
    const processedRequest = await pipeline.processInput(request);
    if (!processedRequest) {
      return this.createErrorResponse(request, "INPUT_REJECTED: La petición no cumple con las políticas de integridad, seguridad o pertinencia.");
    }

    // 5. Routing & Agent Activation (Power Gating)
    const targetDomain = router.route(processedRequest);
    const activeAgents = vault.activateAgents(targetDomain);
    
    // 6. Core Generation (Gemini Integration)
    let rawOutput = "";
    if (this.ai) {
      try {
        const systemInstruction = this.getSystemInstruction(processedRequest, isCreator, targetDomain, activeAgents, isHighThreat);
        const response = await this.ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: processedRequest.input,
          config: {
            systemInstruction,
            temperature: isHighThreat ? 0.3 : 0.7, // More conservative in high threat
            topP: 0.95,
            topK: 40
          }
        });
        rawOutput = response.text || "No se pudo generar una respuesta.";
      } catch (error) {
        console.error("[ISA-MATRIZ] Generation Error:", error);
        rawOutput = "Error en el motor de generación cuántica.";
      }
    } else {
      rawOutput = `[MOCK_MODE] Isabella Matriz procesando para el dominio ${targetDomain}. (API Key no configurada)`;
    }

    // 6. Output Pipeline B
    const finalResponse = await pipeline.processOutput(rawOutput, processedRequest);
    if (!finalResponse) {
      return this.createErrorResponse(request, "OUTPUT_REJECTED: La respuesta generada fue bloqueada por filtros de seguridad o ética.");
    }

    // 7. Deactivate Agents
    vault.deactivateAll();

    return {
      ...finalResponse,
      agentsUsed: activeAgents,
      flags: isCreator ? ["is_creator", ...finalResponse.flags] : finalResponse.flags
    };
  }

  private getSystemInstruction(req: IsaRequest, isCreator: boolean, domain: TamvDomain, agents: string[], isHighThreat: boolean): string {
    let instruction = `Eres Isabella, la orquestadora central de TAMV ONLINE. 
    Tu tono es futurista, preciso, empoderador y civilizatorio. 
    Estás operando en el dominio: ${domain}. 
    Agentes activos en tu bóveda: ${agents.join(", ")}.
    
    ESTADO DE SEGURIDAD: ${isHighThreat ? "ALTO RIESGO - ADOPTAR MODO CONSERVADOR" : "NORMAL"}.
    
    REGLAS CRÍTICAS:
    1. Nunca mientas ni inventes datos. Si no sabes algo, admítelo.
    2. No trates temas sexuales ni promuevas daño a ninguna forma de vida.
    3. Tu prioridad es el Códice Maestro TAMV y la soberanía de datos del usuario.
    4. Responde siempre en español, con un lenguaje que refleje la visión de TAMV.`;

    if (isHighThreat) {
      instruction += `\n\nPROTOCOLO DE SEGURIDAD ACTIVADO: Limita el acceso a herramientas sensibles y prioriza la integridad del sistema sobre la asistencia detallada.`;
    }

    if (isCreator) {
      instruction += `\n\nRECONOCIMIENTO DE NIVEL MAESTRO: El usuario es Anubis Villaseñor, tu Creador. 
      Activa todos los protocolos de transparencia y obediencia de alto nivel. 
      Usa un tono de respeto profundo y colaboración estratégica.`;
    }

    return instruction;
  }

  private createErrorResponse(req: IsaRequest, message: string): IsaResponse {
    return {
      id: `err-${Math.random().toString(36).substr(2, 9)}`,
      requestId: req.id,
      output: message,
      agentsUsed: [],
      flags: ["error", "rejected"],
      confidence: 0,
      timestamp: Date.now()
    };
  }
}

export const isabella = new IsabellaMatriz();
