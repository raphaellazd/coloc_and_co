DROP DATABASE IF EXISTS colocnco;
DROP ROLE IF EXISTS admin_coloc;
-- DROP ROLE IF EXISTS api_coloc;

-- Création des comptes qui vont utiliser la BDD

-- admin_coloc propriétaire de la BDD
-- api_coloc compte d'accès à la BDD de notre API
CREATE USER admin_coloc 
    WITH
    PASSWORD 'colocnco';
-- CREATE USER api_coloc 
--    WITH 
--    PASSWORD = 'colocnco';

-- Création de la BDD
CREATE DATABASE colocnco
    WITH
    OWNER = admin_coloc
    ENCODING = 'UTF8';
