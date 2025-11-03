document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById("start-btn")
  const nextBtn = document.getElementById("next-btn")
  const restartBtn = document.getElementById("restart-btn")
  const questionContainer = document.getElementById("question-container")
  const questionText = document.getElementById("question-text")
  const choicesList = document.getElementById("choices-list")
  const resultContainer = document.getElementById("result-container")
  const scoreDisplay = document.getElementById("score")

  const questions = [
    {
      question: "What is four men",
      choices: ["two men", "six women", "four men", "a baby"],
      answer: "four men"
    },
    {
      question: "When did the Battle of Hastings occur",
      choices: ["the past", "the future", "the present", "never"],
      answer: "the past"
    },
    {
      question: "Do you like my new hat",
      choices: ["it really complements your outfit", "Actually it's a little much", "yes, but aren't you worried about getting crumbs on it", "it is appalling"],
      answer: "actually it's a little much"
    },
    {
      question: "How's the family",
      choices: ["which family", "fine, fine", "haven't seen them in a week", "brother, you are my only living relative"],
      answer: "fine, fine"
    },
    {
      question: "Is there a window we can open, it's a little hot",
      choices: ["I'm a frayed knot", "to get to the other side", "sure, but we usually keep it closed because of the wind", "he's a cycle path"],
      answer: "sure, but we usually keep it closed because of the wind"
    }
  ]

  let currentQuestionIndex = 0
  let score = 0

  startBtn.addEventListener("click", startQuiz)

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
      showQuestion()
    } else {
      showResult()
    }
  })

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0
    score = 0
    resultContainer.classList.add("hidden")
    startQuiz()
  })

  function startQuiz() {
    startBtn.classList.add("hidden")
    resultContainer.classList.add("hidden")
    questionContainer.classList.remove("hidden")
    showQuestion()
  }

  function showQuestion() {
    nextBtn.classList.add("hidden")
    questionText.textContent = questions[currentQuestionIndex].question
    choicesList.innerHTML = "" // clear previous choices
    questions[currentQuestionIndex].choices.forEach(choice => {
      const li = document.createElement("li")
      li.textContent = choice
      li.addEventListener("click", () => selectAnswer(choice))
      choicesList.appendChild(li)
    })
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer
    if(choice === correctAnswer) {
      score ++
    }
    nextBtn.classList.remove("hidden")
  }

  function showResult() {
    questionContainer.classList.add("hidden")
    resultContainer.classList.remove("hidden")
    scoreDisplay.textContent = `${score} out of ${questions.length}`
  }
  
})
