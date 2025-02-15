package main

import (
	"article-server/controllers"
	"embed"
	"io/fs"
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type embedFS struct {
	http.FileSystem
}

const buildDir = "dist"

//go:embed dist
var staticFS embed.FS

func main() {
	router := gin.Default()

	// router.Use(static.Serve("/", static.LocalFile(buildDir, true)))

	newsController := controllers.NewArticleController()

	router.GET("/api/news", newsController.GetNews)

	staticFileSubDir, err := fs.Sub(staticFS, buildDir)
	if err != nil {
		panic(err)
	}
	staticFileFS := http.FS(staticFileSubDir)
	router.Use(static.Serve("/", embedFS{staticFileFS}))

	router.Run(":8080")
}

func (e embedFS) Exists(prefix string, name string) bool {
	f, err := e.Open(name)
	if err != nil {
		return false
	}
	f.Close()
	return true
}
