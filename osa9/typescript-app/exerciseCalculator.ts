interface TrainingResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Rating {
    numeric: number;
    written: string;
}

interface ExerciseArguments {
    hours: number[];
    target: number;
}

const parseExerciseArguments=(args: string[]):ExerciseArguments=>{
    if (args.length < 4) throw new Error('Not enough arguments!');

    const numeric = args.slice(2);
    const hourArgs = numeric.slice(0, -1);
    const hours = hourArgs.map(n => {
        if(isNaN(Number(n))){
            throw new Error('Provided values were not numbers!');
        }
        return Number(n);
    });
    const target = Number(numeric.slice(-1));
    if(isNaN(target)){
        throw new Error('Provided values were not numbers!');
    }
    return {
        hours: hours,
        target: target
    };
};

const getRating = (result: number, target: number):Rating=>{
    if(result>=target){
        return {
            numeric: 3,
            written: 'well done!'
        };
    }
    if(result>=target/2){
        return {
            numeric: 2,
            written: 'not too bad but could be better'
        };
    }
    return {
        numeric: 1,
        written: 'not great'
    };
};

const exerciseCalculator = (hours: number[], target: number):TrainingResults=>{
    const daysTrained=hours.filter(h=>h>0);
    const hourSum=daysTrained.reduce((total, current)=>total+current,0);
    const average = hourSum / hours.length;
    const result=getRating(average, target);
    return {
        periodLength: hours.length,
        trainingDays: daysTrained.length,
        success: average >= target,
        rating: result.numeric,
        ratingDescription: result.written,
        target: target,
        average: average
    };
};

try {
    const {hours, target} = parseExerciseArguments(process.argv);
    console.log(exerciseCalculator(hours, target));
} catch(error:unknown){
    let errorMessage = 'Something bad happened. ';
    if(error instanceof Error){
        errorMessage=errorMessage.concat(error.message);
    }
    console.log(errorMessage);
}

