// internal/graphql/handlers.go
package graphql

import (
    "net/http"
    "log"

    "github.com/graphql-go/graphql"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "github.com/stopover-org/stopover/data-compositor/internal/services"
)

func RegisterGraphQLRoutes(e *echo.Echo) {
    taskService := services.NewTaskService()
    schedulingService := services.NewSchedulingService()
    resolver := NewResolver(taskService, schedulingService)

    schema, err := graphql.NewSchema(graphql.SchemaConfig{
        Query:    rootQuery,
        Mutation: mutationType,
        Subscription: subscriptionType,
    })
    if err != nil {
        log.Fatalf("Failed to create GraphQL schema: %v", err)
    }

    e.POST("/graphql", func(c echo.Context) error {
        var params struct {
            Query string `json:"query"`
        }
        if err := c.Bind(&params); err != nil {
            return c.JSON(http.StatusBadRequest, err)
        }
        result := graphql.Do(graphql.Params{
            Schema:        schema,
            RequestString: params.Query,
            RootObject:    map[string]interface{}{
                "resolver": resolver,
            },
        })
        return c.JSON(http.StatusOK, result)
    })

    e.Use(middleware.Logger())
    e.Use(middleware.Recover())
}