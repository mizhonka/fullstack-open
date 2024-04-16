interface PersonData{
    weight: number;
    height: number;
}

const parseBmiArguments=(args: string[]):PersonData=>{
    if (args.length < 4) throw new Error('Not enough arguments!');
    if (args.length > 4) throw new Error('Too many arguments!');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            weight: Number(args[3]),
            height: Number(args[2])
        }
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
}

const bmiCalculator = (height: number, weight: number):string=>{
    const heightInM = height/100;
    const bmi = weight/(heightInM*heightInM);

    if(bmi<18.5){
        return 'Underweight';
    }
    if(18.5 <= bmi && bmi<=24.9){
        return 'Normal (healthy weight)';
    }
    if(25 <= bmi && bmi <= 29.9){
        return 'Overweight';
    }
    return 'Obese';
}

try {
    const {weight, height} = parseBmiArguments(process.argv);
    console.log(bmiCalculator(height, weight));
} catch(error:unknown){
    let errorMessage = 'Something bad happened. '
    if(error instanceof Error){
        errorMessage=errorMessage.concat(error.message)
    }
    console.log(errorMessage)
}
