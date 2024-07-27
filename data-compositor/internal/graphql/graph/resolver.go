package graph

import (
	"context"
	"github.com/google/uuid"
	graph "github.com/stopover-org/stopover/data-compositor/internal/graphql"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph/model"
	"github.com/stopover-org/stopover/data-compositor/internal/services"
)

type Resolver struct {
	NewTaskService       services.TaskService
	NewSchedulingService services.SchedulingService
}

func (r *mutationResolver) RetryTask(ctx context.Context, id string) (*graphql.Task, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	task, err := r.NewTaskService.RetryTask(guid)
	if err != nil {
		return nil, err
	}
	return graph.TaskToGraphql(task)
}

func (r *mutationResolver) ScheduleNow(ctx context.Context, id string) (*graphql.Task, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	task, _, err := r.NewSchedulingService.ScheduleNow(guid)
	if err != nil {
		return nil, err
	}

	return graph.TaskToGraphql(task)
}

func (r *mutationResolver) CreateScheduling(ctx context.Context, input graphql.SchedulingInput) (*graphql.Scheduling, error) {
	scheduling, err := r.NewSchedulingService.CreateScheduling(input)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

func (r *mutationResolver) UpdateScheduling(ctx context.Context, input graphql.UpdateSchedulingInput) (*graphql.Scheduling, error) {
	guid, err := uuid.Parse(input.ID)
	if err != nil {
		return nil, err
	}

	scheduling, err := services.NewSchedulingService().UpdateScheduling(guid, input)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

func (r *mutationResolver) ToggleScheduling(ctx context.Context, id string) (*graphql.Scheduling, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	scheduling, err := services.NewSchedulingService().ToggleScheduling(guid)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

func (r *mutationResolver) RemoveScheduling(ctx context.Context, id string) (*graphql.Scheduling, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	scheduling, err := r.NewSchedulingService.RemoveScheduling(guid)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

// Task is the resolver for the task field.
func (r *queryResolver) Task(ctx context.Context, id string) (*graphql.Task, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	task, err := r.NewTaskService.GetTask(guid)
	if err != nil {
		return nil, err
	}

	return graph.TaskToGraphql(task)
}

// Scheduling is the resolver for the scheduling field.
func (r *queryResolver) Scheduling(ctx context.Context, id string) (*graphql.Scheduling, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	scheduling, err := r.NewSchedulingService.GetScheduling(guid)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
