var homeScore = document.getElementById('hScore');
var awayScore = document.getElementById('aScore');
var t;

function scoreDown(target){
    switch(target) {
        case 'home':
            t = homeScore;
            break;
        case 'away':
            t = awayScore;
            break;
    }
    let oldScore = parseInt(t.value);
    let newScore = oldScore-1;
    if (newScore<0){newScore=0};
    t.value = newScore;
}

function scoreUp(target){
    switch(target) {
        case 'home':
            t = homeScore;
            break;
        case 'away':
            t = awayScore;
            break;
    }
    let oldScore = parseInt(t.value);
    let newScore = oldScore+1;
    t.value = newScore;
}