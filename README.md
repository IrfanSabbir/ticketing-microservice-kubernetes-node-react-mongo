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