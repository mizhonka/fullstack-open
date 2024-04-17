import express from 'express';
import BMICalculator from './bmiCalculator';
import ExerciseCalculator from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(isNaN(weight) || isNaN(height)){
        res.json({error: 'malformatted parameters'});
        return;
    }
    const bmi = BMICalculator(weight, height);
    res.json(
        {
            weight: weight,
            height: height,
            bmi: bmi
        }
    );
});

app.post('/exercises', (req, res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if(!daily_exercises || !target){
        return res.status(400).json({error: 'parameters missing'});
    }
    if(isNaN(Number(target)) || !Array.isArray(daily_exercises)){
        return res.status(400).json({error: 'malformatted parameters'});
    }
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return res.status(201).json(ExerciseCalculator(daily_exercises, Number(target)));
    }
    catch(error:unknown){
        if(error instanceof Error){
            return res.status(400).json({error: String(error.message)});
        }
        return res.status(404).json({error: 'error unknown'});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
