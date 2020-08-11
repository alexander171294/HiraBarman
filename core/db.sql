CREATE TABLE commands(
   id_command SERIAL PRIMARY KEY NOT NULL,
   targetChannel VARCHAR(250) NULL,
   fromUser VARCHAR(250) NULL,
   command VARCHAR(250) NULL,
   response TEXT
);