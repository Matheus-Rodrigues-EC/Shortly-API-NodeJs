--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.4

-- Started on 2023-05-23 17:07:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 24987)
-- Name: Sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Sessions" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(40) NOT NULL,
    "createdAt" date NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 24986)
-- Name: Sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 211
-- Name: Sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Sessions_id_seq" OWNED BY public."Sessions".id;


--
-- TOC entry 214 (class 1259 OID 25001)
-- Name: Shorted_Links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Shorted_Links" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url character varying(250) NOT NULL,
    "shortUrl" character varying(7) NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" date NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 25000)
-- Name: Shorted_Links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Shorted_Links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 213
-- Name: Shorted_Links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Shorted_Links_id_seq" OWNED BY public."Shorted_Links".id;


--
-- TOC entry 210 (class 1259 OID 24977)
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    "linksCount" integer DEFAULT 0,
    "createdAt" date NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 24976)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 209
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 3176 (class 2604 OID 24990)
-- Name: Sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sessions" ALTER COLUMN id SET DEFAULT nextval('public."Sessions_id_seq"'::regclass);


--
-- TOC entry 3177 (class 2604 OID 25004)
-- Name: Shorted_Links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Shorted_Links" ALTER COLUMN id SET DEFAULT nextval('public."Shorted_Links_id_seq"'::regclass);


--
-- TOC entry 3174 (class 2604 OID 24980)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3184 (class 2606 OID 24992)
-- Name: Sessions Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 24994)
-- Name: Sessions Sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_token_key" UNIQUE (token);


--
-- TOC entry 3188 (class 2606 OID 25007)
-- Name: Shorted_Links Shorted_Links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Shorted_Links"
    ADD CONSTRAINT "Shorted_Links_pkey" PRIMARY KEY (id);


--
-- TOC entry 3180 (class 2606 OID 24985)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 3182 (class 2606 OID 24983)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 24995)
-- Name: Sessions Sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id);


--
-- TOC entry 3190 (class 2606 OID 25008)
-- Name: Shorted_Links Shorted_Links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Shorted_Links"
    ADD CONSTRAINT "Shorted_Links_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id);


-- Completed on 2023-05-23 17:07:22

--
-- PostgreSQL database dump complete
--

