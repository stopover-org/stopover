package services

import (
	"github.com/stopover-org/stopover/data-compositor/db"
	"gorm.io/gorm"
)

type taskServiceImpl struct {
	db *gorm.DB
}

func NewTaskService() TaskService {
	return &taskServiceImpl{
		db: db.DB,
	}
}

func (s *taskServiceImpl) ExecTask(id, data string) (*Task, error) {
	task := &Task{
		ID:      id,
		Status:  Processing,
		Retries: 0,
	}

	if err := s.db.Create(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) RetryTask(id string) (*Task, error) {
	task := &Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	task.Status = Processing
	task.Retries++

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) TerminateTask(id string) (*Task, error) {
	task := &Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	task.Status = Terminated

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) GetTask(id string) (*Task, error) {
	task := &Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return task, nil
}
