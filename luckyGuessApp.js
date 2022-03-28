
const isItMatch = () => {
    const userNum = Number(document.getElementById('inputNum').value);
    const appNum = 20; 
    // Math.floor(Math.random()*20);
    console.log(typeof(userNum));

    if(userNum === appNum) {
        document.getElementById('result').innerHTML = 'WINNER!!!';
    }
    else 
        document.getElementById('result').innerHTML = 'Try Again!';
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click',isItMatch);



