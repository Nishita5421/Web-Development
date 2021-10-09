package main

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
	"main.go/controllers"
)

func main() {
	fmt.Print("Hello World")
	uc := controllers.NewUserController(getSession())

	r := httprouter.New()
	r.GET("/users/:id", uc.GetUser)
	r.POST("/users", uc.CreateUser)
	r.GET("/posts/:id", uc.GetPost)
	r.POST("/posts", uc.CreatePost)
	r.GET("/posts/users/:id", uc.GetAllPost)
	http.ListenAndServe("localhost:3000", r)

}

func getSession() *mgo.Session {
	s, err := mgo.Dial("mongodb://localhost:27107")
	if err != nil {
		panic(err)
	}
	return s
}
