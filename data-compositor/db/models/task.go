package models

import (
	"fmt"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TaskStatus string

const (
	TaskStatusPending    TaskStatus = "PENDING"
	TaskStatusRunning    TaskStatus = "RUNNING"
	TaskStatusCompleted  TaskStatus = "COMPLETED"
	TaskStatusFailed     TaskStatus = "FAILED"
	TaskStatusTerminated TaskStatus = "TERMINATED"
)

func validateTaskStatus(status TaskStatus) error {
	switch status {
	case TaskStatusPending, TaskStatusRunning, TaskStatusCompleted, TaskStatusFailed, TaskStatusTerminated:
		return nil
	default:
		return fmt.Errorf("invalid TaskStatus: %s", status)
	}
}

type Task struct {
	ID        uuid.UUID  `gorm:"type:uuid;primaryKey"`
	Status    TaskStatus `gorm:"default:PENDING;not null"`
	Retries   int        `gorm:"default:0;not null"`
	Artifacts []string   `gorm:"type:text[]"`

	AdapterType   string                 `gorm:"type:string;nut null"`
	Configuration map[string]interface{} `gorm:"type:jsonb;not null"`

	SchedulingID uuid.UUID `gorm:"type:uuid;not null;index"`
	Scheduling   Scheduling
}

func (task *Task) BeforeCreate(tx *gorm.DB) (err error) {
	if task.ID == uuid.Nil {
		task.ID = uuid.New()
	}

	if task.Artifacts == nil {
		task.Artifacts = []string{}
	}

	if task.Status == "" {
		task.Status = TaskStatusPending
	}

	if task.AdapterType == "" {
		task.AdapterType = task.Scheduling.AdapterType
	}

	if task.Configuration == nil {
		task.Configuration = make(map[string]interface{})
	}

	return validateTaskStatus(task.Status)
}

func (task *Task) BeforeUpdate(tx *gorm.DB) (err error) {
	return validateTaskStatus(task.Status)
}
