;(function () {
	const todos = [
		{
			di:1,
			title:'吃',
			done:true
		},
		{
			di:2,
			title:'喝',
			done:false
		},
		{
			di:3,
			title:'玩',
			done:true
		},
		{
			di:4,
			title:'乐',
			done:false
		}
	]

	new Vue ({
		el: '#todoapp',
		data: {
			todos,//任务列表数据源
			inputText:'',//用来绑定获取添加任务文本框的数据
			currentEdit:null,//用来 判定任务项是否获得 editing 样式的一个标记变量
			backTitle:''//仅仅用于备份我们的编辑之前的任务项的 title， 编辑之前先备份， 取消编辑回退
		},
		methods: {
			// 添加任务
			addTodo(e) {
				// 解构赋值
				//单独拿到文本框及任务列表数据
				const {inputText,todos} = this
				//非空校验
				if (inputText.trim().length === 0) {
					return
				}

				// 获取唯一的id
				const lastItem = todos[todos.length - 1]
				const id = lastItem ? lastItem.id + 1 :1

				// 添加到数组中
				todos.push({
					id,
					title:inputText,
					done:false
				})

				// 清空文本框
				this.inputText = ''
			},
			// 删除单个任务项
			removeTodo (index) {
				this.todos.splice(index, 1)
			},

			// 获得编辑样式
		getEditing (item) {
			// 将 currentEdit赋值为当前双击的任务项
			this.currentEdit = item

			// 为了处理取消编辑，所以这里在获得编辑状态的时候先备份我们的被编辑的任务的 title  
			// 用以取消编辑的时候，让任务项的 title 回到原来的状态
			this.backTitle = item.title
		},

		// 回车或者失去焦点保存编辑
		saveEdit (item, index) {
			// 判断被编辑的任务项的文本是否为空
			if (item.title.trim().length === 0) {
				// 如果为空  直接删除
				this.todos.splice(index, 1)
			} else {
				// 如果不为空，则保存编辑，去除编辑样式
				this.currentEdit = null
			}
		},

		// Esc取消编辑
		cancelEdit () {
			// 在取消编辑的时候，让任务项的 title  回到原始的状态
			this.currentEdit.title = this.backTitle

			// 取消编辑，去除编辑样式
			this.currentEdit = null
		}
		}
	})
})();
