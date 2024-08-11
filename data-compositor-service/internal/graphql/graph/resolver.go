package graph

import (
	"context"
	"github.com/google/uuid"
	graph "github.com/stopover-org/stopover/data-compositor/internal/graphql"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph/model"
	"github.com/stopover-org/stopover/data-compositor/internal/services"
)

type Resolver struct {
	TaskService       services.TaskService
	SchedulingService services.SchedulingService
}

func (r *mutationResolver) RetryTask(ctx context.Context, id string) (*graphql.Task, error) {
	guid, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	task, err := r.Resolver.TaskService.RetryTask(guid)
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

	task, _, err := r.Resolver.SchedulingService.ScheduleNow(guid)
	if err != nil {
		return nil, err
	}

	return graph.TaskToGraphql(task)
}

func (r *mutationResolver) CreateScheduling(ctx context.Context, input graphql.SchedulingInput) (*graphql.Scheduling, error) {
	scheduling, err := r.Resolver.SchedulingService.CreateScheduling(input)
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

	scheduling, err := r.Resolver.SchedulingService.UpdateScheduling(guid, input)
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

	scheduling, err := r.Resolver.SchedulingService.ToggleScheduling(guid)
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

	scheduling, err := r.Resolver.SchedulingService.RemoveScheduling(guid)
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

	task, err := r.Resolver.TaskService.GetTask(guid)
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

	scheduling, err := r.Resolver.SchedulingService.GetScheduling(guid)
	if err != nil {
		return nil, err
	}

	return graph.SchedulingToGraphql(scheduling)
}

func (r *queryResolver) Tasks(ctx context.Context, input *graphql.TaskFilterInput, first *int, after *string, last *int, before *string) (*graphql.TaskConnection, error) {
	tasks, pageInfo, err := r.Resolver.TaskService.GetTasks(*input, *first, *after, *last, *before)
	if err != nil {
		return nil, err
	}

	connection, err := graph.TasksToGraphqlConnection(tasks, pageInfo)
	if err != nil {
		return nil, err
	}

	return connection, nil
}

func (r *queryResolver) Schedulings(ctx context.Context, input *graphql.SchedulingFilterInput, first *int, after *string, last *int, before *string) (*graphql.SchedulingConnection, error) {
	schedulings, pageInfo, err := r.Resolver.SchedulingService.GetSchedulings(*input, *first, *after, *last, *before)
	if err != nil {
		return nil, err
	}

	connection, err := graph.SchedulingsToGraphqlConnection(schedulings, pageInfo)
	if err != nil {
		return nil, err
	}

	return connection, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
