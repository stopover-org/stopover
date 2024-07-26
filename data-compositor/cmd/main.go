package main

import (
    "log"
    "your_project/internal/jobs"

    "github.com/labstack/echo/v4"
)

func main() {
    // Initialize Echo
    e := echo.New()

    // Initialize the job scheduler
    scheduler := jobs.SetupScheduler()
    scheduler.StartAsync()

    // Start the server
    log.Fatal(e.Start(":3321"))
}