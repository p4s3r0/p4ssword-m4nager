
# CHECK IF DOCKER-COMPOSE is installed
if command -v docker-compose &>/dev/null; then
    echo "docker-compose is installed"
else
    echo "docker-compose is not installed"
    exit 1  # Exit the script with an error code
fi

# CHECK IF DOCKER is installed
if command -v docker &>/dev/null; then
    echo "Docker is installed"
else
    echo "Docker is not installed"
    exit 1  # Exit the script with an error code
fi



cp .env backend/app/.env
cp .env frontend/.env


sudo docker-compose up --build --force-recreate --no-deps --remove-orphans