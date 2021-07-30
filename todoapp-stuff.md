### kubernetes commands

```bash
az aks create --resource-group test-resources --name ytlTodo --node-count 2 --node-vm-size standard_d1 --generate-ssh-keys --attach-acr ytldevtest

# sync kubectl credentials with cluster
az aks get-credentials --resource-group test-resources --name ytlTodo

# apply config
kubectl apply -f <file>
kubectl delete -f <file>

# get cluster specific dns zone name
az aks show --resource-group test-resources --name ytlTodo --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

# http routing
az aks enable-addons --resource-group test-resources --name ytlTodo --addons http_application_routing

az aks disable-addons --addons http_application_routing --name ytlTodo --resource-group test-resources --no-wait

# github action credentials
az ad sp create-for-rbac --sdk-auth
```
