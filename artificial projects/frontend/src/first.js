let a = [] 
const password = 87689;
console.log("size of a before : " , a.length)
console.log(a[999])
for(let i = 0 ; i < 999999 ; i++){
    a.push(i)
}

for (let i = 0 ; i < a.length ; i++){
    if(password !== a[i]){
        const res = await fetch("https://google.in/login" ,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(a[i])})

            console.log(res)
    }else{
        console.log("password at " , i)
    }
}

// console.log("size of a after : " , a.length)

// console.log(a[2000])