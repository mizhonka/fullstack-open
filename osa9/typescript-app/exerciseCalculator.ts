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
    written: string
}

const getRating = (result: number, target: number):Rating=>{
    if(result>=target){
        return {
            numeric: 3,
            written: 'well done!'
        }
    }
    if(result>=target/2){
        return {
            numeric: 2,
            written: 'not too bad but could be better'
        }
    }
    return {
        numeric: 1,
        written: 'not great'
    }
}

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
    }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
