var x = 2
x = "Hello, world"

embedded_type = {"KEY": "VALUE"}
x = {"data": "Hi", "data2":1, "key": embedded_type }
console.log(x)

json_x = JSON.stringify(x)
console.log(json_x)

console.log(JSON.parse(json_x))
