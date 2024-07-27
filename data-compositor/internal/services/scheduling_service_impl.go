package services

import (
	"errors"
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/db/models"
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

func (s *schedulingServiceImpl) CreateScheduling(taskId uuid.UUID, createdFields map[string]interface{}) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{
		Status: models.SchedulingStatusInactive,
	}

	if err := s.db.Model(scheduling).Updates(createdFields).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) UpdateScheduling(scheduleId uuid.UUID, updatedFields map[string]interface{}) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if err := s.db.First(scheduling, "id = ?", scheduleId).Error; err != nil {
		return nil, err
	}

	if err := s.db.Model(scheduling).Updates(updatedFields).Error; err != nil {

		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) ToggleScheduling(id uuid.UUID) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if scheduling.Status == models.SchedulingStatusActive {
		scheduling.Status = models.SchedulingStatusInactive
	} else {
		scheduling.Status = models.SchedulingStatusActive
	}
	if err := s.db.Save(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) RemoveScheduling(id uuid.UUID) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if scheduling.Status != models.SchedulingStatusActive {
		return nil, errors.New("Active scheduling cannot be removed")
	}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if err := s.db.Delete(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) ScheduleNow(id uuid.UUID) (*models.Task, *models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, nil, err
	}

	task := &models.Task{
		Scheduling:    *scheduling,
		Retries:       0,
		Status:        models.TaskStatusPending,
		AdapterType:   scheduling.AdapterType,
		Configuration: scheduling.Configuration,
	}

	if err := s.db.Create(task).Error; err != nil {
		return nil, scheduling, err
	}

	return task, scheduling, nil
}

func (s *schedulingServiceImpl) GetScheduling(id uuid.UUID) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}
