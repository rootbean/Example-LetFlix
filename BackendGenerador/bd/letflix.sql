--
-- Host: localhost    Database: letflix
-- ------------------------------------------------------
-- Server version	5.7.19

--
-- Table structure for table Sessions
--

CREATE TABLE  "Sessions" (
   "id" serial PRIMARY KEY,
   "sid"   varchar(255) DEFAULT NULL,
   "data" text DEFAULT NULL
);

--
-- Table structure for table Users
--

CREATE TABLE  "Users" (
   "id" serial PRIMARY KEY,
   "alias"   varchar(50) NOT NULL,
   "email" varchar(60) NOT NULL,
   "password" varchar(150) NOT NULL, 
   "registerDate"   timestamp without time zone DEFAULT NULL, 
   "active"    boolean DEFAULT TRUE,
   unique("email"),
   unique("alias")
);

--
-- Table structure for table Comments
--

CREATE TABLE  "Comments" (
   "id" serial PRIMARY KEY,
   "description"    varchar(255) NOT NULL, 
   "registerDate" timestamp without time zone DEFAULT NULL,
   "active" boolean DEFAULT TRUE,
   "replies" int DEFAULT NULL,
   "show" int NOT NULL,
   "user" int NOT NULL
);

CREATE INDEX "Comments_comments_idx" ON "Comments" USING btree ("replies");
CREATE INDEX "Comments_user_idx" ON "Comments" USING btree ("user");

--
-- Table structure for table Qualifications
--

CREATE TABLE  "Qualifications" (
   "id" serial PRIMARY KEY,
   "value"   boolean NOT NULL,
   "show" int NOT NULL, 
   "user" int NOT NULL
);

CREATE INDEX "Qualifications_user_idx" ON "Qualifications" USING btree ("user");

--
-- Table structure for table FavoritesShows
--

CREATE TABLE  "FavoritesShows" (
   "id" serial PRIMARY KEY,
   "show" int NOT NULL,
   "active" boolean DEFAULT TRUE,
   "user" int NOT NULL
);

CREATE INDEX "FavoritesShows_user_idx" ON "FavoritesShows" USING btree ("user");

ALTER TABLE "Comments" ADD FOREIGN KEY ("replies") REFERENCES "Comments" ("id");
ALTER TABLE "Comments" ADD FOREIGN KEY ("user") REFERENCES "Users" ("id");

ALTER TABLE "Qualifications" ADD FOREIGN KEY ("user") REFERENCES "Users" ("id");

ALTER TABLE "FavoritesShows" ADD FOREIGN KEY ("user") REFERENCES "Users" ("id");

/* INSERT DEFAULT USERS */
INSERT INTO public."Users"(
	id, alias, email, password, "registerDate", active)
	VALUES (1, 'rootbean', 'ruber19@gmail.com', 
  'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
   '2017-10-14', '1');

INSERT INTO public."Users"(
   id, alias, email, password, "registerDate", active)
   VALUES (2, 'mangel', 'mangel@gmail.com', 
  'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
   '2017-10-14', '1');