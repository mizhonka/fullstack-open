const calculator = (height: number, weigth: number):string=>{
    const heightInM = height/100
    const bmi = weigth/(heightInM*heightInM)

    if(bmi<18.5){
        return 'Underweight'
    }
    if(18.5 <= bmi && bmi<=24.9){
        return 'Normal (healthy weight)'
    }
    if(25 <= bmi && bmi <= 29.9){
        return 'Overweigth'
    }
    return 'Obese'
}

console.log(calculator(180, 74))
