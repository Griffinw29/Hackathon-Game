const arrayRandomizer = (min, max) => {
    let randomNum = Math.random() * (max - min) + min;
    return Math.floor(randomNum);
}

export default arrayRandomizer;