import express from 'express';
import BMICalculator from './bmiCalculator';
const app = express();

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(isNaN(weight) || isNaN(height)){
        res.json({error: 'malformatted parameters'})
        return;
    }
    const bmi = BMICalculator(weight, height);
    res.json(
        {
            weight: weight,
            height: height,
            bmi: bmi
        }
    )
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
