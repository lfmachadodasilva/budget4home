package utils

import (
	"fmt"
	"strconv"
	"strings"
)

func ConvertStringToInt64(value string) (int64, error) {
	value = strings.TrimSpace(value)

	// Validate the value
	if value == "" {
		return 0, fmt.Errorf("value is required")
	}

	// Validate and convert the value to int64
	id, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("invalid value. It must be a valid integer: %w", err)
	}

	return id, nil
}
