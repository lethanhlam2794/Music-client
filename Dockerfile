FROM node:24-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system nodejs && useradd --system --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
