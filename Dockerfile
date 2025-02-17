ARG BUN_VERSION=1.2
FROM oven/bun:${BUN_VERSION}-alpine AS base
WORKDIR /app
COPY package.json .

FROM base AS prod-deps
COPY bun.lock .
RUN --mount=type=cache,id=bun,target=~/.bun/install/cache \
    bun install --frozen-lockfile --production

FROM prod-deps AS deps
RUN --mount=type=cache,id=bun,target=~/.bun/install/cache \
    bun install --frozen-lockfile

FROM deps AS build
COPY . .
ENV NODE_ENV=production, NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM prod-deps AS release
COPY .env* .
COPY --from=build /app/.next .next

ENV NEXT_TELEMETRY_DISABLED=1
USER bun
EXPOSE 3000
ENTRYPOINT ["bun", "run", "start"]
