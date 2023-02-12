//data is imported from the dataset.json:

import data from "../dataset.json";

//All the Tags and section are selected as per bellow:

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

const ResultData = JSON.parse(localStorage?.getItem("result"));

//Variable is declared for storing the current topic's quiz data

let currentTopic;

// class of Topic is declared

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
    // this.selectedAnswers = [];
    this.topicsDone =
      JSON.parse(localStorage.getItem("result"))?.topicsDone || [];
  }

  //ShowQuestion method displays the question on screen after selecting a topic

  showQuestion = () => {
    let CurrentQuestion = this.questionSet[this.currentQuestion];

    CurrentTopicTag.innerText = this.topic;

    Question.innerText = CurrentQuestion.question;

    //Following code will check the status of question, whether its an attempted or not

    if (this.isAttempted.includes(this.currentQuestion)) {
      Question.innerHTML += ` <i class="fa-solid fa-clipboard-check attempted"><span>Attempted</span></i>`;
    } else {
      Question.innerHTML += ` <i class="fa-solid fa-clipboard-question missed"><span>Not Attempted</span></i>`;
    }

    //Following code will push selected topic in topicsDone property of class

    if (!this.topicsDone.includes(this.topic)) {
      this.topicsDone.push(this.topic);
    }

    //Following code displays options on screen.
    Options.forEach((item, index) => {
      item.innerText = CurrentQuestion.options[index];
    });

    //Following code displays current question number
    QuestionNumber.innerText = `${this.currentQuestion + 1}/${
      this.questionSet.length
    }`;

    //Following code displays progress bar
    ProgressBar.style.width = `${(this.currentQuestion + 1) * 10}%`;
  };

  //NextQuestion method handles the display of next question and check whether question is attempted or not

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

  //PreviousQuestion method handles the display of previous question
  PreviousQuestion = () => {
    this.currentQuestion > 0
      ? (this.currentQuestion -= 1)
      : this.currentQuestion === this.currentQuestion.length - 1;

    currentTopic.showQuestion();
  };

  //The CheckAnswer method handles checking questions, a mechanism for saving the results to local storage, displaying the results on the screen, and verifying that all questions have been attempted.

  checkAnswer = (selectedAnswer) => {
    let CurrentQuestion = this.questionSet[this.currentQuestion];

    let CurrentAnswer = CurrentQuestion.answer;

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

      // this.selectedAnswers.push({
      //   id: this.currentQuestion,
      //   answer: selectedAnswer,
      // });
    } else if (
      CurrentAnswer !== selectedAnswer &&
      !this.isAttempted.includes(this.currentQuestion)
    ) {
      this.incorrectAnswer += 1;
      this.isAttempted.push(this.currentQuestion);

      // this.selectedAnswers.push({
      //   id: this.currentQuestion,
      //   answer: selectedAnswer,
      // });
    }

    if (this.isAttempted.length === this.questionSet.length) {
      // localStorage.clear();

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

      localStorage.setItem("quizCompleted", "true");
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

// Following code creates all the topics provide by dataset

for (let topic in data) {
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

//The code below handles the mechanism of displaying the question on the screen after selecting a topic from the list

const topics = document.querySelectorAll(".topic");

topics.forEach((topic, index) => {
  topic.addEventListener("click", (e) => {
    localStorage.setItem("quizStart", "true");

    let selectedTopic = e.target.innerText.toLowerCase();
    localStorage.setItem("currentTopic", selectedTopic);

    CurrentTopicTag.innerText = selectedTopic;
    currentTopic = new QuizTopic(selectedTopic, data[`${selectedTopic}`]);

    HomePage.style.display = "none";
    QuestionPage.style.display = "flex";

    currentTopic.showQuestion();
  });
});

//Following code handles the mechanism after pressing Next and previous buttons

NextBtn.addEventListener("click", (e) => {
  currentTopic.NextQuestion();
});

PreviousBtn.addEventListener("click", (e) => {
  currentTopic.PreviousQuestion();
});

//Following code handles the mechanism to check answers after selecting one of the option from given option list

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
  });
});

//Following code handles mechanism to return the User to home screen.

ReturnHome?.addEventListener("click", () => {
  localStorage.removeItem("quizCompleted");
  localStorage.removeItem("quizStart");
  ResultPage.style.display = "none";
  QuestionPage.style.display = "none";
  HomePage.style.display = "flex";

  window.location.reload();
});

// Following code handles mechanism to show the quiz data even after refreshing current quiz session

window.addEventListener("load", () => {
  QuestionPage.style.display = "flex";
  HomePage.style.display = "none";

  let topic = localStorage.getItem("currentTopic");

  let CurrentTopic = topics[topics.length - 1];

  let quizOn = localStorage.getItem("quizStart");

  if (quizOn === "true") {
    currentTopic = new QuizTopic(topic, data[topic]);

    currentTopic.showQuestion();
  } else {
    QuestionPage.style.display = "none";
    HomePage.style.display = "flex";
  }

  if (localStorage.getItem("quizCompleted") === "true") {
    Score.innerText = `Score: ${ResultData.score} /${currentTopic?.questionSet.length}`;

    TotalCorrect.innerText = `Correct Answers: ${ResultData.correctAnswers}`;

    TotalInCorrect.innerText = `Incorrect Answers: ${ResultData.incorrect}`;

    ResultPage.style.display = "flex";
  }
});

// Following code handles the mechanism to activate quiz topics after attempting all given topics.

let topicSaved = JSON.parse(localStorage?.getItem("result")).topicsDone;

let ResetBtn = document.querySelector(".topics h3 span");

let ResetMessage = document.querySelector(".topics h3");

if (topicSaved.length === Object.keys(data).length) {
  ResetMessage.style.display = "flex";
}

ResetBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
