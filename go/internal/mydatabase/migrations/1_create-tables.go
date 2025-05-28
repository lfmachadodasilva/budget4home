package migrations

const (
	CreateExpensesTable = `
	-- Migration: Create Tables
	CREATE TABLE IF NOT EXISTS expenses (
		id bigserial NOT NULL,
		name text NOT NULL,
		amount bigint NOT NULL,
		date_time timestamp with time zone NOT NULL,
		group_id bigint NOT NULL,
		PRIMARY KEY (id)
	);

	CREATE TABLE IF NOT EXISTS labels (
		id bigserial NOT NULL,
		name text NOT NULL,
		icon text NOT NULL,
		keys text [] NOT NULL,
		group_id bigint NOT NULL,
		PRIMARY KEY (id)
	);

	CREATE TABLE IF NOT EXISTS groups (
		id bigserial NOT NULL,
		name text NOT NULL,
		user_ids text [] NOT NULL,
		PRIMARY KEY (id)
	);
	`
)
