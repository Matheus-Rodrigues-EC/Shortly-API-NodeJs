PGDMP                          {            shortly    14.5    14.4     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24719    shortly    DATABASE     g   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE shortly;
                postgres    false            �            1259    24911    Sessions    TABLE     �   CREATE TABLE public."Sessions" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(40) NOT NULL,
    created_at date NOT NULL
);
    DROP TABLE public."Sessions";
       public         heap    postgres    false            �            1259    24910    Sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Sessions_id_seq";
       public          postgres    false    212                       0    0    Sessions_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Sessions_id_seq" OWNED BY public."Sessions".id;
          public          postgres    false    211            �            1259    24925    Shorted_Links    TABLE     �   CREATE TABLE public."Shorted_Links" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url character varying(250) NOT NULL,
    "shortUrl" character varying(7) NOT NULL,
    "visitCount" integer DEFAULT 0,
    created_at date NOT NULL
);
 #   DROP TABLE public."Shorted_Links";
       public         heap    postgres    false            �            1259    24924    Shorted_Links_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Shorted_Links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Shorted_Links_id_seq";
       public          postgres    false    214                       0    0    Shorted_Links_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Shorted_Links_id_seq" OWNED BY public."Shorted_Links".id;
          public          postgres    false    213            �            1259    24901    Users    TABLE     �   CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    "linksCount" integer DEFAULT 0,
    created_at date NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    24900    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    210                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    209            h           2604    24914    Sessions id    DEFAULT     n   ALTER TABLE ONLY public."Sessions" ALTER COLUMN id SET DEFAULT nextval('public."Sessions_id_seq"'::regclass);
 <   ALTER TABLE public."Sessions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            i           2604    24928    Shorted_Links id    DEFAULT     x   ALTER TABLE ONLY public."Shorted_Links" ALTER COLUMN id SET DEFAULT nextval('public."Shorted_Links_id_seq"'::regclass);
 A   ALTER TABLE public."Shorted_Links" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            f           2604    24904    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210                      0    24911    Sessions 
   TABLE DATA           D   COPY public."Sessions" (id, user_id, token, created_at) FROM stdin;
    public          postgres    false    212   y                  0    24925    Shorted_Links 
   TABLE DATA           a   COPY public."Shorted_Links" (id, user_id, url, "shortUrl", "visitCount", created_at) FROM stdin;
    public          postgres    false    214   �                  0    24901    Users 
   TABLE DATA           V   COPY public."Users" (id, name, email, password, "linksCount", created_at) FROM stdin;
    public          postgres    false    210   �                   0    0    Sessions_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Sessions_id_seq"', 1, false);
          public          postgres    false    211                       0    0    Shorted_Links_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Shorted_Links_id_seq"', 1, false);
          public          postgres    false    213                       0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);
          public          postgres    false    209            p           2606    24916    Sessions Sessions_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_pkey";
       public            postgres    false    212            r           2606    24918    Sessions Sessions_token_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_token_key" UNIQUE (token);
 I   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_token_key";
       public            postgres    false    212            t           2606    24931     Shorted_Links Shorted_Links_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Shorted_Links"
    ADD CONSTRAINT "Shorted_Links_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Shorted_Links" DROP CONSTRAINT "Shorted_Links_pkey";
       public            postgres    false    214            l           2606    24909    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    210            n           2606    24907    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    210            u           2606    24919    Sessions Sessions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 L   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_user_id_fkey";
       public          postgres    false    210    212    3182            v           2606    24932 (   Shorted_Links Shorted_Links_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Shorted_Links"
    ADD CONSTRAINT "Shorted_Links_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 V   ALTER TABLE ONLY public."Shorted_Links" DROP CONSTRAINT "Shorted_Links_user_id_fkey";
       public          postgres    false    210    3182    214                  x������ � �            x������ � �            x������ � �     