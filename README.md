# personal-data-management
Personal data management for the asignature of software design II.

## How to run
### run command:
```
docker-compose up
```
#### stop command:
```
docker-compose down
```

## Note
If you want to run the project, you need some environment variables. Here is an example of a .env file:

```
# Mongo database configuration
MONGODB_HOST=mongo # This is the name of the service of mongoDB in the docker-compose.yml
MONGODB_DATABASE=PDM_DB
MONGODB_LOCAL_PORT=27017
MONGODB_DOCKER_PORT=27017

# Create app ports
NODE_CREATE_LOCAL_PORT=3001
NODE_CREATE_DOCKER_PORT=3001

# Read app ports
NODE_READ_LOCAL_PORT=3002
NODE_READ_DOCKER_PORT=3002

# Update app ports
NODE_UPDATE_LOCAL_PORT=3003
NODE_UPDATE_DOCKER_PORT=3003

# Delete app ports
NODE_DELETE_LOCAL_PORT=3004
NODE_DELETE_DOCKER_PORT=3004

# Log app ports
NODE_LOG_LOCAL_PORT=3005
NODE_LOG_DOCKER_PORT=3005

# Origen
ORIGIN_URL=*
```