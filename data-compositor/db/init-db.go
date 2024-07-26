// db/init.go
package db

import (
    "fmt"
    "log"
    "os"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"
)

var DB *gorm.DB

func Init() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file")
    }

    dsn := fmt.Sprintf(
        "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_PORT"),
    )

    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }

    // Migrate the schema
    err = DB.AutoMigrate(&Task{}, &Scheduling{})
    if err != nil {
        log.Fatalf("Error migrating schema: %v", err)
    }
}

type Task struct {
    ID        string `gorm:"primaryKey"`
    Status    string
    Retries   int
    Artifacts []string `gorm:"type:text[]"`
}

type Scheduling struct {
    ID           string `gorm:"primaryKey"`
    TaskID       string
    ScheduleTime string
    Active       bool
}
