import { IsaRequest, TamvDomain } from "./types";

export class IntentRouter {
  public route(request: IsaRequest): TamvDomain {
    const input = request.input.toLowerCase();

    if (input.includes("aprender") || input.includes("curso") || input.includes("estudiar")) {
      return TamvDomain.LEARN;
    }
    if (input.includes("dinero") || input.includes("seeds") || input.includes("quantum") || input.includes("comprar")) {
      return TamvDomain.ECONOMY;
    }
    if (input.includes("dreamspace") || input.includes("xr") || input.includes("metaverso")) {
      return TamvDomain.XR;
    }
    if (input.includes("seguridad") || input.includes("msr") || input.includes("blockchain") || input.includes("hack")) {
      return TamvDomain.SECURITY;
    }
    if (input.includes("codigo") || input.includes("programar") || input.includes("devhub") || input.includes("api")) {
      return TamvDomain.DEVHUB;
    }
    if (input.includes("gobernanza") || input.includes("votar") || input.includes("ley") || input.includes("codice")) {
      return TamvDomain.GOV;
    }

    return request.domain || TamvDomain.SOCIAL;
  }
}

export const router = new IntentRouter();
