export PGUSER=postgres
export PGPASSWORD=postgres
export PGPORT=5432

# Init la BDD
psql -f scripts/init_db.sql

export PGUSER=admin_coloc
export PGPASSWORD=colocnco
export PGDATABASE=colocnco

psql -f scripts/create_tables.sql
psql -f scripts/populate_tables.sql
