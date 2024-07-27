package services

import (
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db/models"
)

type SchedulingService interface {
	CreateScheduling(taskId uuid.UUID, createdFields map[string]interface{}) (*models.Scheduling, error)
	UpdateScheduling(scheduleId uuid.UUID, updatedFields map[string]interface{}) (*models.Scheduling, error)
	ToggleScheduling(scheduleId uuid.UUID) (*models.Scheduling, error)
	RemoveScheduling(scheduleId uuid.UUID) (*models.Scheduling, error)
	ScheduleNow(scheduleId uuid.UUID) (*models.Task, *models.Scheduling, error)

	GetScheduling(scheduleId uuid.UUID) (*models.Scheduling, error)
}
