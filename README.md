# HiraBarman
IRC Bot

# up database:

docker run --name pgBot -e POSTGRES_PASSWORD='dbpass' -e POSTGRES_USER='dbusr' -e POSTGRES_DB='dbname' -p 127.0.0.1:5432:5432 -v ~/barmanbot:/var/lib/postgresql/data -d postgres:latest

docker run --name nestBot -e DBHOST='127.0.0.1' -e DBUSER='dbusr' -e DBPASS='dbpass' -e DBNAME='dbname' -p 3061:3000 alexander171294/barmanbot:nest

docker run --name clientBot -p 3062:80 alexander171294/barmanbot:client

# design

https://static.dribbble.com/users/182336/screenshots/11275807/media/0099545d3b18e3c5a2dbde8f1e31642b.png