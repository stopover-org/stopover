package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/db/models"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph/model"
	"gorm.io/gorm"
	"log"
	"net/http"
)

type taskServiceImpl struct {
	db *gorm.DB
}

func NewTaskService() TaskService {
	return &taskServiceImpl{
		db: db.Instance(),
	}
}

func updateTaskStatus(db *gorm.DB, id uuid.UUID, status graphql.TaskStatus) {
	if err := db.Model(&models.Task{}).Where("id = ?", id).Update("Status", status).Error; err != nil {
		log.Printf("failed to update task status for task %s: %v", id, err)
	}
}

func (s *taskServiceImpl) PostUrl(id uuid.UUID, url string, configuration map[string]interface{}) {
	go func() {
		jsonData, err := json.Marshal(configuration)
		if err != nil {
			log.Printf("error occurred while marshaling configuration: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf("error occurred while creating request: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("error occurred while sending request: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			log.Printf("request failed with status: %s", resp.Status)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		var result map[string]interface{}
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			log.Printf("error occurred while decoding response: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		task := &models.Task{}
		if err := s.db.First(task, "id = ?", id).Error; err != nil {
			log.Printf("error occurred while fetching task: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		task.Status = graphql.TaskStatusCompleted
		if err := s.db.Save(task).Error; err != nil {
			log.Printf("error occurred while saving task: %v", err)
			updateTaskStatus(s.db, id, graphql.TaskStatusFailed)
			return
		}

		log.Printf("Response: %+v", result)
	}()
}

func (s *taskServiceImpl) ExecTask(id uuid.UUID) (*models.Task, error) {
	task := &models.Task{}
	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if task.Retries >= task.Scheduling.MaxRetries {
		return nil, fmt.Errorf("max retries exceeded. max retries: %s", task.Scheduling.MaxRetries)
	}

	task.Status = graphql.TaskStatusProcessing
	task.Retries++

	var config map[string]interface{}

	// Unmarshal the JSON-encoded byte slice to a map
	if err := json.Unmarshal(task.Configuration, &config); err != nil {
		return nil, err
	}

	url, ok := config["url"].(string)
	if !ok || url == "" {
		return nil, fmt.Errorf("URL not found in task configuration")
	}

	s.PostUrl(task.ID, url, config)

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) RetryTask(id uuid.UUID) (*models.Task, error) {
	task := &models.Task{}
	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if task.Status == graphql.TaskStatusProcessing {
		return nil, errors.New("task is already processing")
	}

	task.Status = graphql.TaskStatusPending
	task.Retries = 0

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) GetTask(id uuid.UUID) (*models.Task, error) {
	task := &models.Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return task, nil
}
