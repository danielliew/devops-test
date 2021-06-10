# Kubernetes Azure

### Kubernetes

- Container orchestrator
- Distributed systems application environment
- Containers
  - packaged applications
  - isolated environment
  - ease of distribution
- Cloud native

### Service Mesh

- load balancing
  - Traditional N -> S (user, gateway, services)
  - Service mesh E -> W (between services)
- App + sidecar
- service auth (talk to/talked to)
- experimentation/canary deployment, network traffic splitting
- collect metrics (latency, http errs, user agents, etc.)
  - send to Azure Monitoring/prometheus etc.
- SMI
  - APIs registered with K8s
  - providers like Consul, Jstio, linkerD
  - tooling

### Operators

- Human operator -> Operating system -> K8s operator
- core Apis or add new `/myapi`
- Operator is a pod running on the cluster
  - can schedule more pods to perform tasks, backups/restoration/updated
  - current state to match desired state
- Helm, dynatrace, different services often have their own operators

### Monitoring and Alerting

- CPU, Mem, Net, Disk -> metric server -> service Azure/prometheus
- prometheus API - standard for exposing metrics
- alerting for important metrics - latency, SLO (server load obj eg. <500ms 99th percentile)
  - visualization tool eg. grafana
  - build automations to address the alerts

### Pods and pods lifecycle

- contains containers eg. app, server, sidecar

1. Pending
   - Scheduler looks at resources and find a VM node based on eg. 1.0 CPU, 26 MEM
2. Creating
   - Pull image eg. Docker Image, down to the node
   - skipped if image already exists
3. Running
   - if process crashes, pod restarts.
   - if restart too many times pod state = CrashLoop Backoff

`kubectl get pods`
`kubectl describe pods`

- lifecycle hooks
  - /health /ready /postStart /preStop
- init container - runs before all other containers

### Admission Controller

- Called after RBAC authe and authn
- webhooks /validating /mutating

### Production environment

- Cluster security
  - API and contents are a security boundary for application
  - RBAC - dev vs operator, CI/CD pipeline only way to modify or add code - validatyion, code vulnurability
  - intrusion, vulnurablity detection - daemonSet
  - Monitoring solution
  - testing all processes
  - regional clusters, traffic splitting if natural disasters, failovers
    - cross region replication of data - cosmosDB

### RBAC

- role based access control
- multiple people, different capabilities
- role
  - verb: get, list...
  - nouns: pods, volumes...
- role binding
  - map between user and multiple role
  - can define group/team of users
- namespace vs cluster resource
  - namespace is a cluster inside a k8s cluster
  - eg. /my-team/pods /your-team/pods
  - RoleBinding vs ClusterRoleBinding

### Configuration Management

- fn(config) for Pods and Imgs
- ConfigMap
  - key: value
  - mount as a volume, associate with pod
- EnvVar
  - key: value
  - getenv(key)
- Secret
  - key: value
  - passwords/credentials etc
  - secret volume in a pod mount to directory
  - KMS to encrypt key in etcd
- value can be contents of a file
- rollout different configurations
- templating tools eg. helm

### Stateful applications

- ReplicaSet
  - random identifier, random deletion
- StatefulSet
  - replicas have indices, stable hostnames, deletes the last replica
  - with or without persisent volume claim

### Volumes and storage

- Volume can be mounted onto pods
- K8s - PersistentVolume - AzureDisk/NFS/iSCSI
- PersistentVolumeClaim - abstract between any storage system
