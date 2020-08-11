CREATE TABLE commands(
   id_command SERIAL PRIMARY KEY NOT NULL,
   targetChannel VARCHAR(250) NULL,
   fromUser VARCHAR(250) NULL,
   command VARCHAR(250) NULL,
   response TEXT
);

CREATE TABLE variables(
   id SERIAL PRIMARY KEY NOT NULL,
   channel VARCHAR(250) NULL,
   userName VARCHAR(250) NULL,
   varName VARCHAR(250) NULL,
   rawValue VARCHAR(250) NULL
);

INSERT INTO commands
(
  targetchannel,
  fromuser,
  command,
  response
)
VALUES
(
  NULL,
  NULL,
  '\!help$',
  '["Ayuda general"]'
);

INSERT INTO commands
(
  targetchannel,
  fromuser,
  command,
  response
)
VALUES
(
  NULL,
  NULL,
  '\!help comando$',
  '["Ayuda de comando"]'
);