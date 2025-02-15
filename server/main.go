package main

import (
	"article-server/controllers"
	"embed"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

const buildDir = "dist"

//go:embed dist
var staticFS embed.FS

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile(buildDir, true)))

	newsController := controllers.NewArticleController()

	router.GET("/api/news", newsController.GetNews)

	router.Run(":8080")
}
