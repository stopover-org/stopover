package main

import (
    "log"

    "github.com/labstack/echo/v4"
    "github.com/stopover-org/stopover/data-compositor/db"
    "github.com/stopover-org/stopover/data-compositor/internal/graphql"
    "github.com/stopover-org/stopover/data-compositor/internal/jobs"
)

func main() {
    // Initialize the database
    db.Init()

    // Initialize Echo
    e := echo.New()

    graphql.RegisterGraphQLRoutes(e)

    // Initialize the job scheduler
    scheduler := jobs.SetupScheduler()
    scheduler.StartAsync()

    // Start the server
    log.Fatal(e.Start(":3321"))
}