// internal/services/task_service.go
package services

type TaskStatus string

const (
    Pending    TaskStatus = "PENDING"
    Processing TaskStatus = "PROCESSING"
    Succeeded  TaskStatus = "SUCCEEDED"
    Failed     TaskStatus = "FAILED"
    Terminated TaskStatus = "TERMINATED"
)

type Task struct {
    ID        string
    Status    TaskStatus
    Retries   int
    Artifacts []string
}

type TaskService interface {
    ExecTask(id, data string) (*Task, error)
    RetryTask(id string) (*Task, error)
    TerminateTask(id string) (*Task, error)
}
