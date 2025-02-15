package controllers

import (
	"article-server/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ArticleController struct {
}

func NewArticleController() *ArticleController {
	return &ArticleController{}
}

// get News articles

func (ctrl *ArticleController) GetNews(c *gin.Context) {
	// city := c.Query("city")
	// log.Println(city)
	question := c.Query("q")

	// get api key from header Authorization
	apiKey := c.GetHeader("Authorization")

	log.Println(apiKey)

	if apiKey == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// remove Bearer from apiKey
	apiKey = apiKey[7:]

	newsApi := fmt.Sprintf("https://newsapi.org/v2/everything?apiKey=%s&q=%s", apiKey, question)

	news := models.NewsArticles{}
	// call api
	client := &http.Client{}
	req, err := http.NewRequest("GET", newsApi, nil)
	if err != nil {
		log.Fatal(err)
	}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	err = json.NewDecoder(resp.Body).Decode(&news)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}
