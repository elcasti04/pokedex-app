var summation = function (num) {
  // Code here
  let suma = num
  for (let i = 1; i < num; i++) {
    suma += i
  }
  return suma
}
console.log(summation(10))

function positiveSum(arr) {

    return arr.filter(num => num >= 0).reduce((acum, num) => acum + num, 0)
}
console.log(positiveSum([1,-4,7,12,6,-3]))

var min = function(list){
  
    let minimo = list[0]
    for (let i = 0; i < list.length; i++) {
        if(list[i] < minimo){
            minimo = list[i]
        }
        
    }
    return minimo
}



var max = function(list){
      let mayor = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > mayor) {
      mayor = list[i];
    }
  }
  return mayor;
    
}
console.log(max([9, -3, 2, 1, 4, 65]))

function stringToArray(string){

	// code code code
  return string.split(" ")

}
console.log(stringToArray("no no quiero ser esa mujer"))
function hero(bullets, dragons){
//Get Coding!
  if (bullets >= dragons * 2) {
    return "el caballero salio vencedor"
  }else{
    return "el caballero no logro superar la prueba"
  }
}
console.log(hero(10, 5))

function squareSum(numbers){
  
 
  for (let i = 1; i < numbers.length; i++){
    return numbers .map(num => num * num).reduce((acum, num) => acum + num, 0)
  }

}

console.log(squareSum([1,2,2]))
