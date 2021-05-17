# devops-test

### Workflows

[Github actions workflow](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths) descriptions

| Workflow Action | On   | Description                    |
| --------------- | ---- | ------------------------------ |
| nodejsCI        | push | run frontend and backend tests |

### Branching strategies

Based on [git flow](atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

| Branch  | Description                    | Merge to |
| ------- | ------------------------------ | -------- |
| main    | official release branch        | -        |
| develop | development and testing branch | release  |
| release | release versions               | main     |
| feature | rollout features               | develop  |
| hotfix  | quick bug/feature fixes        | main     |
