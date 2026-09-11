/**
 * MCP server — the piece the take-home brief calls the single
 * highest-leverage part of this project. It exposes your live financial
 * state as tools an AI assistant (like Claude) can call directly,
 * instead of a human reading a dashboard and describing it in a prompt.
 *
 * The server bootstrap (creating the server, wiring stdio transport) is
 * real, working plumbing. The tools themselves — what they actually do
 * — are your TODO.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "signal-drift-monitor",
  version: "0.0.1",
});

// TODO: server.tool("get_drift_summary", ...) — returns the current
// ProjectionSnapshot's drift flags in a form an LLM can reason about:
// which drivers are drifting, by how much, and since when.

// TODO: server.tool("explain_driver", { driverId }, ...) — given one
// driver, returns its plan vs. actual history and a plain-language
// summary of what's driving any deviation. This is the tool that most
// directly matches Peaky's own "context around why changes occur, not
// just what changed" pitch — worth spending real thought on.

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server failed to start:", err);
  process.exit(1);
});
