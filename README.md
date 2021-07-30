# devops-test

### Before you start reading this

This repo is and this readme is a written and codebase documentation of my exploration of devops practices for my internship at YTL Cement Berhad.

Not all the tools and libraries documented below are used in the final full devops test ie. [Overkill Todo App](#Overkill-todo-app)

But if you are interested, see [Pipeline strategy](#Pipeline-strategy) for the Devops stack that was implemented for the overkill todo app.

### Table of Contents

- [Workflows](#Workflows)
- [Branching strategies](#Branching-strategies)
- [Testing packages](#Testing-packages)
- [Code scanning and code security](#Code-scanning-and-code-security)
- [Project Planning](#Project-Planning-Options)
- [Application performance manager (APM)](<#Application-performance-manager-(APM)-Options>)
- [Security information & event manager (SIEM)](<#Security-information-&-event-manager-(SIEM)-Options>)
- [CIAM](#CIAM-Options)
- [ITSM/ITOM](#ITSM/ITOM-Options)
- [Containerization](#Containerization)
- [Pipeline strategy](#Pipeline-strategy)
- [Full Devops Test - Overkill Todo App](#Overkill-todo-app)

### Workflows

[Github actions workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths) descriptions

| Workflow Action | On                 | Branches         | Description                         |
| --------------- | ------------------ | ---------------- | ----------------------------------- |
| nodejsCI        | push, pull request | `main` `develop` | run frontend and backend tests      |
| codeql-analysis | push, pull req     | `main` `develop` | default codeql tests                |
| cypress-report  | push, pull req     | `main` `develop` | run cypress tests                   |
| cypress         | push, pull req     | `main` `develop` | run developer written cypress tests |
| sonarcloud      | push, pull req     | `main` `develop` | run sonarcloud CI CS                |

### Branching strategies

![GitFlow](assets/Screen%20Shot%202021-05-18%20at%209.51.04%20AM.png)

Based on [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

| Branch  | Description                    | Merge to |
| ------- | ------------------------------ | -------- |
| main    | official release branch        | -        |
| develop | development and testing branch | release  |
| release | release versions               | main     |
| feature | rollout features               | develop  |
| hotfix  | quick bug/feature fixes        | main     |

Clickup can automatically tag commits under a branch with CU-<id> or commits with the message CU-<id>

### Testing packages

| App      | Desc                | Testing Package                 |
| -------- | ------------------- | ------------------------------- |
| backend  | express.js, graphQL | mocha/chai, jest/supertest, cy  |
| frontend | react.js            | jest, @testing-library/react,cy |
| native   | react native        | jest, react-test-renderer       |

`cypress`

- the ultimate end to end, integration, unit testing framework
- only runs in the browser, so native functions would still require jest, etc.
- can test frontends and backends

### Code scanning and code security

- [github CodeQL](https://github.com/github/codeql)
- [github CodeQL default action](https://github.com/github/codeql-action)
- [github CodeQl for Javascript](https://codeql.github.com/docs/codeql-language-guides/codeql-for-javascript/)
- [sonarqube github actions integration](https://docs.sonarqube.org/latest/analysis/github-integration/)
- [sonarcloud github actions integration](https://github.com/SonarSource/sonarcloud-github-action)
- [sonarsource CS db](https://rules.sonarsource.com/typescript/type/Security%20Hotspot/RSPEC-2068)

Run sonarlint locally via [vs code extension](https://www.sonarlint.org/vscode)

### Project Planning Options

- Jira
- Github Kanban
- Clickup

### Application performance manager (APM) Options

- Elastic Cloud APM (ELK observability stack)
  - [ELK with express](https://www.elastic.co/guide/en/apm/agent/nodejs/current/express.html)
  - [ELK with react](https://www.elastic.co/guide/en/apm/agent/rum-js/master/react-integration.html)
  - Observations:
    - simple setup
    - works with ServiceNow to create tickets for error thresholds/other configurable parameters
    - can integrate with Microsoft Teams, Github
- Dynatrace -[Dynatrace with react](https://www.dynatrace.com/technologies/react-monitoring/) -[Dynatrace with express](https://www.dynatrace.com/support/help/technology-support/application-software/nodejs/)
- Splunk APM [Link](https://prd-p-uzn2b.splunkcloud.com) to splunk cloud

### Security information & event manager (SIEM) Options

- Splunk SIEM
- Cloudfare (application security)

### CIAM Options

- Azure b2c
- Amazon

### ITSM/ITOM Options

- ServiceNow

### Containerization

- Docker
  - [docker x cypress](https://www.mariedrake.com/post/using-docker-to-run-your-cypress-tests)
- Kubernetes
  - [AKS tut](https://azure.microsoft.com/mediahandler/files/resourcefiles/kubernetes-learning-path/Kubernetes%20Learning%20Path%20version%201.0.pdf)
- [My notes on K8s](kubernetes.md)

### Pipeline strategy

#### Devops stack

Project planning and management:

- Clickup
- ServiceNow

Code languages:

- Javascript
- Typescript
- gql
- SQL

Code stacks:

- React
- React Native
- Express
- GraphQL
- NestJS
- Socket.io

Code Tests:

- cypress
- jest

Containerization:

- Docker

Cloud tools:

- Github
- ElasticCloud APM
- Sonarcloud
- Azure Container Registry
- Azure Key Vault

Cloud hosting:

- Azure Kubernetes Service

IDE:

- VSCode
  - SonarLint
  - GitLens
  - Git Graph

Below are steps for what to do when writing code and how the pull request workflow works

#### Code development

##### Pre-development

- Clone the github repo and install dependencies if you dont have the code locally yet
- Ensure Github is linked to the Clickup space

1. Open Clickup task
2. Create a new branch with appropriate name
3. Switch to the branch on local repo

##### Locally

1. Write the code with sonarLint enabled (helps to pass sonarCloud workflow check)
2. Write or put the tests in `__tests__` or `cypress/integration` folder (depending on which testing library is used)
3. Run tests and check if passed

##### Pre-deployment

1. Ensure Dockerfile is unchanged or correct
2. Ensure Kubernetes manifests are unchanged or correct
3. Stage and commit changes

##### Deployment

1. Push to github
2. Ensure Github Workflow Actions (if pushing to protected branch with workflows enabled):

- Runs and passes your tests
- Passed sonarcloud scan
- If `develop` or `main` branch, Docker image built, pushed to registry and deployed to AKS (ingress deployed separately)

#### Pull requests

1. Assuming that the Code development process is complete
2. Open a pull request via Clickup task
3. If `develop` or `main`, request and wait for reviewers to approve, ensure tests passed
4. Pull request will be auto-merged

You can also tag the pull request with a version release if needed.

### Overkill Todo App

Some documentation regarding the todo devops test app: a todo app with overkill CI/CD and microservice architecture

| Repository                                                                 | Platform       | Service                       |
| -------------------------------------------------------------------------- | -------------- | ----------------------------- |
| [web-main](https://github.com/danielliew/web-main)                         | `react`        | web frontend                  |
| [todo-app-mobile-main](https://github.com/danielliew/todo-app-mobile-main) | `react-native` | mobile frontend               |
| [todo-app-gql-backend](https://github.com/danielliew/todo-app-gql-backend) | `graphql`      | handle todos                  |
| [todo-app-backend](https://github.com/danielliew/todo-app-backend)         | `express`      | handle todos                  |
| [todo-app-socket-cr](https://github.com/danielliew/todo-app-socket-cr)     | `socket.io`    | realtime comments and replies |

#### CI/CD plans

Project to be served in a Kubernetes cluster on Azure Kubernetes Service (AKS). Each app should be containerized.

Github Actions:

- testing
- docker
- sonarcloud integration

#### Actual CI/CD

See [todo app backend](https://github.com/danielliew/todo-app-backend) for an example of a fully configured CI/CD repo.

CI/CD Features:

- Clickup integration (CU-<id> in commits/branch names)
- Github workflows linked to Azure AKS and Azure CR for deployment on the `main` and `*develop` branches
- Cypress workflows to run `npm run test:chrome` and publish cypress reports to Github Pages
- Kubernetes files: `todo-backend-app.yaml` (manifest) and `todo-ingress.yaml` (ingress controller)
- protected `main` and `*develop` branches
  - requires at least 1 reviewer for pull requests and a review by code owner

#### `todo-app-backend`

Typescript, express

##### Features

- Azure Mssql data source
- express server

##### CI/CD

- cypress testing
- Github Actions:
  - generate cypress report
  - docker build, push to Azure Registry
  - sonarcloud scan

#### `todo-app-gql-backend`

Javascript, apollo server

##### Features

- Azure Mssql data source
- graphql server
  - introspection off upon production

##### CI/CD

- cypress testing

#### `web-main`

Typescript, react

##### Features:

- todos server via express (Kuala Lumpur) or graphql (Petaling Jaya)
- todos comments and replies via socketio server
- material-UI component library

##### CI/CD:

- cypress testing

#### `todo-app-mobile-main`

Typescript, react native

#### `todo-app-socket-cr`

Typescript, socketio

- MongoDB document store
- socketio server
  - routing can be configurable

#### `todo-app-nest`

Authentication server with nestjs that implements jwt auth via passport

- mongodb
- jest testing
- rbac auth in k8s cluster

#### `todo-app-auth`

Microservice authentication and security

- via the nest auth app

api gateway options:

- [nest](https://docs.nestjs.com/websockets/gateways)
- [express gateway](https://www.express-gateway.io/docs/)
- Azure:
  - [application gateway](https://docs.microsoft.com/en-gb/azure/application-gateway/overview)
  - [ingress controller](https://docs.microsoft.com/en-us/azure/application-gateway/ingress-controller-overview)
  - front door, load balancer, traffic manager
