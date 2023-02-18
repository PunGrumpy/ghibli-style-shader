FROM node:19 AS dependencies

WORKDIR /home/node/app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:19 AS runner

WORKDIR /home/node/app

COPY --from=dependencies /home/node/app/node_modules ./node_modules

COPY . .

RUN npm run start