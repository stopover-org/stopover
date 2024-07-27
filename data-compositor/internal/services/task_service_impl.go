package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/db/models"
	"gorm.io/gorm"
	"log"
	"net/http"
)

type taskServiceImpl struct {
	db *gorm.DB
}

func NewTaskService() TaskService {
	return &taskServiceImpl{
		db: db.DB,
	}
}

func updateTaskStatus(db *gorm.DB, id uuid.UUID, status models.TaskStatus) {
	if err := db.Model(&models.Task{}).Where("id = ?", id).Update("Status", status).Error; err != nil {
		log.Printf("failed to update task status for task %s: %v", id, err)
	}
}

func PostUrl(id uuid.UUID, url string, configuration map[string]interface{}) {
	go func() {
		jsonData, err := json.Marshal(configuration)
		if err != nil {
			log.Printf("error occurred while marshaling configuration: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf("error occurred while creating request: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("error occurred while sending request: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			log.Printf("request failed with status: %s", resp.Status)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		var result map[string]interface{}
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			log.Printf("error occurred while decoding response: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		task := &models.Task{}
		if err := db.DB.First(task, "id = ?", id).Error; err != nil {
			log.Printf("error occurred while fetching task: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		task.Status = models.TaskStatusCompleted
		if err := db.DB.Save(task).Error; err != nil {
			log.Printf("error occurred while saving task: %v", err)
			updateTaskStatus(db.DB, id, models.TaskStatusFailed)
			return
		}

		log.Printf("Response: %+v", result)
	}()
}

func (s *taskServiceImpl) ExecTask(id string) (*models.Task, error) {
	task := &models.Task{}
	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if task.Retries >= task.Scheduling.MaxRetries {
		return nil, fmt.Errorf("max retries exceeded. max retries: %s", task.Scheduling.MaxRetries)
	}

	task.Status = models.TaskStatusRunning
	task.Retries++

	url, ok := task.Configuration["url"].(string)
	if !ok || url == "" {
		return nil, fmt.Errorf("URL not found in task configuration")
	}

	PostUrl(task.ID, url, task.Configuration)

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) RetryTask(id string) (*models.Task, error) {
	task := &models.Task{}
	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	task.Status = models.TaskStatusRunning
	task.Retries++

	url, ok := task.Configuration["url"].(string)
	if !ok || url == "" {
		return nil, fmt.Errorf("URL not found in task configuration")
	}

	PostUrl(task.ID, url, task.Configuration)

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) GetTask(id string) (*models.Task, error) {
	task := &models.Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return task, nil
}
