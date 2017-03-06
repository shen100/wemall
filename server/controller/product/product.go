package product

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func ListByAdmin(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "list!\n")
}

func Save(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "save!\n")
}