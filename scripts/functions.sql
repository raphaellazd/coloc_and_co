-- get_users_by_coloc retourne toutes les lignes 
--et toutes les colonnes de la table "user"
CREATE OR REPLACE FUNCTION get_users_by_coloc(text) RETURNS SETOF text as $$
	SELECT "user".firstname
	FROM "user" 
    JOIN colocation c
    ON "user".colocation_id = c.id
$$ LANGUAGE sql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION get_users_by_coloc() 
RETURNS SETOF json AS $$

    -- Function body: SQL query to retrieve user information as JSON objects
	SELECT json_build_object("colocation_id", "firstname", "lastname", "phone_number")
	FROM "user" 
    JOIN colocation c
    ON "user".colocation_id = c.id
    WHERE "user".colocation_id = $1 

$$ LANGUAGE sql SECURITY DEFINER;



CREATE OR REPLACE FUNCTION get_users_by_coloc_id(target INTEGER) 
RETURNS SETOF "user" AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM "user"
    WHERE "colocation_id" = target;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
