# HiraBarman
IRC Bot

# up database:

docker run --name pgBot -e POSTGRES_PASSWORD='dbpass' -e POSTGRES_USER='dbusr' -e POSTGRES_DB='dbname' -p 5432:5432 -d postgres:latest