PGDMP  "    2                }            vet_db    17.4    17.4     :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            =           1262    16388    vet_db    DATABASE     l   CREATE DATABASE vet_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru-RU';
    DROP DATABASE vet_db;
                     postgres    false            �            1259    16400    pet_passports    TABLE     �   CREATE TABLE public.pet_passports (
    id integer NOT NULL,
    client_id integer,
    pet_name character varying(100),
    birth_date date,
    vaccinations text
);
 !   DROP TABLE public.pet_passports;
       public         heap r       postgres    false            �            1259    16399    pet_passports_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pet_passports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.pet_passports_id_seq;
       public               postgres    false    218            >           0    0    pet_passports_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.pet_passports_id_seq OWNED BY public.pet_passports.id;
          public               postgres    false    217            �            1259    16476    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    role character varying(20) NOT NULL,
    approved boolean DEFAULT false,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['client'::character varying, 'vet'::character varying, 'moderator'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16475    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    222            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    221            �            1259    16414    vet_applications    TABLE     �  CREATE TABLE public.vet_applications (
    id integer NOT NULL,
    vet_id integer,
    clinic_name character varying(255),
    address character varying(255),
    specialization character varying(255),
    status character varying(20) DEFAULT 'pending'::character varying,
    CONSTRAINT vet_applications_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[])))
);
 $   DROP TABLE public.vet_applications;
       public         heap r       postgres    false            �            1259    16413    vet_applications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vet_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.vet_applications_id_seq;
       public               postgres    false    220            @           0    0    vet_applications_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.vet_applications_id_seq OWNED BY public.vet_applications.id;
          public               postgres    false    219            �           2604    16403    pet_passports id    DEFAULT     t   ALTER TABLE ONLY public.pet_passports ALTER COLUMN id SET DEFAULT nextval('public.pet_passports_id_seq'::regclass);
 ?   ALTER TABLE public.pet_passports ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16479    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    16417    vet_applications id    DEFAULT     z   ALTER TABLE ONLY public.vet_applications ALTER COLUMN id SET DEFAULT nextval('public.vet_applications_id_seq'::regclass);
 B   ALTER TABLE public.vet_applications ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            3          0    16400    pet_passports 
   TABLE DATA           Z   COPY public.pet_passports (id, client_id, pet_name, birth_date, vaccinations) FROM stdin;
    public               postgres    false    218   �       7          0    16476    users 
   TABLE DATA           N   COPY public.users (id, username, email, password, role, approved) FROM stdin;
    public               postgres    false    222   �       5          0    16414    vet_applications 
   TABLE DATA           d   COPY public.vet_applications (id, vet_id, clinic_name, address, specialization, status) FROM stdin;
    public               postgres    false    220   �       A           0    0    pet_passports_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pet_passports_id_seq', 1, false);
          public               postgres    false    217            B           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    221            C           0    0    vet_applications_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.vet_applications_id_seq', 1, false);
          public               postgres    false    219            �           2606    16407     pet_passports pet_passports_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.pet_passports
    ADD CONSTRAINT pet_passports_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.pet_passports DROP CONSTRAINT pet_passports_pkey;
       public                 postgres    false    218            �           2606    16489    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    222            �           2606    16485    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    222            �           2606    16487    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    222            �           2606    16423 &   vet_applications vet_applications_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.vet_applications
    ADD CONSTRAINT vet_applications_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.vet_applications DROP CONSTRAINT vet_applications_pkey;
       public                 postgres    false    220            3      x������ � �      7      x������ � �      5      x������ � �     