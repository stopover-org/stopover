package graph

import (
	"github.com/stopover-org/stopover/data-compositor/internal/services"
)

type Resolver struct {
	TaskService       services.TaskService
	SchedulingService services.SchedulingService
}
