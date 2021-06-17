# devops-test

### Table of Contents

- [Workflows](#Workflows)
- [Branching strategies](#Branching-strategies)
- [Testing packages](#Testing-packages)
- [Code scanning and code security](#Code-scanning-and-code-security)
- [Application performance manager (APM)](<#Application-performance-manager-(APM)>)
- [Security information & event manager (SIEM)](<#Security-information-&-event-manager-(SIEM)>)
- [CIAM](#CIAM)
- [ITSM/ITOM](#ITSM/ITOM)
- [Containerization](#Containerization)
- [Pipeline strategy](#Pipeline-strategy)
- [Devops Test - Overkill Todo App](#Overkill-todo-app)

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

### Testing packages

| App      | Desc                | Testing Package              |
| -------- | ------------------- | ---------------------------- |
| backend  | express.js, graphQL | mocha/chai, jest/supertest   |
| frontend | react.js            | jest, @testing-library/react |
| native   | react native        | jest, react-test-renderer    |

`cypress` - the ultimate end to end, integration, unit testing framework

### Code scanning and code security

- [github CodeQL](https://github.com/github/codeql)
- [github CodeQL default action](https://github.com/github/codeql-action)
- [github CodeQl for Javascript](https://codeql.github.com/docs/codeql-language-guides/codeql-for-javascript/)
- [sonarqube github actions integration](https://docs.sonarqube.org/latest/analysis/github-integration/)
- [sonarcloud github actions integration](https://github.com/SonarSource/sonarcloud-github-action)
- [sonarsource CS db](https://rules.sonarsource.com/typescript/type/Security%20Hotspot/RSPEC-2068)

### Application performance manager (APM)

- Elastic Cloud (ELK stack)
  - [ELK with express](https://www.elastic.co/guide/en/apm/agent/nodejs/current/express.html)
  - [ELK with react](https://www.elastic.co/guide/en/apm/agent/rum-js/master/react-integration.html)
- Dynatrace -[Dynatrace with react](https://www.dynatrace.com/technologies/react-monitoring/) -[Dynatrace with express](https://www.dynatrace.com/support/help/technology-support/application-software/nodejs/)
- Splunk APM

[Link](https://prd-p-uzn2b.splunkcloud.com) to splunk cloud

### Security information & event manager (SIEM)

- Splunk SIEM
- Cloudfare (application security)

### CIAM

- Azure b2c
- Amazon

### ITSM/ITOM

- ServiceNow

### Containerization

- Docker
- [docker x cypress](https://www.mariedrake.com/post/using-docker-to-run-your-cypress-tests)
- Kubernetes
- [AKS tut](https://azure.microsoft.com/mediahandler/files/resourcefiles/kubernetes-learning-path/Kubernetes%20Learning%20Path%20version%201.0.pdf)
- [Some notes on K8s](kubernetes.md)

### Pipeline strategy

Pipline strategy describes the devops for [Code development](#Code-development) and [Pull requests](#Pull-requests)

#### Code development

##### Pre-development

1. Create a new branch with appropriate name
2. Pull branch to local repo
3. Install dependencies

##### Locally

1. Write the code with sonarLint
2. Write the tests in `__tests__` or `cypress/integration`
3. Run tests and check if passed

##### Pre-deployment

1. Ensure Dockerfile is correct
2. Commit changes to your new branch

##### Deployment

1. Push to github
2. Ensure Github Workflow Actions:

- Runs and passes your tests
- Passed sonarcloud scan
- If `develop` or `main` branch, Docker image built, pushed to registry and deployed to AKS

#### Pull requests

1. Assuming that the Code development process is complete
2. Open a pull request to merge your branch into desired branch
3. If `develop` or `main`, request and wait for reviewers to approve, ensure tests passed
4. Pull request will be auto-merged

### Overkill Todo App

Some documentation regarding the todo devops test app.

| Repository                                                                    | Platform       | Service                       |
| ----------------------------------------------------------------------------- | -------------- | ----------------------------- |
| [web-main](https://github.com/danielliewytl/web-main)                         | `react`        | web frontend                  |
| [todo-app-mobile-main](https://github.com/danielliewytl/todo-app-mobile-main) | `react-native` | mobile frontend               |
| [todo-app-gql-backend](https://github.com/danielliewytl/todo-app-gql-backend) | `graphql`      | handle todos                  |
| [todo-app-backend](https://github.com/danielliewytl/todo-app-backend)         | `express`      | handle todos                  |
| [todo-app-socket-cr](https://github.com/danielliewytl/todo-app-socket-cr)     | `socket.io`    | realtime comments and replies |

#### CI/CD plans

Project to be served in a Kubernetes cluster on Azure Kubernetes Service (AKS). Each app should be containerized.

Containerization: Docker

APM/SIEM option: ELK Stack

Code scanning/Code Vulnerability: sonarcloud, sonarLint

ITSM/ITOM: ServiceNow

Github Actions:

- testing
- docker
- sonarcloud integration

See more details below.

#### `web-main`

Typescript, react

##### Features:

- user auth Azure IAM (todo upon Azure access)
- todos server via express (Kuala Lumpur) or graphql (Petaling Jaya)
- todos comments and replies via socketio server
- material-UI component library

##### CI/CD:

- cypress testing

#### `todo-app-mobile-main`

Typescript, react native

#### `todo-app-gql-backend`

Javascript, apollo server

##### Features

- Azure Mssql data source (todo upon Azure access)
- graphql server
  - introspection off upon production

##### CI/CD

- cypress testing

#### `todo-app-backend`

Typescript, express

##### Features

- Azure Mssql data source (todo upon Azure access)
- express server

##### CI/CD

- cypress testing
- Github Actions:
  - generate cypress report
  - docker build, push to Azure Registry
  - sonarcloud scan

#### `todo-app-socket-cr`

Typescript, socketio

- MongoDB document store
- socketio server
  - routing can be configurable
