package services

import (
	"bytes"
	"encoding/json"
	"fmt"
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

func PostUrl(url string, configuration map[string]interface{}) {
	go func() {
		// Convert the entire configuration to JSON
		jsonData, err := json.Marshal(configuration)
		if err != nil {
			log.Printf("error occurred while marshaling configuration: %v", err)
			return
		}

		// Create a new HTTP POST request with the JSON data
		req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf("error occurred while creating request: %v", err)
			return
		}

		// Set the appropriate headers
		req.Header.Set("Content-Type", "application/json")

		// Send the POST request
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("error occurred while sending request: %v", err)
			return
		}
		defer resp.Body.Close()

		// Check the response status
		if resp.StatusCode != http.StatusOK {
			log.Printf("request failed with status: %s", resp.Status)
			return
		}

		// Read and log the response body
		var result map[string]interface{}
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			log.Printf("error occurred while decoding response: %v", err)
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

	PostUrl(url, task.Configuration)

	return task, nil
}

func (s *taskServiceImpl) RetryTask(id string) (*models.Task, error) {
	task := &models.Task{}
	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	task.Status = models.TaskStatusRunning
	task.Retries++

	if err := s.db.Save(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskServiceImpl) TerminateTask(id string) (*models.Task, error) {
	task := &models.Task{}

	if err := s.db.First(task, "id = ?", id).Error; err != nil {
		return nil, err
	}

	task.Status = models.TaskStatusTerminated

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
