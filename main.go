package main

import (
    "github.com/julienschmidt/httprouter"
    "net/http"
    "./server/controller/category"
    "./server/controller/overview"
    "./server/controller/product"
    "./server/config"
)

func main() {
    router := httprouter.New()

    router.GET("/admin",                         
        overview.IndexByAdmin)

    router.GET("/admin/categories",              
        category.ListByAdmin)

    router.GET("/admin/category/status/update/:id/:status",  
        category.OpenOrCloseStatus)

    router.GET("/admin/products",   
        product.ListByAdmin)

    http.ListenAndServe(":" + config.SERVER_PORT, router)
}



