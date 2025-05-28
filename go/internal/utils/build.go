package utils

import (
	"fmt"
	"reflect"
	"strings"
)

// buildSelectFields dynamically constructs the SELECT fields from the db tags
func BuildSelectFields(tag string, entity interface{}) string {
	t := reflect.TypeOf(entity)
	var fields []string

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		dbTag := field.Tag.Get(tag)
		if dbTag != "" {
			fields = append(fields, dbTag)
		}
	}

	return strings.Join(fields, ", ")
}

// buildUpdateFields dynamically constructs the UPDATE fields from the db tags
func BuildUpdateFields(tag string, entity interface{}) string {
	t := reflect.TypeOf(entity)
	var fields []string

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		dbTag := field.Tag.Get(tag)
		if dbTag != "" {
			fields = append(fields, dbTag+" = $"+fmt.Sprint(len(fields)+1))
		}
	}

	return strings.Join(fields, ", ")
}
