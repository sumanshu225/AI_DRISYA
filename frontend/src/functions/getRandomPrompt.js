import surpriseMePrompts from '../constant/prompt'


const getPrompt = (prompt)=>{

    let index = Math.floor(Math.random()*surpriseMePrompts.length)
    let newPrompt = surpriseMePrompts[index]
    while(prompt === newPrompt){
        index = Math.floor(Math.random()*surpriseMePrompts.length)
        newPrompt = surpriseMePrompts[index]
    }

    return newPrompt
}

export default getPrompt
