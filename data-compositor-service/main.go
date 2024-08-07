package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4/middleware"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/internal/jobs"
	"github.com/stopover-org/stopover/data-compositor/internal/services"
	"github.com/stopover-org/stopover/data-compositor/kafka"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph"
)

func main() {
	log.Println("Starting job scheduler")

	// Get singletons
	dbInstance := db.Instance()
	kafkaInstance := kafka.Instance()

	// Setup and start the scheduler
	jobs.SetupScheduler(dbInstance, kafkaInstance)

	// Initialize Echo
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// GraphQL handler
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		TaskService:       services.NewTaskService(),
		SchedulingService: services.NewSchedulingService(),
	}}))

	e.POST("/graphql", func(c echo.Context) error {
		srv.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	// Playground handler
	e.GET("/playground", func(c echo.Context) error {
		playground.Handler("GraphQL playground", "/graphql").ServeHTTP(c.Response(), c.Request())
		return nil
	})

	// Start the server
	log.Fatal(e.Start(":3321"))
}
