.PHONY: run dep

### 这里的依赖关系是有先后顺序的 (如果修改到wemall目录下面的依赖， 需要维护安装依赖的顺序)
SUB_DIRS = utils config model controller route

dep:
	make deps
	@go get -v && go mod tidy
deps: $(patsubst %, deps/%, $(SUB_DIRS))
deps/%:
	@echo ">>>>>>>>>>>>>>>>  正在安装 $(@F) 相关的依赖  >>>>>>>>>>>>>>>>"
	@cd $(@F) && make dep
	@echo "<<<<<<<<<<<<<<<<  $(@F)相关的依赖, 安装完成  <<<<<<<<<<<<<<<<"
	@echo ""
	@echo ""
	@echo ""

run:
	go run main.go
