const ExerciseCalculator=(hours: number[], target: number):TrainingResults=>{
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
        const hoursN = hours.map(h=>{
            const hn = Number(h);
            if(isNaN(hn)){
                throw new Error('malformatted parameters');
            }
            return hn;
        });
        const daysTrained=hoursN.filter(h=>h>0);
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

    return exerciseCalculator(hours, target);
};

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


export default ExerciseCalculator;

