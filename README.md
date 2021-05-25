# devops-test

### Workflows

[Github actions workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths) descriptions

| Workflow Action | On                 | Branches         | Description                    |
| --------------- | ------------------ | ---------------- | ------------------------------ |
| nodejsCI        | ppush, pull reqush | `main` `develop` | run frontend and backend tests |
| codeql-analysis | push, pull req     | `main` `develop` | default codeql tests           |

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

| App      | Desc         | Testing Package              |
| -------- | ------------ | ---------------------------- |
| backend  | express.js   | mocha/chai, jest/supertest   |
| frontend | react.js     | jest, @testing-library/react |
| native   | react native | jest, react-test-renderer    |

### Code scanning and code security

![github CodeQL](https://github.com/github/codeql)
![github CodeQL default action](https://github.com/github/codeql-action)
![github CodeQl for Javascript](https://codeql.github.com/docs/codeql-language-guides/codeql-for-javascript/)

![sonarqube github actions integration](https://docs.sonarqube.org/latest/analysis/github-integration/)

### Application performance manager (APM)

- Elastic Cloud (ELK stack)
  - ![ELK with express](https://www.elastic.co/guide/en/apm/agent/nodejs/current/express.html)
  - ![ELK with react](https://www.elastic.co/guide/en/apm/agent/rum-js/master/react-integration.html)
- Dynatrace -![Dynatrace with react](https://www.dynatrace.com/technologies/react-monitoring/) -![Dynatrace with express](https://www.dynatrace.com/support/help/technology-support/application-software/nodejs/)

### Security information & event manager (SIEM)

- SolarWinds
- Splunk
- Cloudfare (application security)
