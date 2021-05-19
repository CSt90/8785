function countdown(){
    bd = new Date('2021-07-08 00:00:00');
    bdDay = bd.getDate();
    bdHours = bd.getHours();
    bdMinutes = bd.getMinutes();
    bdSeconds = bd.getSeconds();

    now = new Date();

    timeToBd = bd-now;

    second = 1000;
    minute = 60 * second;
    hour = 60 * minute;
    day = 24 * hour;

    countTime = {
        "day": Math.floor(timeToBd / day),
        "hour": Math.floor((timeToBd % day) / hour),
        "minute": Math.floor((timeToBd % hour) / minute),
        "second": Math.floor((timeToBd % minute) / second)
    }
    
    if (countTime.day <= 0 && countTime.hour <= 0 && countTime.minute <= 0 && countTime.second < 0){
        console.log('zero');
    }
    else{
        $(".days-counter").text(countTime.day);
        $(".hours-counter").text(countTime.hour);
        $(".minutes-counter").text(countTime.minute);
        $(".seconds-counter").text(countTime.second);
    }

}


$('document').ready(function(){
    setInterval(countdown, 1000);
});