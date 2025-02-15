package models

// type WeatherResponse struct {
// 	CurrentCondition []Weather    `json:"current_condition"`
// 	WeatherDesc      []WeatherDes `json:"weather_desc"`
// }

// type Weather struct {
// 	FeelsLikeC string `json:"FeelsLikeC"`
// 	FeelsLikeF string `json:"FeelsLikeF"`
// 	UvIndex    string `json:"uvIndex"`
// }

// type WeatherDes struct {
// 	Value string `json:"value"`
// }

type NewsArticles struct {
	Articles []Article `json:"articles"`
	Source   []Source  `json:"source"`
}

type Article struct {
	Author      string `json:"author"`
	Title       string `json:"title"`
	Url         string `json:"url"`
	Description string `json:"description"`
}

type Source struct {
	Name string `json:"name"`
}
