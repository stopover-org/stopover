package jobs

import (
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db/models"
	"github.com/stopover-org/stopover/data-compositor/internal/services"
	"gorm.io/gorm"
)

type scheduleTasksImpl struct {
	db *gorm.DB
}

func (s *scheduleTasksImpl) Schedule() ([]uuid.UUID, error) {
	var schedulings []models.Scheduling
	err := s.db.Where("status = ? AND next_schedule_time < NOW() AND retention_period > 0").Find(&schedulings).Error
	if err != nil {
		return nil, err
	}

	var ids []uuid.UUID

	for _, scheduling := range schedulings {
		task, _, err := services.NewSchedulingService().ScheduleNow(scheduling.ID)
		if err != nil {
			return nil, err
		}

		ids = append(ids, task.ID)
	}

	return ids, nil
}
