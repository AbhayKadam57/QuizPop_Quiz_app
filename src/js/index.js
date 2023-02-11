import data from "../dataset.json";

const HomePage = document.querySelector("section:nth-of-type(1)");

const QuestionPage = document.querySelector("section:nth-of-type(2)");

const ResultPage = document.querySelector("section:nth-of-type(3)");

const Question = document.querySelector(".questionBox h2");

const Options = document.querySelectorAll(".options li a");

const OptionsList = document.querySelectorAll(".options li");

const PreviousBtn = document.querySelector("#previous");

const NextBtn = document.querySelector("#next");

const CurrentTopicTag = document.querySelector(".selectedTopic small");

const QuestionNumber = document.querySelector(".progressbar p");

const ProgressBar = document.querySelector(".progressbar .bar");

const Score = document.querySelector(".score h2");

const TotalCorrect = document.querySelector(".correct p");

const TotalInCorrect = document.querySelector(".incorrect p");

const TopicsDone = JSON.parse(localStorage.getItem("result"))?.topicsDone || [];

const ReturnHome = document.querySelector("#returnHome");

const QuizStart = localStorage.getItem("quizStar");

console.log(ReturnHome);

console.log(TopicsDone);

// console.log(isQuizStart);

let currentTopic;

// class of Topic

class QuizTopic {
  constructor(topic, questionSet) {
    this.topic = topic;
    this.questionSet = questionSet;
    this.score = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.isAttempted = [];
    this.completed = false;
    this.currentQuestion = 0;
    this.selectedAnswers = [];
    this.topicsDone =
      JSON.parse(localStorage.getItem("result"))?.topicsDone || [];
  }

  showQuestion = () => {
    let CurrentQuestion = this.questionSet[this.currentQuestion];

    CurrentTopicTag.innerText = this.topic;

    Question.innerText = CurrentQuestion.question;

    if (this.isAttempted.includes(this.currentQuestion)) {
      Question.innerHTML += ` <i class="fa-solid fa-clipboard-check attempted"><span>Attempted</span></i>`;
    } else {
      Question.innerHTML += ` <i class="fa-solid fa-clipboard-question missed"><span>Not Attempted</span></i>`;
    }

    if (!this.topicsDone.includes(this.topic)) {
      this.topicsDone.push(this.topic);
    }

    Options.forEach((item, index) => {
      item.innerText = CurrentQuestion.options[index];
    });

    QuestionNumber.innerText = `${this.currentQuestion + 1}/${
      this.questionSet.length
    }`;

    ProgressBar.style.width = `${(this.currentQuestion + 1) * 10}%`;
  };

  NextQuestion = () => {
    document.querySelector(
      ".warning"
    ).innerHTML = `Please Attempt All the questions to get full result...`;

    document.querySelector(".warning").style.display = "none";
    OptionsList.forEach((item, i) => {
      item.classList.remove("selected");
    });

    this.currentQuestion < this.questionSet.length - 1
      ? (this.currentQuestion += 1)
      : this.currentQuestion === 0;

    currentTopic.showQuestion();
  };

  PreviousQuestion = () => {
    this.currentQuestion > 0
      ? (this.currentQuestion -= 1)
      : this.currentQuestion === this.currentQuestion.length - 1;

    currentTopic.showQuestion();
  };

  checkAnswer = (selectedAnswer) => {
    let CurrentQuestion = this.questionSet[this.currentQuestion];

    let CurrentAnswer = CurrentQuestion.answer;

    console.log(CurrentAnswer);
    console.log(selectedAnswer);

    if (this.isAttempted.includes(this.currentQuestion)) {
      document.querySelector(
        ".warning"
      ).innerHTML = `<p>Already Answered the question can not modify !</p>`;

      document.querySelector(".warning").style.display = "flex";
    } else {
      document.querySelector(".warning").style.display = "none";
    }

    if (
      CurrentAnswer === selectedAnswer &&
      !this.isAttempted.includes(this.currentQuestion)
    ) {
      this.score += 1;
      this.correctAnswer += 1;
      this.isAttempted.push(this.currentQuestion);

      this.selectedAnswers.push({
        id: this.currentQuestion,
        answer: selectedAnswer,
      });
    } else if (
      CurrentAnswer !== selectedAnswer &&
      !this.isAttempted.includes(this.currentQuestion)
    ) {
      this.incorrectAnswer += 1;
      this.isAttempted.push(this.currentQuestion);

      this.selectedAnswers.push({
        id: this.currentQuestion,
        answer: selectedAnswer,
      });
    }

    if (this.isAttempted.length === this.questionSet.length) {
      localStorage.clear();

      this.completed = true;

      localStorage.setItem(
        "result",
        JSON.stringify({
          score: this.score,
          correctAnswers: this.correctAnswer,
          incorrect: this.incorrectAnswer,
          topicsDone: this.topicsDone || [],
        })
      );
    }

    if (this.completed === true) {
      QuestionPage.style.display === "none";
      ResultPage.style.display = "flex";

      const ResultData = JSON.parse(localStorage.getItem("result"));

      Score.innerText = `Score: ${ResultData.score} /${this.questionSet.length}`;

      TotalCorrect.innerText = `Correct Answers: ${ResultData.correctAnswers}`;

      TotalInCorrect.innerText = `Incorrect Answers: ${ResultData.incorrect}`;
    }

    if (
      this.currentQuestion === this.questionSet.length - 1 &&
      !this.completed
    ) {
      document.querySelector(".warning").style.display = "block";
    }
  };
}

// Topic List creation

for (let topic in data) {
  console.log(topic);

  let li = document.createElement("li");

  if (!TopicsDone.includes(topic)) {
    li.classList.add("topic");
  } else {
    li.classList.add("topic", "deactivated");
  }

  let a = document.createElement("a");

  a.innerText = topic[0].toUpperCase() + topic.substring(1);

  li.append(a);

  document.querySelector(".topics ul").append(li);
}

// Topic selection

const topics = document.querySelectorAll(".topic");

topics.forEach((topic, index) => {
  topic.addEventListener("click", (e) => {
    localStorage.setItem("quizStart", "true");

    console.log("hello");
    let selectedTopic = e.target.innerText.toLowerCase();
    localStorage.setItem("currentTopic", selectedTopic);

    CurrentTopicTag.innerText = selectedTopic;
    currentTopic = new QuizTopic(selectedTopic, data[`${selectedTopic}`]);

    HomePage.style.display = "none";
    QuestionPage.style.display = "flex";

    currentTopic.showQuestion();
  });
});

//Question Change mechanism

NextBtn.addEventListener("click", (e) => {
  currentTopic.NextQuestion();

  console.log(currentTopic);
});

PreviousBtn.addEventListener("click", (e) => {
  currentTopic.PreviousQuestion();

  console.log(currentTopic);
});

//Check Answer

OptionsList.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    const option = item.lastElementChild.innerText;

    OptionsList.forEach((item, i) => {
      item.classList.remove("selected");
    });

    OptionsList.forEach((item, i) => {
      if (item.lastElementChild.innerText === option) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });

    currentTopic.checkAnswer(item.lastElementChild.innerText);
    console.log(item.lastElementChild.innerText);
  });
});

ReturnHome?.addEventListener("click", () => {
  ResultPage.style.display = "none";
  QuestionPage.style.display = "none";
  HomePage.style.display = "flex";

  window.location.reload();
});

// Rest Quiz data after Reload/Refresh Page

window.addEventListener("load", () => {
  QuestionPage.style.display = "flex";
  HomePage.style.display = "none";

  let topic = localStorage.getItem("currentTopic");

  let CurrentTopic = topics[topics.length - 1];

  let quizOn = localStorage.getItem("quizStart");

  console.log(CurrentTopic);

  if (quizOn === "true") {
    currentTopic = new QuizTopic(topic, data[topic]);

    console.log(currentTopic);

    currentTopic.showQuestion();
  } else {
    QuestionPage.style.display = "none";
    HomePage.style.display = "flex";
  }
});

// Reset The quiz

let topicSaved = JSON.parse(localStorage?.getItem("result")).topicsDone;

console.log(topicSaved);

let ResetBtn = document?.querySelector(".topics h3 span");

ResetBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
