PGDMP      '                }         	   vetclinik    17.0    17.0 J    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            %           1262    16621 	   vetclinik    DATABASE     }   CREATE DATABASE vetclinik WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE vetclinik;
                     postgres    false            �            1259    16777    appt_id_appt_seq    SEQUENCE     y   CREATE SEQUENCE public.appt_id_appt_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.appt_id_appt_seq;
       public               postgres    false            �            1259    16691    appt    TABLE        CREATE TABLE public.appt (
    id_appt integer DEFAULT nextval('public.appt_id_appt_seq'::regclass) NOT NULL,
    id_doctor integer,
    id_pet integer,
    address text,
    date_appt date,
    name_appt text,
    id_department integer,
    file bytea
);
    DROP TABLE public.appt;
       public         heap r       postgres    false    226            �            1259    16775    breed_id_breed_seq    SEQUENCE     {   CREATE SEQUENCE public.breed_id_breed_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.breed_id_breed_seq;
       public               postgres    false            �            1259    16643    breed    TABLE     �   CREATE TABLE public.breed (
    id_breed integer DEFAULT nextval('public.breed_id_breed_seq'::regclass) NOT NULL,
    name_breed text
);
    DROP TABLE public.breed;
       public         heap r       postgres    false    225            �            1259    16812 
   department    TABLE     j   CREATE TABLE public.department (
    id_department integer NOT NULL,
    name_department text NOT NULL
);
    DROP TABLE public.department;
       public         heap r       postgres    false            �            1259    16811    department_id_department_seq    SEQUENCE     �   CREATE SEQUENCE public.department_id_department_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.department_id_department_seq;
       public               postgres    false    239            &           0    0    department_id_department_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.department_id_department_seq OWNED BY public.department.id_department;
          public               postgres    false    238            �            1259    16779    doctor_id_doctor_seq    SEQUENCE     }   CREATE SEQUENCE public.doctor_id_doctor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.doctor_id_doctor_seq;
       public               postgres    false            �            1259    16703    doctor    TABLE     �   CREATE TABLE public.doctor (
    id_doctor integer DEFAULT nextval('public.doctor_id_doctor_seq'::regclass) NOT NULL,
    id_license integer,
    id_user integer
);
    DROP TABLE public.doctor;
       public         heap r       postgres    false    227            �            1259    16667    gender    TABLE     U   CREATE TABLE public.gender (
    id_gender integer NOT NULL,
    name_gender text
);
    DROP TABLE public.gender;
       public         heap r       postgres    false            �            1259    16781    license_id_license_seq    SEQUENCE        CREATE SEQUENCE public.license_id_license_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.license_id_license_seq;
       public               postgres    false            �            1259    16715    license    TABLE     �   CREATE TABLE public.license (
    id_license integer DEFAULT nextval('public.license_id_license_seq'::regclass) NOT NULL,
    date_issue date,
    expired date,
    who_issue text
);
    DROP TABLE public.license;
       public         heap r       postgres    false    228            �            1259    16783    operation_id_operation_seq    SEQUENCE     �   CREATE SEQUENCE public.operation_id_operation_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.operation_id_operation_seq;
       public               postgres    false            �            1259    16785    osmotr_id_osmotr_seq    SEQUENCE     }   CREATE SEQUENCE public.osmotr_id_osmotr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.osmotr_id_osmotr_seq;
       public               postgres    false            �            1259    16787    pet_id_pet_seq    SEQUENCE     w   CREATE SEQUENCE public.pet_id_pet_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pet_id_pet_seq;
       public               postgres    false            �            1259    16622    pet    TABLE     �   CREATE TABLE public.pet (
    id_pet integer DEFAULT nextval('public.pet_id_pet_seq'::regclass) NOT NULL,
    id_user integer,
    id_breed integer,
    id_species integer,
    id_gender integer,
    nickname text,
    birthday date,
    img bytea
);
    DROP TABLE public.pet;
       public         heap r       postgres    false    231            �            1259    16789    privivka_id_privivka_seq    SEQUENCE     �   CREATE SEQUENCE public.privivka_id_privivka_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.privivka_id_privivka_seq;
       public               postgres    false            �            1259    16803    role    TABLE     X   CREATE TABLE public.role (
    id_role integer NOT NULL,
    name_role text NOT NULL
);
    DROP TABLE public.role;
       public         heap r       postgres    false            �            1259    16802    role_id_role_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_id_role_seq;
       public               postgres    false    237            '           0    0    role_id_role_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_id_role_seq OWNED BY public.role.id_role;
          public               postgres    false    236            �            1259    16791    species_id_species_seq    SEQUENCE        CREATE SEQUENCE public.species_id_species_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.species_id_species_seq;
       public               postgres    false            �            1259    16655    species    TABLE     �   CREATE TABLE public.species (
    id_species integer DEFAULT nextval('public.species_id_species_seq'::regclass) NOT NULL,
    name_species text
);
    DROP TABLE public.species;
       public         heap r       postgres    false    233            �            1259    16794    user_id_user_seq    SEQUENCE     y   CREATE SEQUENCE public.user_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_id_user_seq;
       public               postgres    false            �            1259    16679    user    TABLE     �   CREATE TABLE public."user" (
    id_user integer DEFAULT nextval('public.user_id_user_seq'::regclass) NOT NULL,
    name text,
    number text,
    email text,
    password text,
    id_role integer,
    patronymic text,
    surname text
);
    DROP TABLE public."user";
       public         heap r       postgres    false    234            �            1259    16797    vaccine_id_vaccine_seq    SEQUENCE        CREATE SEQUENCE public.vaccine_id_vaccine_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.vaccine_id_vaccine_seq;
       public               postgres    false            Y           2604    16815    department id_department    DEFAULT     �   ALTER TABLE ONLY public.department ALTER COLUMN id_department SET DEFAULT nextval('public.department_id_department_seq'::regclass);
 G   ALTER TABLE public.department ALTER COLUMN id_department DROP DEFAULT;
       public               postgres    false    238    239    239            X           2604    16806    role id_role    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN id_role SET DEFAULT nextval('public.role_id_role_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN id_role DROP DEFAULT;
       public               postgres    false    236    237    237                      0    16691    appt 
   TABLE DATA           n   COPY public.appt (id_appt, id_doctor, id_pet, address, date_appt, name_appt, id_department, file) FROM stdin;
    public               postgres    false    222   'T       
          0    16643    breed 
   TABLE DATA           5   COPY public.breed (id_breed, name_breed) FROM stdin;
    public               postgres    false    218   DT                 0    16812 
   department 
   TABLE DATA           D   COPY public.department (id_department, name_department) FROM stdin;
    public               postgres    false    239   XW                 0    16703    doctor 
   TABLE DATA           @   COPY public.doctor (id_doctor, id_license, id_user) FROM stdin;
    public               postgres    false    223   uW                 0    16667    gender 
   TABLE DATA           8   COPY public.gender (id_gender, name_gender) FROM stdin;
    public               postgres    false    220   �W                 0    16715    license 
   TABLE DATA           M   COPY public.license (id_license, date_issue, expired, who_issue) FROM stdin;
    public               postgres    false    224   �W       	          0    16622    pet 
   TABLE DATA           h   COPY public.pet (id_pet, id_user, id_breed, id_species, id_gender, nickname, birthday, img) FROM stdin;
    public               postgres    false    217   �W                 0    16803    role 
   TABLE DATA           2   COPY public.role (id_role, name_role) FROM stdin;
    public               postgres    false    237   �W                 0    16655    species 
   TABLE DATA           ;   COPY public.species (id_species, name_species) FROM stdin;
    public               postgres    false    219   X                 0    16679    user 
   TABLE DATA           f   COPY public."user" (id_user, name, number, email, password, id_role, patronymic, surname) FROM stdin;
    public               postgres    false    221   �X       (           0    0    appt_id_appt_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.appt_id_appt_seq', 1, false);
          public               postgres    false    226            )           0    0    breed_id_breed_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.breed_id_breed_seq', 58, true);
          public               postgres    false    225            *           0    0    department_id_department_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.department_id_department_seq', 1, false);
          public               postgres    false    238            +           0    0    doctor_id_doctor_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.doctor_id_doctor_seq', 1, false);
          public               postgres    false    227            ,           0    0    license_id_license_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.license_id_license_seq', 1, false);
          public               postgres    false    228            -           0    0    operation_id_operation_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.operation_id_operation_seq', 1, false);
          public               postgres    false    229            .           0    0    osmotr_id_osmotr_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.osmotr_id_osmotr_seq', 1, false);
          public               postgres    false    230            /           0    0    pet_id_pet_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pet_id_pet_seq', 1, false);
          public               postgres    false    231            0           0    0    privivka_id_privivka_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.privivka_id_privivka_seq', 1, false);
          public               postgres    false    232            1           0    0    role_id_role_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.role_id_role_seq', 1, false);
          public               postgres    false    236            2           0    0    species_id_species_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.species_id_species_seq', 8, true);
          public               postgres    false    233            3           0    0    user_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_id_user_seq', 1, false);
          public               postgres    false    234            4           0    0    vaccine_id_vaccine_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.vaccine_id_vaccine_seq', 1, false);
          public               postgres    false    235            e           2606    16697    appt appt_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.appt
    ADD CONSTRAINT appt_pkey PRIMARY KEY (id_appt);
 8   ALTER TABLE ONLY public.appt DROP CONSTRAINT appt_pkey;
       public                 postgres    false    222            ]           2606    16649    breed breed_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.breed
    ADD CONSTRAINT breed_pkey PRIMARY KEY (id_breed);
 :   ALTER TABLE ONLY public.breed DROP CONSTRAINT breed_pkey;
       public                 postgres    false    218            m           2606    16819    department department_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id_department);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public                 postgres    false    239            g           2606    16709    doctor doctor_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_pkey PRIMARY KEY (id_doctor);
 <   ALTER TABLE ONLY public.doctor DROP CONSTRAINT doctor_pkey;
       public                 postgres    false    223            a           2606    16673    gender gender_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id_gender);
 <   ALTER TABLE ONLY public.gender DROP CONSTRAINT gender_pkey;
       public                 postgres    false    220            i           2606    16721    license license_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.license
    ADD CONSTRAINT license_pkey PRIMARY KEY (id_license);
 >   ALTER TABLE ONLY public.license DROP CONSTRAINT license_pkey;
       public                 postgres    false    224            [           2606    16628    pet pet_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_pkey PRIMARY KEY (id_pet);
 6   ALTER TABLE ONLY public.pet DROP CONSTRAINT pet_pkey;
       public                 postgres    false    217            k           2606    16810    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_role);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public                 postgres    false    237            _           2606    16661    species species_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id_species);
 >   ALTER TABLE ONLY public.species DROP CONSTRAINT species_pkey;
       public                 postgres    false    219            c           2606    16685    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 postgres    false    221            s           2606    16830    appt appt_id_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appt
    ADD CONSTRAINT appt_id_department_fkey FOREIGN KEY (id_department) REFERENCES public.department(id_department) NOT VALID;
 F   ALTER TABLE ONLY public.appt DROP CONSTRAINT appt_id_department_fkey;
       public               postgres    false    4717    222    239            t           2606    16710    appt appt_id_doctor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appt
    ADD CONSTRAINT appt_id_doctor_fkey FOREIGN KEY (id_doctor) REFERENCES public.doctor(id_doctor) NOT VALID;
 B   ALTER TABLE ONLY public.appt DROP CONSTRAINT appt_id_doctor_fkey;
       public               postgres    false    223    4711    222            u           2606    16698    appt appt_id_pet_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.appt
    ADD CONSTRAINT appt_id_pet_fkey FOREIGN KEY (id_pet) REFERENCES public.pet(id_pet) NOT VALID;
 ?   ALTER TABLE ONLY public.appt DROP CONSTRAINT appt_id_pet_fkey;
       public               postgres    false    217    4699    222            v           2606    16722    doctor doctor_id_license_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_id_license_fkey FOREIGN KEY (id_license) REFERENCES public.license(id_license) NOT VALID;
 G   ALTER TABLE ONLY public.doctor DROP CONSTRAINT doctor_id_license_fkey;
       public               postgres    false    4713    224    223            w           2606    16825    doctor doctor_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;
 D   ALTER TABLE ONLY public.doctor DROP CONSTRAINT doctor_id_user_fkey;
       public               postgres    false    221    223    4707            n           2606    16650    pet pet_id_breed_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_id_breed_fkey FOREIGN KEY (id_breed) REFERENCES public.breed(id_breed) NOT VALID;
 ?   ALTER TABLE ONLY public.pet DROP CONSTRAINT pet_id_breed_fkey;
       public               postgres    false    4701    218    217            o           2606    16674    pet pet_id_gender_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_id_gender_fkey FOREIGN KEY (id_gender) REFERENCES public.gender(id_gender) NOT VALID;
 @   ALTER TABLE ONLY public.pet DROP CONSTRAINT pet_id_gender_fkey;
       public               postgres    false    217    4705    220            p           2606    16662    pet pet_id_species_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_id_species_fkey FOREIGN KEY (id_species) REFERENCES public.species(id_species) NOT VALID;
 A   ALTER TABLE ONLY public.pet DROP CONSTRAINT pet_id_species_fkey;
       public               postgres    false    4703    217    219            q           2606    16686    pet pet_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public."user"(id_user) NOT VALID;
 >   ALTER TABLE ONLY public.pet DROP CONSTRAINT pet_id_user_fkey;
       public               postgres    false    217    221    4707            r           2606    16820    user user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.role(id_role) NOT VALID;
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_id_role_fkey;
       public               postgres    false    221    4715    237                  x������ � �      
     x�}UIn�@<�_�(7K�K#Z� 'p�,v��q$��D��z~�����]��L/U5գ8��~����R��$��:]b�i�������~7��j.i���ҟ�8�Z����ʟa9�d�����t��_�v�G�<ү֩�~���@�� ����t-���5�d�5NK@��,�냒�EO>��=�k��`�F�Q�Q�$ҷz���,��:~Gz�5��	���e�)k���4����-��>a~H�L@jQ� }�B�?6�	@�+fk5�ykq�Đ�#0�|!1���
'�̅_�!��a�T�	�4Ԗ��uIl�	���2�#IB�tZ�WJ��"������$c�^a461���n<[m� NM��Aj�ĝQ��/>�RyP�>��	�^#%H�D���a�����M?sW�&3�ᱤjJ�5 O��lfahQv�$� �> �M$M)7?�r��t؜,L$�=��P�Ő���@�6 �]��8Cꔗ��!,�.��ǘ�98wCiNPѱ>�����&������ �g�8�0ai�P#�� �~:�*�����#�8^��3&Ot���܁Ȇ�g����
��O����%�f��l�@�TJ�@����GO��yZ��[ɡ�7��f=��F��c�A4��%@-Oh	^���{���c�G��S{�~��Y7���mCɜ�^�Ύ����B��aFz6����Ԁ�>x�����s҆�y�O�?";3܃<&"� ��l            x������ � �            x������ � �            x�3�0�ˈ��4�=... %�            x������ � �      	      x������ � �            x������ � �         m   x��=�`��Ø��x�*JbAh?bH 	\a�F�Xμ��oVz3�Ƌ5�~4�-J>�&?��5�g��*�2
�F� 1����Q�/�7��x����ع�*C}            x������ � �     