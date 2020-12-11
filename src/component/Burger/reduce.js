const a = [1,2,3,4,5,6].reduce((hasil, numbers) => {

    return hasil.concat(numbers + 1)

}, []);


console.log(a);