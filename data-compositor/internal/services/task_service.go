package services

import (
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db/models"
)

type TaskService interface {
	ExecTask(id uuid.UUID) (*models.Task, error)
	RetryTask(id uuid.UUID) (*models.Task, error)

	GetTask(id uuid.UUID) (*models.Task, error)

	PostUrl(id uuid.UUID, url string, configuration map[string]interface{})
}
