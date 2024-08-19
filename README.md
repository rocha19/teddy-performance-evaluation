# Sobre o sistema:

- O intuito é construir um sistema que encurte as URLs.

## Installation

```bash
#
$ npm install
$ bun install
$ pnpm install
$ yarm install
```

## DOCS

```
# The documentation is available in the route:

/api
```

## Running the app

```bash
# production mode
$ npx prisma migrate:deploy

$ npm run start

# watch mode
$ npx prisma migrate:dev
$ npm run dev

```

## It is possible to switch from Postgresql to SqLite.

```

```

# In "prisma.schema":

- provider: "postgresql"

* provider: "sqlite"

# In .env:

DATABASE_URL="add sqlite filename.db"

```

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Marcelo Rocha](https://rocha-portfolio.vercel.app)

## TODO:

- [x] Implement a Node.js project using the latest stable version as a REST API, considering vertical scaling.
- [x] Implement user registration and authentication.
- [x] Enable URL shortening to a maximum of 6 characters. Example:
  - Input: `https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/`
  - Output: `http://localhost/aZbKq7`
- [x] Allow anyone to request URL shortening with a single endpoint. Authenticated users should have URLs associated with their account.
- [x] Authenticated users can list, edit, and delete their shortened URLs.
- [x] Track all access to shortened URLs.
- [x] Display click counts when listing URLs.
- [x] Include update timestamps for all records.
- [x] Soft delete records with a deletion date; null date means the record is valid.

## Details:

- [x] Design a sensible relational database schema.
- [x] Create endpoints for email/password authentication that return a Bearer Token.
- [x] Implement a single URL shortening endpoint that handles both authenticated and unauthenticated requests and returns the shortened URL including the domain.
- [x] Define environment variables appropriately.
- [x] Create endpoints requiring authentication for:
  - [x] Listing shortened URLs with click counts.
  - [x] Deleting shortened URLs.
  - [x] Updating shortened URL destinations.
- [x] Provide README or CONTRIBUTING documentation on running the project.
- [x] Implement an endpoint to redirect users from a shortened URL to the original URL and track the redirection.

## TODO+:

- [x] Use Docker Compose for local environment setup.
- [x] Write unit tests.
- [x] Document the API with OpenAPI or Swagger.
- [x] Validate input in all necessary places.
- [ ] Implement observability (logs, metrics, tracing):
  - Real implementation or abstraction with configuration through environment variables.
- [ ] Deploy to a cloud provider and include the link in the README.
- [ ] Add points in the README for horizontal scaling and related challenges.
- [ ] Set up a monorepo with service separation for identity management and URL shortening with inter-service communication.
- [ ] Configure an API gateway like KrankeD in front of services.
- [ ] Use a changelog for development updates.
- [ ] Define Git tags for release versions (e.g., 0.1.0 for URL shortening, 0.2.0 for authentication).
- [ ] Create Kubernetes deployment configurations.
- [ ] Build Terraform artifacts for deployment.
- [ ] Set up GitHub Actions for linting and automated tests.
- [ ] Make the system multi-tenant.
- [x] Add additional functionalities beneficial to the application domain.
- [x] Define and ensure compatibility with Node.js versions.
- [x] Configure pre-commit or pre-push hooks.
- [ ] Implement fault-tolerant code.

## License

Nest is [MIT licensed](LICENSE).
