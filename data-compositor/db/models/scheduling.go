package models

import (
	"fmt"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type SchedulingStatus string

const (
	SchedulingStatusActive   SchedulingStatus = "ACTIVE"
	SchedulingStatusInactive SchedulingStatus = "INACTIVE"
)

func validateSchedulingStatus(status SchedulingStatus) error {
	switch status {
	case SchedulingStatusActive, SchedulingStatusInactive:
		return nil
	default:
		return fmt.Errorf("invalid SchedulingStatus: %s", status)
	}
}

type Scheduling struct {
	ID               uuid.UUID `gorm:"type:uuid;primaryKey"`
	NextScheduleTime time.Time
	RetentionPeriod  int              `gorm:"default:86400;not null"`
	MaxRetries       int              `gorm:"default:3;not null"`
	Status           SchedulingStatus `gorm:"not null"`
	AdapterType      string           `gorm:"not null"`
	Tasks            []Task           `gorm:"foreignKey:SchedulingID"`
}

func (scheduling *Scheduling) BeforeCreate(tx *gorm.DB) (err error) {
	if scheduling.ID == uuid.Nil {
		scheduling.ID = uuid.New()
	}

	return validateSchedulingStatus(scheduling.Status)
}

func (scheduling *Scheduling) BeforeUpdate(tx *gorm.DB) (err error) {
	return validateSchedulingStatus(scheduling.Status)
}
