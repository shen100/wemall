module wemall/route

go 1.13

require (
	config v0.0.0-00010101000000-000000000000
	controller/admin v0.0.0-00010101000000-000000000000
	controller/cart v0.0.0-00010101000000-000000000000
	controller/category v0.0.0-00010101000000-000000000000
	controller/common v0.0.0-00010101000000-000000000000
	controller/order v0.0.0-00010101000000-000000000000
	controller/product v0.0.0-00010101000000-000000000000
	controller/ueditor v0.0.0-00010101000000-000000000000
	controller/user v0.0.0-00010101000000-000000000000
	controller/visit v0.0.0-00010101000000-000000000000
	github.com/kataras/iris/v12 v12.1.8
)

replace (
	config => ./../config
	controller/admin => ./../controller/admin
	controller/cart => ./../controller/cart
	controller/category => ./../controller/category
	controller/common => ./../controller/common
	controller/order => ./../controller/order
	controller/product => ./../controller/product
	controller/ueditor => ./../controller/ueditor
	controller/user => ./../controller/user
	controller/visit => ./../controller/visit
	model => ./../model
	utils => ./../utils
)
