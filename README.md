# Signal Drift Monitor

**Live dashboard:** https://signal-drift-monitor.vercel.app (auto-deploys from `main`)

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

## Starting the project

Do this every time you sit down to work on the project (not just once):

```powershell
# 1. Open Docker Desktop from the Start menu and wait ~30-60s for it to
#    fully load — this is the app that keeps the local database + cache
#    running in the background. Skip this step if it's already open.

docker compose up -d   # 2. starts the local DynamoDB (port 8002) and Redis (port 6379) containers

docker compose ps      # 3. check that both containers show status "Up" before continuing

npm run dev            # 4. starts the website, API, and MCP server together, and watches for code changes
```

When you're done for the session:
```powershell
# Press Ctrl+C in the npm run dev terminal to stop the app.
docker compose down     # stops and removes the DynamoDB + Redis containers
```
(It's also fine to leave the containers running and just close Docker
Desktop — they'll stop on their own and restart next time you run
`docker compose up -d`.)

## Using GitHub

```powershell
git add .                            # stages every changed file, marking it to be included in the next commit
git commit -m "describe your change" # saves a snapshot of the staged changes with a message explaining what changed
git push                             # uploads your local commits to GitHub
```

Pushing to `main`, or opening a pull request into it, automatically
triggers the CI pipeline defined in `.github/workflows/ci.yml`. It checks
out your code, installs dependencies, and runs lint, test, and build —
catching mistakes before they land on `main`.

## Build order

Follow the phases from the Signal Drift Monitor brief:
1. `packages/finance` — the formulas, unit-tested, before anything depends on them
2. `apps/api/src/db.ts` + `cache.ts` — wire up DynamoDB and Redis
3. `apps/api/src/simulator.ts` + `pipeline.ts` — generate actuals, run the drift pipeline
4. `apps/web` — the dashboard
5. `apps/mcp-server` — expose it to an AI assistant
