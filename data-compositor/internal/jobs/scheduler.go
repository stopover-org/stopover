package jobs

import (
    "fmt"
    "time"

    "github.com/go-co-op/gocron"
)

func SetupScheduler() *gocron.Scheduler {
    // Create a new scheduler
    s := gocron.NewScheduler(time.UTC)

    // Define jobs
    s.Every(10).Minutes().Do(task1)

    return s
}

func task1() {
    fmt.Println("Running Task 2: Every 10 minutes")
}