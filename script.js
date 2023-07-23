const form=document.getElementById('form');
const displaySection=document.getElementById("display-section");
const startButton=document.getElementById('start-btn').addEventListener("click",(event)=>{
     event.preventDefault();
     let hours=document.getElementById("hours").value;
     let minutes=document.getElementById("minutes").value;
     let seconds=document.getElementById("seconds").value;
     
     //validating input values
     if(hours.length == 0) alert("Enter Hours value ");
     else if(minutes.length == 0) alert("Enter Minutes value ");
     else if(seconds.length == 0) alert("Enter Seconds value ");
     else{
        let hour=parseInt(hours);
        let minute=parseInt(minutes);
        let second=parseInt(seconds);
        if(hour>23) hour=12;
        if(minute > 60)  minute=59;
        if(second > 60) second=59;
        addTimer(hour,minute,second);
     }
});

//adding timer to current timers
 function addTimer(hour,minute,second){
    let timerDisplaySection=document.getElementById("timer-display-section");
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    let div= document.createElement("div");
    div.className="active-timer-section";
     div.innerHTML = `
     <label>Time left: </label>
     <div id="timer">    
     <div id="timer-section">
       <span id="hr">${hour}</span>
       <label for="hours">:</label>
     </div>
     <div id="timer-section">
       <span id="min">${minute}</span>
       <label for="hours">:</label>
     </div>
     <div id="timer-section">
       <span id="sec">${second}</span>
     </div>
   </div>
   <button id="delete-btn" onclick="deleteFn(event)" >Delete</button>`;
    
    displaySection.append(timerDisplaySection.appendChild(div));
    startTimers();
 }

 function startTimers() {
  const timers = document.querySelectorAll('.active-timer-section');
  timers.forEach((timer) => {
    const hourElement = timer.querySelector('#hr');
    const minuteElement = timer.querySelector('#min');
    const secondElement = timer.querySelector('#sec');
  
    let hour = parseInt(hourElement.textContent);
    let minute = parseInt(minuteElement.textContent);
    let second = parseInt(secondElement.textContent);

    let intervalId = setInterval(function () {
      if (hour === 0 && minute === 0 && second === 0) {
        clearInterval(intervalId);
        // Perform any additional actions when the timer reaches 00:00:00.
        // For example, you can display a message or execute a function.
        timer.innerHTML="";
        timer.className="end-timer-section";
        timer.innerHTML=`
        <h2>Timer Is Up !</h2>
        <audio controls autoplay style="display: none;">
           <source src="https://mp3ringtonesdownload.net/wp-content/uploads/2023/07/Clock-Alarm-Classic.mp3" type="audio/mpeg">
        </audio> 
        <button id="stop-btn" onclick="stopAudio(event)">Stop</button>
        `;
      
      } else {
        if (second > 0) {
          second--;
        } else {
          if (minute > 0) {
            minute--;
            second = 59;
          } else {
            if (hour > 0) {
              hour--;
              minute = 59;
              second = 59;
            }
          }
        }
        hourElement.textContent = hour < 10 ? "0" + hour : hour;
        minuteElement.textContent = minute < 10 ? "0" + minute : minute;
        secondElement.textContent = second < 10 ? "0" + second : second;
      }
    }, 1000);
  });
}

//stop audio
function stopAudio(event){
     const stopbutton=event.target;
     const audioElement=stopbutton.parentNode.querySelector('audio');;
     console.log(audioElement);
     audioElement.pause();
     stopbutton.parentNode.remove();
}

//deleting element
function deleteFn(event){
  const clickedButton = event.target;
   clickedButton.parentNode.remove();
}
