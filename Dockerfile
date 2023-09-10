# Make the Node version into a variable so that it may be updated easily if / when needed. (ie "20.1.0")
ARG nodeVersion

# Using a node image itself so the app may be started and stoped more directly.
FROM node:${nodeVersion} AS deps

WORKDIR /app

COPY package.json yarn.lock* .yarnrc.yml ./
COPY .yarn ./.yarn

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apt-get install -y libc6-compat
RUN apt-get update && apt-get -qy install openssl
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM deps AS builder

WORKDIR /app

RUN yarn prisma:generate && \
    yarn build

COPY . .

# Production image, copy all the files and run next
FROM node:${nodeVersion} AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/server.js /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env .

USER nextjs

# Inside the container, start the server.
# Only if `NO_AUTO_START` is NOT set.
# Otherwise, tail nothing so a process will continue and the container will run.
CMD ["bash", "-c", "if [ -z ${NO_AUTO_START} ]; then node /app/server.js; else tail -f /dev/null; fi"]