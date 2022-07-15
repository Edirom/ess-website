# build the ess website docker image and run it in a container (locally)
# this can also be used for updating the image and running a new container 
# by Dennis Ried

# optional build arg: apache. Default is nginx.
if [ $1 == "apache" ] 
then
  tech=apache
else
  tech=nginx
fi

#build docker image
docker build -t ess-web-image -f Dockerfile.$tech .

#check if the container is already running
#if yes, it will be stopped and a new one is started

runningContainer=$(docker ps -q -f name=ess-website-dev)

if [ $runningContainer ];
then
  docker stop $runningContainer
  #sleep 5s
fi

#run docker container
docker run --rm --name ess-website-dev -p 8080:80 ess-web-image