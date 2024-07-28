package graph

import (
	"encoding/json"
	"github.com/stopover-org/stopover/data-compositor/db/models"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph/model"
	"time"
)

func formatToISO8601(t *time.Time) *string {
	if t == nil {
		return nil
	}
	formattedTime := t.Format(time.RFC3339)
	return &formattedTime
}

func TasksToGraphql(tasks []models.Task) ([]*graphql.Task, error) {
	result := make([]*graphql.Task, len(tasks))
	for i, task := range tasks {
		gqlTask, err := TaskToGraphql(&task)
		if err != nil {
			return nil, err
		}
		result[i] = gqlTask
	}
	return result, nil
}

func SchedulingToGraphql(scheduling *models.Scheduling) (*graphql.Scheduling, error) {
	configuration, err := json.Marshal(scheduling.Configuration)
	if err != nil {
		return nil, err
	}

	return &graphql.Scheduling{
		ID:               scheduling.ID.String(),
		NextScheduleTime: formatToISO8601(&scheduling.NextScheduleTime),
		RetentionPeriod:  scheduling.RetentionPeriod,
		MaxRetries:       scheduling.MaxRetries,
		Status:           scheduling.Status,
		AdapterType:      scheduling.AdapterType,
		Configuration:    string(configuration),
	}, nil
}

func TaskToGraphql(task *models.Task) (*graphql.Task, error) {
	configuration, err := json.Marshal(task.Configuration)
	if err != nil {
		return nil, err
	}

	scheduling, err := SchedulingToGraphql(task.Scheduling)
	if err != nil {
		return nil, err
	}

	return &graphql.Task{
		ID:            task.ID.String(),
		Status:        task.Status,
		Retries:       task.Retries,
		Artifacts:     task.Artifacts,
		AdapterType:   task.AdapterType,
		Configuration: string(configuration),
		SchedulingID:  task.SchedulingID.String(),
		Scheduling:    scheduling,
	}, nil
}
