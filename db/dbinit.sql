CREATE TABLE "Users" (
  "id" INT NOT NULL PRIMARY KEY,
  "login" VARCHAR(255) NOT NULL,
  "display_name" VARCHAR(255),
  "avatar" VARCHAR(255)
);
CREATE TABLE "Forums" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id")
);

CREATE TABLE "Topics" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "forum_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("forum_id") REFERENCES "Forums" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id")
);
CREATE TABLE "Messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "text" TEXT NOT NULL,
  "topic_id" INT NOT NULL,
  "parent_message_id" INT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("topic_id") REFERENCES "Topics" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
  FOREIGN KEY ("parent_message_id") REFERENCES "Messages" ("id")
);
CREATE TABLE "MessagesReactions" (
  "message_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "reaction_id" INT NOT NULL,
  PRIMARY KEY ("message_id", "user_id"),
  FOREIGN KEY ("message_id") REFERENCES "Messages" ("id")
);
CREATE TABLE "Themes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  UNIQUE ("name")
);
CREATE TABLE "UsersThemes" (
  "user_id" INT NOT NULL,
  "theme_id" INT,
  PRIMARY KEY ("user_id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
  FOREIGN KEY ("theme_id") REFERENCES "Themes" ("id")
);
CREATE INDEX idx_forums_id ON "Forums" ("id");
CREATE INDEX idx_topics_id ON "Topics" ("id");
CREATE INDEX idx_topics_forum ON "Topics" ("forum_id");
CREATE INDEX idx_users_id ON "Users" ("id");
CREATE INDEX idx_messages_id ON "Messages" ("id");
CREATE INDEX idx_messages_topic ON "Messages" ("topic_id");
CREATE INDEX idx_messages_parent ON "Messages" ("parent_message_id");
CREATE INDEX idx_messagesreactions_message ON "MessagesReactions" ("message_id");
CREATE INDEX idx_themes_id ON "Themes" ("id");
CREATE INDEX idx_usersthemes_user ON "UsersThemes" ("user_id");
INSERT INTO "Themes" (id, name) VALUES (1, 'light'), (2, 'dark');
INSERT INTO "Forums" (id, name, user_id) VALUES (1, 'Форум', 1344907);
