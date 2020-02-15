const Project = (name, pomodoros, description) =>{
    name,
    pomodoros,
    description

    const getName = () =>{
        return name;
    }

    const getPomodoros = () =>{
        return pomodoros;
    }

    const getDescription = () =>{
        return description;
    }

    return {
        getName,
        getPomodoros,
        getDescription
    }
}

export {Project}