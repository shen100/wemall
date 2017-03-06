package main

import (
    "github.com/julienschmidt/httprouter"
    "net/http"
    "./server/controller/category"
    "./server/controller/overview"
    "./server/controller/product"
)

func main() {
    router := httprouter.New()

    router.GET("/admin",            overview.IndexByAdmin)
    router.GET("/admin/categories", category.ListByAdmin)
    router.GET("/admin/products",   product.ListByAdmin)

    http.ListenAndServe(":8080", router)
}



