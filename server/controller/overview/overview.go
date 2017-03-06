package overview

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func IndexByAdmin(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "wemall!\n")
}

