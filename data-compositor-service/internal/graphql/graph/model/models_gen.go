// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graphql

import (
	"fmt"
	"io"
	"strconv"
)

type Node interface {
	IsNode()
	GetID() string
}

type Mutation struct {
}

type PageInfo struct {
	HasNextPage     bool    `json:"hasNextPage"`
	HasPreviousPage bool    `json:"hasPreviousPage"`
	StartCursor     *string `json:"startCursor,omitempty"`
	EndCursor       *string `json:"endCursor,omitempty"`
	TotalCount      *int    `json:"totalCount,omitempty"`
}

type Query struct {
}

type Scheduling struct {
	ID               string           `json:"id"`
	Name             string           `json:"name"`
	NextScheduleTime *string          `json:"nextScheduleTime,omitempty"`
	RetentionPeriod  int              `json:"retentionPeriod"`
	MaxRetries       int              `json:"maxRetries"`
	Status           SchedulingStatus `json:"status"`
	AdapterType      AdapterType      `json:"adapterType"`
	Configuration    string           `json:"configuration"`
	Tasks            *TaskConnection  `json:"tasks"`
}

func (Scheduling) IsNode()            {}
func (this Scheduling) GetID() string { return this.ID }

type SchedulingConnection struct {
	Edges    []*SchedulingEdge `json:"edges"`
	PageInfo *PageInfo         `json:"pageInfo"`
}

type SchedulingEdge struct {
	Node   *Scheduling `json:"node"`
	Cursor string      `json:"cursor"`
}

type SchedulingFilterInput struct {
	Name        *string           `json:"name,omitempty"`
	Status      *SchedulingStatus `json:"status,omitempty"`
	AdapterType *AdapterType      `json:"adapterType,omitempty"`
}

type SchedulingInput struct {
	Name            string      `json:"name"`
	RetentionPeriod *int        `json:"retentionPeriod,omitempty"`
	MaxRetries      *int        `json:"maxRetries,omitempty"`
	AdapterType     AdapterType `json:"adapterType"`
	Configuration   string      `json:"configuration"`
}

type Task struct {
	ID            string      `json:"id"`
	Status        TaskStatus  `json:"status"`
	Retries       int         `json:"retries"`
	Artifacts     []string    `json:"artifacts"`
	AdapterType   AdapterType `json:"adapterType"`
	Configuration string      `json:"configuration"`
	SchedulingID  string      `json:"schedulingId"`
	Scheduling    *Scheduling `json:"scheduling"`
}

func (Task) IsNode()            {}
func (this Task) GetID() string { return this.ID }

type TaskConnection struct {
	Edges    []*TaskEdge `json:"edges"`
	PageInfo *PageInfo   `json:"pageInfo"`
}

type TaskEdge struct {
	Node   *Task  `json:"node"`
	Cursor string `json:"cursor"`
}

type TaskFilterInput struct {
	SchedulingID string       `json:"schedulingId"`
	Status       *TaskStatus  `json:"status,omitempty"`
	AdapterType  *AdapterType `json:"adapterType,omitempty"`
}

type UpdateSchedulingInput struct {
	ID              string       `json:"id"`
	Name            *string      `json:"name,omitempty"`
	RetentionPeriod *int         `json:"retentionPeriod,omitempty"`
	MaxRetries      *int         `json:"maxRetries,omitempty"`
	AdapterType     *AdapterType `json:"adapterType,omitempty"`
	Configuration   *string      `json:"configuration,omitempty"`
}

type AdapterType string

const (
	AdapterTypeViatorEventScrapper AdapterType = "VIATOR_EVENT_SCRAPPER"
)

var AllAdapterType = []AdapterType{
	AdapterTypeViatorEventScrapper,
}

func (e AdapterType) IsValid() bool {
	switch e {
	case AdapterTypeViatorEventScrapper:
		return true
	}
	return false
}

func (e AdapterType) String() string {
	return string(e)
}

func (e *AdapterType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AdapterType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AdapterType", str)
	}
	return nil
}

func (e AdapterType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type SchedulingStatus string

const (
	SchedulingStatusActive   SchedulingStatus = "ACTIVE"
	SchedulingStatusInactive SchedulingStatus = "INACTIVE"
)

var AllSchedulingStatus = []SchedulingStatus{
	SchedulingStatusActive,
	SchedulingStatusInactive,
}

func (e SchedulingStatus) IsValid() bool {
	switch e {
	case SchedulingStatusActive, SchedulingStatusInactive:
		return true
	}
	return false
}

func (e SchedulingStatus) String() string {
	return string(e)
}

func (e *SchedulingStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SchedulingStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SchedulingStatus", str)
	}
	return nil
}

func (e SchedulingStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type TaskStatus string

const (
	TaskStatusPending    TaskStatus = "PENDING"
	TaskStatusProcessing TaskStatus = "PROCESSING"
	TaskStatusCompleted  TaskStatus = "COMPLETED"
	TaskStatusFailed     TaskStatus = "FAILED"
	TaskStatusTerminated TaskStatus = "TERMINATED"
)

var AllTaskStatus = []TaskStatus{
	TaskStatusPending,
	TaskStatusProcessing,
	TaskStatusCompleted,
	TaskStatusFailed,
	TaskStatusTerminated,
}

func (e TaskStatus) IsValid() bool {
	switch e {
	case TaskStatusPending, TaskStatusProcessing, TaskStatusCompleted, TaskStatusFailed, TaskStatusTerminated:
		return true
	}
	return false
}

func (e TaskStatus) String() string {
	return string(e)
}

func (e *TaskStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = TaskStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid TaskStatus", str)
	}
	return nil
}

func (e TaskStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
