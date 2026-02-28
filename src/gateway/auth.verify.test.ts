import { describe, expect, it } from "vitest";
import { authorizeGatewayConnect, resolveGatewayAuth, isLocalDirectRequest } from "./auth.js";
import type { OpenClawConfig } from "../config/types.js";

describe("authverify key test", () => {
  it("verifies isLocalDirectRequest for 127.0.0.1", () => {
    const req = {
      socket: { remoteAddress: "127.0.0.1" },
      headers: { host: "localhost" },
    } as any;
    expect(isLocalDirectRequest(req)).toBe(true);
  });

  it("verifies key format fix (no-op as token is string)", async () => {
    const auth = resolveGatewayAuth({
      authConfig: { mode: "token", token: "test-token" }
    });
    const res = await authorizeGatewayConnect({
      auth,
      connectAuth: { token: "test-token" }
    });
    expect(res.ok).toBe(true);
  });

  it("verifies env var resolution", () => {
    const auth = resolveGatewayAuth({
      authConfig: {},
      env: { OPENCLAW_GATEWAY_TOKEN: "env-token" } as any
    });
    expect(auth.token).toBe("env-token");
    expect(auth.mode).toBe("token");
  });

  it("verifies auth resolution with config-like structure", () => {
    // Simulate what loadConfig produces from a file with gateway.auth.token
    const mockConfig: OpenClawConfig = {
      gateway: {
        auth: {
          token: "config-token"
        }
      }
    };
    
    const auth = resolveGatewayAuth({
      authConfig: mockConfig.gateway?.auth,
      env: {}
    });
    
    expect(auth.token).toBe("config-token");
    expect(auth.mode).toBe("token");
  });

  it("verifies mode priority: config mode > password > token", () => {
    const auth = resolveGatewayAuth({
      authConfig: { 
        mode: "token", 
        token: "t", 
        password: "p" 
      },
      env: {}
    });
    expect(auth.mode).toBe("token");

    const authAuto = resolveGatewayAuth({
      authConfig: { 
        token: "t", 
        password: "p" 
      },
      env: {}
    });
    // If password exists, it defaults to password mode
    expect(authAuto.mode).toBe("password");
  });
});
