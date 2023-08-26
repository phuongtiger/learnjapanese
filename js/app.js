// Dữ liệu câu hỏi và đáp án
var questions = [
    {
        question: "やまださんはいしゃです。タワポンさん（　）いしゃです。",
        answers: [
            { option: "A. も", correct: true, color: null },
            { option: "B. と", correct: false, color: null },
            { option: "C. は", correct: false, color: null },
            { option: "D. の", correct: false, color: null }
        ]
    },
    {
        question: "たろうくんは（　）さいですか",
        answers: [
            { option: "A. いつ", correct: false, color: null },
            { option: "B. なん", correct: true, color: null },
            { option: "C. どちら", correct: false, color: null },
            { option: "D. いち", correct: false, color: null }
        ]
    },
    {
        question: "A: おくに（　）どうちらですか。B: イタリアです。",
        answers: [
            { option: "A. と", correct: false, color: null },
            { option: "B. の", correct: false, color: null },
            { option: "C. も", correct: false, color: null },
            { option: "D. は", correct: true, color: null }
        ]
    },
    {
        question: "わたしはFPT だいがく（　）がくせいです。",
        answers: [
            { option: "A. の", correct: true, color: null },
            { option: "B. は", correct: false, color: null },
            { option: "C. と", correct: false, color: null },
            { option: "D. も", correct: false, color: null }
        ]
    },
    {
        question: "サントスさんさん(　)ABCかいしゃ(　)しゃいんです。",
        answers: [
            { option: "A. と / の", correct: false, color: null },
            { option: "B. の / は", correct: false, color: null },
            { option: "C. は / の", correct: true, color: null },
            { option: "D. も / は", correct: false, color: null }
        ]
    },

];

var currentQuestion = 0;
var score = 0;
var userAnswers = []; // Mảng để lưu trữ đáp án được chọn

var questionContainer = document.getElementById("question");
var answerContainer = document.getElementById("answers");
var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var submitButton = document.getElementById("submit");
var reloadButton = document.getElementById("reload");
var resultContainer = document.getElementById("result");

// Hiển thị câu hỏi và đáp án
function displayQuestion() {
    questionContainer.innerHTML = (currentQuestion + 1) + ") " + questions[currentQuestion].question;

    var answers = questions[currentQuestion].answers;
    var answerHTML = "";

    for (var i = 0; i < answers.length; i++) {
        answerHTML +=
            '<label><input type="radio" name="answer" value="' +
            answers[i].option +
            '"> ' +
            answers[i].option +
            "</label><br>";
    }
    answerContainer.innerHTML = answerHTML;
    if (questions[currentQuestion].color == 'green') {
        answerContainer.style.color = 'green';
    } else if (questions[currentQuestion].color == 'red') {
        answerContainer.style.color = 'red';
    }else{
        answerContainer.style.color = 'black';
    }


    // Đặt lại đáp án trước đó nếu có
    var previousAnswer = userAnswers[currentQuestion];
    if (previousAnswer) {
        var radioButtons = document.querySelectorAll('input[name="answer"]');
        for (var j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].value === previousAnswer) {
                radioButtons[j].checked = true;
                break;
            }
        }
    }
}

// Lưu đáp án được chọn
function saveAnswer() {
    var selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (selectedAnswer) {
        var selectedOption = selectedAnswer.value;
        userAnswers[currentQuestion] = selectedOption;
    }
}

// Kiểm tra đáp án và tính điểm cho toàn bộ bài trắc nghiệm
function checkAnswer() {
    score = 0; // Đặt lại điểm thành 0 trước khi tính toán
    for (var i = 0; i < questions.length; i++) {
        var selectedOption = userAnswers[i];
        var currentAnswer = questions[i].answers.find(function (answer) {
            return answer.option === selectedOption;
        });

        if (currentAnswer && currentAnswer.correct) {
            score++;
            questions[i].color = 'green';
        } else {
            questions[i].color = 'red';
        }
    }
    submitButton.disabled = true;
}

// Xử lý sự kiện khi nhấn nút Previous
previousButton.addEventListener("click", function () {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;

        displayQuestion();
    }
});

// Xử lý sự kiện khi nhấn nút Next
nextButton.addEventListener("click", function () {
    saveAnswer();

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
});
submitButton.addEventListener("click", function () {
    saveAnswer();
    checkAnswer();
    displayQuestion();
    resultContainer.innerHTML = "Bạn làm đúng được: " + score + "/" + questions.length;
});
reloadButton.addEventListener("click", function () {
    score = 0;
    currentQuestion = 0;
    resultContainer.innerHTML = "";
    for (var i = 0; i < userAnswers.length; i++) {
        userAnswers[i] = "";
    }
    for (var i = 0; i < questions.length; i++) {
        questions[i].color = null;
    }
    displayQuestion();
    submitButton.disabled = false;
});
// Bắt đầu trò chơi
displayQuestion();