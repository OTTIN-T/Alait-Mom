
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '"public", "extensions"', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."breast" AS ENUM (
    'RIGHT',
    'LEFT',
    'BOTH'
);

ALTER TYPE "public"."breast" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."breastfeeding" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "breast" breast NOT NULL,
    "duration" time without time zone NOT NULL,
    "description" character varying,
    "profile_id" uuid NOT NULL
);

ALTER TABLE "public"."breastfeeding" OWNER TO "postgres";

ALTER TABLE "public"."breastfeeding" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."breastfeeding_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."children" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "name" text NOT NULL,
    "profile_id" uuid NOT NULL
);

ALTER TABLE "public"."children" OWNER TO "postgres";

ALTER TABLE "public"."children" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."children_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" uuid NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "user_name" text
);

ALTER TABLE "public"."profile" OWNER TO "postgres";

ALTER TABLE ONLY "public"."breastfeeding"
    ADD CONSTRAINT "breastfeeding_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."breastfeeding"
    ADD CONSTRAINT "breastfeeding_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."breastfeeding"
    ADD CONSTRAINT "breastfeeding_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."children"
    ADD CONSTRAINT "children_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE "public"."breastfeeding" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."children" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."breastfeeding" TO "anon";
GRANT ALL ON TABLE "public"."breastfeeding" TO "authenticated";
GRANT ALL ON TABLE "public"."breastfeeding" TO "service_role";

GRANT ALL ON SEQUENCE "public"."breastfeeding_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."breastfeeding_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."breastfeeding_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."children" TO "anon";
GRANT ALL ON TABLE "public"."children" TO "authenticated";
GRANT ALL ON TABLE "public"."children" TO "service_role";

GRANT ALL ON SEQUENCE "public"."children_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."children_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."children_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;