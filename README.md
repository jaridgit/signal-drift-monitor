# Signal Drift Monitor

Your build of the Peaky-targeted portfolio project — a scaled-down version
of signal-based rolling forecasts with live assumption-drift detection,
built in Peaky's own stack.

This repo is scaffolding, not a finished solution: the monorepo structure,
configs, and dependency manifests are filled in; the interesting parts
(the financial formulas, the simulator, the drift detection, the
dashboard, the MCP tools) are left as `TODO`s so you actually build them.
Search the repo for `TODO` to find every one.

## Structure

```
apps/web/            Next.js dashboard (TypeScript, Tailwind)
apps/api/             Node.js service — simulator, drift pipeline, DynamoDB + Redis
apps/mcp-server/       MCP server exposing drift/summary tools to an AI assistant
packages/types/        Shared TypeScript types — the contract every app imports
packages/finance/       The financial formulas (runway, burn, drift) — TODO, unit-tested
docker-compose.yml       optional local DynamoDB + Redis
```

## One-time setup

### 1. Check your tools
```powershell
node --version   # want 20+
npm --version
```
Node/npm are already on your machine from Project 2's setup — nothing new
to install there.

### 2. Install dependencies
From the repo root (this installs every app/package's dependencies via
npm workspaces in one pass):
```powershell
npm install
```

### 3. A DynamoDB table — pick one
- **Local, easiest, no account needed:** if you have Docker Desktop,
  `docker compose up -d` from the repo root starts DynamoDB Local on
  `localhost:8002`.
- **Real AWS free tier:** create an AWS account, create a DynamoDB table
  in the console, and generate an access key under IAM. More setup, but
  real practice with the platform Peaky actually deploys on.

Either way, copy `apps/api/.env.example` to `apps/api/.env` and fill in
the DynamoDB settings.

### 4. A Redis / Valkey instance — pick one
- **Hosted, free (recommended):** create a free database at
  [upstash.com](https://upstash.com), copy its connection URL.
- **Local via Docker:** already covered by the same `docker compose up -d`
  above — use `redis://localhost:6379`.

Add it to `apps/api/.env` as `REDIS_URL`.

### 5. Claude Code
Already installed from Project 2. Just run `claude` from this repo's root
when you're ready to start building.

### 6. Run it
```powershell
npm run dev
```
Turborepo runs every app's `dev` script in parallel — the API, the MCP
server, and the Next.js dashboard all start together.

## Build order

Follow the phases from the Signal Drift Monitor brief:
1. `packages/finance` — the formulas, unit-tested, before anything depends on them
2. `apps/api/src/db.ts` + `cache.ts` — wire up DynamoDB and Redis
3. `apps/api/src/simulator.ts` + `pipeline.ts` — generate actuals, run the drift pipeline
4. `apps/web` — the dashboard
5. `apps/mcp-server` — expose it to an AI assistant
