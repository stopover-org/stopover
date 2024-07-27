package services

import (
	"github.com/stopover-org/stopover/data-compositor/db"
	"gorm.io/gorm"
)

type schedulingServiceImpl struct {
	db *gorm.DB
}

func NewSchedulingService() SchedulingService {
	return &schedulingServiceImpl{
		db: db.DB,
	}
}

func (s *schedulingServiceImpl) CreateScheduling(taskId, scheduleTime string) (*Scheduling, error) {
	scheduling := &Scheduling{
		TaskID:       taskId,
		ScheduleTime: scheduleTime,
		Active:       true,
	}

	if err := s.db.Create(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) UpdateScheduling(scheduleId, newScheduleTime string) (*Scheduling, error) {
	scheduling := &Scheduling{}

	if err := s.db.First(scheduling, "id = ?", scheduleId).Error; err != nil {
		return nil, err
	}

	scheduling.ScheduleTime = newScheduleTime
	if err := s.db.Save(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) ToggleScheduling(scheduleId string) (*Scheduling, error) {
	scheduling := &Scheduling{}

	if err := s.db.First(scheduling, "id = ?", scheduleId).Error; err != nil {
		return nil, err
	}

	scheduling.Active = !scheduling.Active
	if err := s.db.Save(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) RemoveScheduling(scheduleId string) (*Scheduling, error) {
	scheduling := &Scheduling{}

	if err := s.db.First(scheduling, "id = ?", scheduleId).Error; err != nil {
		return nil, err
	}

	if err := s.db.Delete(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) ScheduleNow(id string) (*Scheduling, error) {
	scheduling := &Scheduling{}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) GetScheduling(id string) (*Scheduling, error) {
	scheduling := &Scheduling{}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}
