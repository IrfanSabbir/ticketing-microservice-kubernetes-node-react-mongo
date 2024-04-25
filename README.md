# ticketing-microservice-Kubernetes-node-react-mongo
It's a microservice-based app, aimed to solve real-time ticketing problems. It's Developed based on the same wonderful technology. Mostly focus on the MERN stack. And for infrastructure related tools used Docker, Kubernetes, Nginx, and more

# To run this project, run => 
## => skaffold dev

Must run it on the root project folder.
### Skaffold dev will under the hood read all the k8s deployment files from the infra/k8s directory and build a docker image and k8 pod deployment accordingly.

### Besidie will always look at the changes on the ts file and for other file changes, it will build the docker image again and re-run. No extra command is required.

chorme locally run issue
## write => thisisunsafe (for chorme)


# Adding Global secret value to access in different service
## => kubectl create secret generic jwt-secret --fromm-literal=JWT_KEY=ASDHSECRETKEY

# Namespace

## => kubectl get namespace
## => kubectl get service -n name-of-the-namespace (-n ingress-nginx)


# New Docker build and docker hub image push
## => docker build -t irfanuddin/tickets . (irfanuddin: docker hub user name, ticket image name)
## => docker push irfanuddin/tickets


# Update common package to npm
### Go to the common project directory and run
## => npm run pub
### And update the package in other services by running
## => npm update @irftickets/common

# Add new proejct 
### build the project with docker
## => docker build -t docker_hub_username/proejct_name .
## => docker push docker_hub_username/proejct_name
## this will build the proejct and push to docker hub

# Deploy 
## => kubectl apply -f [depl-file-name.yaml]
### restart the deployment
## => kubectl rollout restart deployment [depl_name] i.e: auth-depl

# Describe 
### any service, pod, deployment
## => kubectl describe [service name, depl name,....]

# Secret
### Create secret
## => kubectl create secret generic jwt_secret[naem of the secret] --form-literal=JWT_KEY=asdf[all key value pair]

## =>get secret
