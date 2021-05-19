# devops-test

### Workflows

[Github actions workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths) descriptions

| Workflow Action | On   | Branches         | Description                    |
| --------------- | ---- | ---------------- | ------------------------------ |
| nodejsCI        | push | `main` `develop` | run frontend and backend tests |

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

| App      | Desc       | Testing Package              |
| -------- | ---------- | ---------------------------- |
| backend  | express.js | mocha, chai                  |
| frontend | react.js   | jest, @testing-library/react |
