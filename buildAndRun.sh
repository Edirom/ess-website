# build the ess website docker image and run it in a container (locally)
# by Dennis Ried

# optional build arg: apache. Default is nginx.
if [ $1 == "apache" ] 
then
  tech=apache
else
  tech=nginx
fi

#build docker image
docker build -t ess -f Dockerfile.$tech .

#run docker container
docker run --rm --name ess-website-test -p8080:80 edirom/ess-website