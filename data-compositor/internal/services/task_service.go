package services

import "github.com/stopover-org/stopover/data-compositor/db/models"

type TaskService interface {
	ExecTask(id string) (*models.Task, error)
	RetryTask(id string) (*models.Task, error)

	GetTask(id string) (*models.Task, error)
}
