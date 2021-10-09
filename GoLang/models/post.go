package models

import "gopkg.in/mgo.v2/bson"

type Post struct {
	Id        bson.ObjectId `json:"id_p" bson:" id_p"`
	Caption   string        `json:"caption" bson:"caption"`
	Image_Url string        `json:"url" bson:"url"`
	Timestamp string        `json:"time" bson:"time"`
}
