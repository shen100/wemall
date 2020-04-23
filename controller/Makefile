.PHONY: dep

### 这里的依赖关系是有先后顺序的 (如果修改到controller目录下面的依赖， 需要维护安装依赖的顺序)
SUB_DIRS = common admin cart category order product ueditor user visit

dep:
	make deps
deps: $(patsubst %, deps/%, $(SUB_DIRS))
deps/%:
	@echo ">>>>>>>>>>>>>>>>  正在安装 controller/$(@F) 相关的依赖  >>>>>>>>>>>>>>>>"
	cd $(@F) && make dep
	@echo "<<<<<<<<<<<<<<<<  controller/$(@F)相关的依赖, 安装完成  <<<<<<<<<<<<<<<<"
	@echo ""
	@echo ""
	@echo ""
