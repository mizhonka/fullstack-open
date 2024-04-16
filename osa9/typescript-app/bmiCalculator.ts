const BMICalculator=(weight: number, height: number):string=>{

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
    };

    return bmiCalculator(height, weight);
};

export default BMICalculator;
