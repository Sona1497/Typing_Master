const paragraph = {
  easy: "Proper mental health is essential in every stage of life from childhood and teenager to adulthood. Throughout a lifetime, an individual can experience mental health issues at any point.",
  medium:
    "Finance is the soul and blood of any business and no firm can survive without finance. It concerns itself with the management of monetary affairs of the firm and how money can be raised on the best terms available.",
  hard: "A cryptocurrency is a virtual or digital currency that is highly secured by cryptography or encryption techniques which makes it nearly impossible to counterfeit such cryptocurrency.",
};

let wordCounter = [];
let appRoot = "";
let timerFlag = false;
let warningMsg = "";
const userInputValues = {
  selectedTime: "",
  selectedLevel: "",
};

let para = "";
let paraArr = [];
window.onload = function () {
  appRoot = document.getElementById("root");
  appRoot.innerHTML = `<section id="firstView" class="inputContainerStyle">
  <div>
<h1><i>Check your typing skills in a minute</i></h1></br></br></br>
  <label for="Time"><h2>Select Time : <h2></label>
  <select onChange="onValueSelect('time',value)" id="timeSelecter" name="TimeOptions">
  <option value=null><b>select</b></option>
    <option value="thirtySeconds">30 seconds</option>
    <option value="oneMinute">One minute</option>
    <option value="twoMinuntes">Two Minute</option>
    <option value="threeMinutes">Three Minute</option>
  </select>
  </div>
  <div>
  <label for="Level"><h2>Difficulty Level : </h2></label>
  <select onChange="onValueSelect('level',value)" id="levelSelecter" name="levelOptions">
  <option value=null>select</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
  </div>
<p id="warningMsgId"></p>
<div>
<button id="btnstyle"  onclick="startTest()"> Start Test </button>
</div>
</section>`;


  warningMsg = document.getElementById("warningMsgId");

};
const startTest = () => {
  const { selectedTime, selectedLevel } = userInputValues;
  if (!selectedTime || !selectedLevel) {
    warningMsg.innerText = " Time and Difficulty level cannot be empty!!";
    warningMsg.style.color = "red";
    return "";
  }
  appRoot.innerHTML = `<section id="secondView" class="typerContainerStyle">
  <div class="timerStyle">
    Time Left : <span class="counterStyle" id="timeLeftId"></span>
  </div>
  <p id="paraId" class="paraStyle"></p>
  <textarea
    value=""
    oninput="onType(value)"
    class="textContainerStyle"
    on
  ></textarea>
</section>`;
  para = selectedLevel ? paragraph[selectedLevel] : "";
  paraArr = para.split(" ");
  const paraEle = document.getElementById("paraId");
  //looping through paraArr
  paraArr.map((word, index) => {
    if (index <= paraArr.length - 1) {
      updateWord(paraEle, word, "W - " + index);
    }
  });
};

const onValueSelect = (type, value) => {
  console.log("type ", type, value);

  //Form Validation
  !value ? null : (warningMsg.innerText = "");

  type === "time"
    ? (userInputValues.selectedTime = value)
    : (userInputValues.selectedLevel = value);
};

const onType = (value) => {
  if (!timerFlag) {
    timer();
  }
  const length = value.split("").length;
  const seperateValues = value.split(" ");
  const lastWordFromValue = seperateValues[wordCounter.length];

  if (value && length - 1 === value.lastIndexOf(" ") && lastWordFromValue) {
    setColorOfWord(lastWordFromValue, wordCounter.length);
    wordCounter.push(lastWordFromValue.trimEnd());
  }
};

const setColorOfWord = (word, index) => {
  //word = "Proper" index=0
  paraArr.map((value, i) => {
    // value = Proper, i = 0
    if (i <= paraArr.length - 1 && i === index) {
      document.getElementById("W - " + i).style.color =
        word.trimEnd() === value ? "blue" : "red";
      // value color added blue
      word.trimEnd() !== value
        ? (document.getElementById("W - " + i).style.fontWeight = "bold")
        : "";
    }
  });
};

const updateWord = (ele, word, id) => {
  //This will create a new element label
  const node = document.createElement("label");

  //Adding Id to created element
  node.setAttribute("id", id); //W - 0
  //Adding word to label
  node.textContent = word + " ";
  //<label id = "W - 0">Proper</label>

  // This step will add label to paragraph
  ele.appendChild(node);
  // <p>
  // <label id = "W - 0">Proper</label>
  // </p>
};

function timer() {
  const { selectedTime } = userInputValues;
  if (!timerFlag) {
    timerFlag = true;
  }

  var sec = getTimeByLabel(selectedTime);

  var timer = setInterval(() => {
    const timeEle = document.getElementById("timeLeftId");
    timeEle.innerHTML = convertTime(sec);
    sec === 10 ? (timeEle.style.color = "red") : "";
    sec--;
    if (sec < 0) {
      document.getElementById("timeLeftId").innerHTML = "--:--";
      clearInterval(timer);
      const [wpm, accuracy] = calculateResults();
      appRoot.innerHTML = `<section id="thirdView" class="resultContainerStyle">
      <h1>Your Test Score</h1></br></br></br></br></br>
      <div class="style">
      <span id="wpmId"></span>
      <span id="accuracyId"></span> 
      </div>
    </section>`;
      document.getElementById("wpmId").innerHTML = `
      <div class="speedStyle">Typing Speed:</br>  ${wpm}WPM</div>`;
      document.getElementById("accuracyId").innerHTML = `<div class="speedStyle">Accuracy: ${accuracy}%</div>
      `;
    }
  }, 1000);
}

function convertTime(totalSeconds) {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds - minutes * 60;
  const showMin = isDigit(minutes) ? "0" + minutes : minutes;
  const showSec = isDigit(seconds) ? "0" + seconds : seconds;
  return showMin + ":" + showSec;
}

function isDigit(val) {
  return String(+val).charAt(0) == val;
}

const calculateResults = () => {
  const diffArr = [];
  const inMin = getTimeByLabel(userInputValues.selectedTime) / 60;
  const wpm = wordCounter.length / inMin;
  wordCounter.map((word, index) => {
    word === paraArr[index] ? "" : diffArr.push(word);
  });
  const sub = wordCounter.length - diffArr.length;
  let accuracy = (sub / wordCounter.length) * 100;
  accuracy = accuracy.toFixed(2);
  console.log("wpm ", wpm, " accuracy ", accuracy);
  return [wpm, accuracy];
};

const getTimeByLabel = (selectedTime) => {
  switch (selectedTime) {
    case "oneMinute":
      return 60;
      break;
    case "twoMinuntes":
      return 120;
      break;
    case "threeMinutes":
      return 180;
      break;
    case "thirtySeconds":
      return 30;
      break;
    default:
      return 00;
      break;
  }
};
