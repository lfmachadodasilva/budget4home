package migrations

const (
	CreateIndexes = `
		CREATE INDEX IF NOT EXISTS expense_index
		ON expenses (group_id, date_time DESC);

		CREATE INDEX IF NOT EXISTS label_index
		ON labels (group_id, name DESC);

		CREATE INDEX IF NOT EXISTS group_index
		ON groups (user_ids);
	`
)
