// internal/graphql/resolver.go
package graphql

import (
    "github.com/graphql-go/graphql"
    "github.com/stopover-org/stopover/data-compositor/internal/services"
)

// Define the Task and Scheduling types
type Task struct {
    ID        string `json:"id"`
    Status    string `json:"status"`
    Retries   int    `json:"retries"`
    Artifacts []string `json:"artifacts"`
}

type Scheduling struct {
    ID           string `json:"id"`
    TaskID       string `json:"taskId"`
    ScheduleTime string `json:"scheduleTime"`
    Active       bool   `json:"active"`
}

type Resolver struct {
    TaskService       services.TaskService
    SchedulingService services.SchedulingService
}

func NewResolver(taskService services.TaskService, schedulingService services.SchedulingService) *Resolver {
    return &Resolver{
        TaskService:       taskService,
        SchedulingService: schedulingService,
    }
}

func (r *Resolver) ResolveExecTask(p graphql.ResolveParams) (interface{}, error) {
    input := p.Args["input"].(map[string]interface{})
    id := input["id"].(string)
    data := input["data"].(string)
    return r.TaskService.ExecTask(id, data)
}

func (r *Resolver) ResolveRetryTask(p graphql.ResolveParams) (interface{}, error) {
    id := p.Args["id"].(string)
    return r.TaskService.RetryTask(id)
}

func (r *Resolver) ResolveTerminateTask(p graphql.ResolveParams) (interface{}, error) {
    id := p.Args["id"].(string)
    return r.TaskService.TerminateTask(id)
}

// Define your rootQuery
var rootQuery = graphql.NewObject(graphql.ObjectConfig{
    Name: "Query",
    Fields: graphql.Fields{
        "getTask": &graphql.Field{
            Type: taskType,
            Args: graphql.FieldConfigArgument{
                "id": &graphql.ArgumentConfig{
                    Type: graphql.NewNonNull(graphql.ID),
                },
            },
            Resolve: func(params graphql.ResolveParams) (interface{}, error) {
                id := params.Args["id"].(string)
                return &Task{
                    ID: id,
                }, nil
            },
        },
        "getScheduling": &graphql.Field{
            Type: schedulingType,
            Args: graphql.FieldConfigArgument{
                "id": &graphql.ArgumentConfig{
                    Type: graphql.NewNonNull(graphql.ID),
                },
            },
            Resolve: func(params graphql.ResolveParams) (interface{}, error) {
                id := params.Args["id"].(string)
                return &Scheduling{
                    ID: id,
                }, nil
            },
        },
    },
})

// Define your mutationType
var mutationType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Mutation",
    Fields: graphql.Fields{
        "execTask": &graphql.Field{
            Type: taskType,
            Args: graphql.FieldConfigArgument{
                "input": &graphql.ArgumentConfig{
                    Type: graphql.NewNonNull(taskInputType),
                },
            },
            Resolve: func(params graphql.ResolveParams) (interface{}, error) {
                input := params.Args["input"].(map[string]interface{})
                id := input["id"].(string)
                return &Task{
                    ID:   id,
                    Status: "PROCESSING",
                    Retries: 0,
                    Artifacts: []string{},
                }, nil
            },
        },
        // Add other mutations similarly
    },
})

// Define your subscriptionType if needed
var subscriptionType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Subscription",
    Fields: graphql.Fields{
        // Add your subscription fields
    },
})

// Define your types
var taskType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Task",
    Fields: graphql.Fields{
        "id": &graphql.Field{
            Type: graphql.ID,
        },
        "status": &graphql.Field{
            Type: graphql.String,
        },
        "retries": &graphql.Field{
            Type: graphql.Int,
        },
        "artifacts": &graphql.Field{
            Type: graphql.NewList(graphql.String),
        },
    },
})

var schedulingType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Scheduling",
    Fields: graphql.Fields{
        "id": &graphql.Field{
            Type: graphql.ID,
        },
        "taskId": &graphql.Field{
            Type: graphql.ID,
        },
        "scheduleTime": &graphql.Field{
            Type: graphql.String,
        },
        "active": &graphql.Field{
            Type: graphql.Boolean,
        },
    },
})

var taskInputType = graphql.NewInputObject(
    graphql.InputObjectConfig{
        Name: "TaskInput",
        Fields: graphql.InputObjectConfigFieldMap{
            "id": &graphql.InputObjectFieldConfig{
                Type: graphql.NewNonNull(graphql.ID),
            },
            "data": &graphql.InputObjectFieldConfig{
                Type: graphql.NewNonNull(graphql.String),
            },
        },
    },
)
