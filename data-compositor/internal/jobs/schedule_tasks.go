package jobs

import "github.com/google/uuid"

type ScheduleTasks interface {
	Schedule() []uuid.UUID
}
