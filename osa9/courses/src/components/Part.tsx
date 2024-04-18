import { CoursePart } from "../types";

const assertNever =(value: never):never=>{
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const Part=({part}: {part: CoursePart})=>{
    switch(part.kind){
        case "basic":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p><i>{part.description}</i></p>
                </div>
            )
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p><i>{part.description}</i></p>
                    <p>submit to: {part.backgroundMaterial}</p>
                </div>
            )
        case "special":
            {
                const requirements = part.requirements.map((r,i,{length})=>{
                    if(i+1===length){
                        return `${r}`
                    }
                    return `${r}, `
                })
                return(
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                        <p><i>{part.description}</i></p>
                        <p>required skills: {requirements}</p>
                    </div>
                )
            }
        default:
            return assertNever(part);
    }
}

export default Part;
