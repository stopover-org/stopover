// internal/services/scheduling_service.go
package services

type Scheduling struct {
    ID           string
    TaskID       string
    ScheduleTime string
    Active       bool
}

type SchedulingService interface {
    CreateScheduling(taskId, scheduleTime string) (*Scheduling, error)
    UpdateScheduling(scheduleId, newScheduleTime string) (*Scheduling, error)
    ToggleScheduling(scheduleId string) (*Scheduling, error)
    RemoveScheduling(scheduleId string) (*Scheduling, error)
}
