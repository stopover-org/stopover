package services

import (
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/db/models"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph/model"
	"gorm.io/gorm"
	"time"
)

type schedulingServiceImpl struct {
	db *gorm.DB
}

func NewSchedulingService() SchedulingService {
	return &schedulingServiceImpl{
		db: db.Instance(),
	}
}

func (s *schedulingServiceImpl) CreateScheduling(createdFields graphql.SchedulingInput) (*models.Scheduling, error) {
	var configuration map[string]interface{}
	if err := json.Unmarshal([]byte(createdFields.Configuration), &configuration); err != nil {
		return nil, err
	}

	configJSON, err := json.Marshal(configuration)
	if err != nil {
		return nil, err
	}

	scheduling := &models.Scheduling{
		Status:        graphql.SchedulingStatusInactive,
		AdapterType:   createdFields.AdapterType,
		Configuration: configJSON,
	}

	if createdFields.RetentionPeriod != nil {
		retentionPeriod := *createdFields.RetentionPeriod
		if retentionPeriod < 60 {
			retentionPeriod = 60
			createdFields.RetentionPeriod = &retentionPeriod
		}

		scheduling.RetentionPeriod = *createdFields.RetentionPeriod
	}

	if createdFields.MaxRetries != nil {
		scheduling.MaxRetries = *createdFields.MaxRetries
	}

	if err := s.db.Create(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) UpdateScheduling(id uuid.UUID, updatedFields graphql.UpdateSchedulingInput) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{
		ID: id,
	}

	if updatedFields.Configuration != nil {
		var configuration map[string]interface{}
		if err := json.Unmarshal([]byte(*updatedFields.Configuration), &configuration); err != nil {
			return nil, err
		}

		configJSON, err := json.Marshal(configuration)
		if err != nil {
			return nil, err
		}

		scheduling.Configuration = configJSON
	}

	if updatedFields.AdapterType != nil {
		scheduling.AdapterType = *updatedFields.AdapterType
	}

	if updatedFields.RetentionPeriod != nil {
		scheduling.RetentionPeriod = *updatedFields.RetentionPeriod
	}

	if updatedFields.MaxRetries != nil {
		scheduling.MaxRetries = *updatedFields.MaxRetries
	}

	if err := s.db.First(scheduling, "id = ?", id).Error; err != nil {
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

	if scheduling.Status == graphql.SchedulingStatusActive {
		scheduling.Status = graphql.SchedulingStatusInactive
		scheduling.NextScheduleTime = nil
	} else {
		scheduling.Status = graphql.SchedulingStatusActive

		if scheduling.RetentionPeriod != 0 {
			now := time.Now()
			scheduling.NextScheduleTime = &now
		}
	}
	if err := s.db.Save(scheduling).Error; err != nil {
		return nil, err
	}

	return scheduling, nil
}

func (s *schedulingServiceImpl) RemoveScheduling(id uuid.UUID) (*models.Scheduling, error) {
	scheduling := &models.Scheduling{}

	if scheduling.Status == graphql.SchedulingStatusActive {
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

	if err := s.db.First(scheduling, "id = ? AND status = ?", id, graphql.SchedulingStatusActive).Error; err != nil {
		return nil, scheduling, err
	}

	now := time.Now()

	task := &models.Task{
		Scheduling:    scheduling,
		Retries:       0,
		Status:        graphql.TaskStatusPending,
		ScheduledAt:   &now,
		AdapterType:   scheduling.AdapterType,
		Configuration: scheduling.Configuration,
	}

	if err := s.db.Create(task).Error; err != nil {
		return task, scheduling, err
	}

	if scheduling.RetentionPeriod > 0 {
		nextSchedulingTime := scheduling.NextScheduleTime.Add(time.Duration(scheduling.RetentionPeriod) * time.Second)
		scheduling.NextScheduleTime = &nextSchedulingTime

		if err := s.db.Save(scheduling).Error; err != nil {
			return task, scheduling, err
		}
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
