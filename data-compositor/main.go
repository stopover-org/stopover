package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4/middleware"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/stopover-org/stopover/data-compositor/db"
	"github.com/stopover-org/stopover/data-compositor/internal/graphql/graph"
)

func main() {
	// Initialize the database
	db.Init()
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// GraphQL handler
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

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
