let longfunc = () => {
				return new Promise((resolve, reject) => {
								let i = 0
								while(i < 100) {
												i++
								}
								resolve("i is 100")
				})
}

longfunc()
.then(data => {
	console.log(data)
})
.catch()

console.log("Hello world")
