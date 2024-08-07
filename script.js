const questions = [
    {
    question: "¿Qué es un programa?",
    options: ["Un conjunto de dispositivos de hardware.", "Un sistema operativo.", "Una serie de instrucciones lógicas interpretadas por la computadora.", "Un lenguaje de programación."],
    answer: 2,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r1.jpg"
},
{
    question: "¿Qué es un lenguaje de programación?",
    options: ["Un sistema operativo.", "Un conjunto de reglas y sintaxis para escribir programas.", "Un dispositivo de entrada.", "Un tipo de memoria de computadora."],
    answer: 1,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r2.jpg"
},
{
    question: "¿Cuál de los siguientes lenguajes se utiliza para la programación web?",
    options: ["Python", "JavaScript", "C++", "Visual Studio"],
    answer: 1,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r3.jpg"
},
{
    question: "¿Cuál de las siguientes herramientas se utiliza para desarrollar aplicaciones en iOS?",
    options: ["Android Studio", "Xcode", "Visual Studio", "Eclipse"],
    answer: 1,
    questionImage: "imagen/p4.jpg",
    answerImage: "imagen/r4.jpg"
},
{
    question: "¿Qué lenguajes se usan en la plataforma Android?",
    options: ["Objective-C y Swift", "Java y Kotlin", "C# y XAML", "PHP y MySQL"],
    answer: 1,
    questionImage: "imagen/p5.jpg",
    answerImage: "imagen/r4.jpg"
},
{
    question: "¿Cuál de los siguientes lenguajes se considera de propósito general?",
    options: ["JavaScript", "CSS", "Java", "XAML"],
    answer: 2,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r4.jpg"
},
{
    question: "¿Qué elementos componen un sistema computacional?",
    options: ["Solo hardware y software", "Solo software y usuario", "Hardware, software y usuario", "Solo hardware y usuario"],
    answer: 2,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r4.jpg"
},
{
    question: "¿Qué tipo de memoria se usa para almacenar datos de manera temporal mientras la computadora está encendida?",
    options: ["ROM", "Memoria secundaria", "RAM", "CPU"],
    answer: 2,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r8.jpg"
},
{
    question: "¿Cuál de los siguientes no es un dispositivo de entrada?",
    options: ["Teclado", "Monitor", "Ratón", "Escáner"],
    answer: 1,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r4.jpg"
},
{
    question: "¿Qué componente de hardware es responsable de realizar las operaciones aritméticas y lógicas en una computadora?",
    options: ["Memoria principal", "CPU", "Dispositivos de salida", "Memoria secundaria"],
    answer: 1,
    questionImage: "imagen/p1.jpg",
    answerImage: "imagen/r10.jpg"
}

];

let currentQuestionIndex = 0;
let scores = [];
let selectedAnswers = [];
let currentGroup = 0;
let groupNames = [];

function addGroups() {
    const numberOfGroups = document.getElementById('group-count').value;
    const groupNamesDiv = document.getElementById('group-names');
    groupNamesDiv.innerHTML = '';
    groupNames = [];
    for (let i = 0; i < numberOfGroups; i++) {
        const defaultName = `Grupo ${i + 1}`;
        groupNames.push(defaultName);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = defaultName;
        input.onchange = function() {
            groupNames[i] = input.value;
        };
        groupNamesDiv.appendChild(input);
        groupNamesDiv.appendChild(document.createElement('br'));
    }
}

function initializeGroups() {
    scores = groupNames.map(() => 0);
    const groupSelect = document.getElementById('group-select');
    groupSelect.innerHTML = '';
    groupNames.forEach((name, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = name;
        groupSelect.add(option);
    });
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function playStartSound() {
    const sound = document.getElementById('start-sound');
    sound.play();
}

function playConfirmSound() {
    const sound = document.getElementById('confirm-sound');
    sound.play();
}

function loadQuestion() {
    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionObj.question;

    const questionImage = document.getElementById('question-image');
    if (questionObj.questionImage) {
        questionImage.src = questionObj.questionImage;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }

    const answerImage = document.getElementById('answer-image');
    answerImage.style.display = 'none'; // Ocultar la imagen de la respuesta al cargar una nueva pregunta

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.innerText = questionObj.options[index];
        option.style.backgroundColor = '#007bff';
    });
    document.getElementById('result').innerText = '';
    document.getElementById('confirm-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'none';
    selectedAnswers = new Array(scores.length).fill(null);
}

function selectAnswer(selectedIndex) {
    currentGroup = document.getElementById('group-select').value;
    selectedAnswers[currentGroup] = selectedIndex;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === selectedIndex) {
            option.style.backgroundColor = '#0056b3';
        } else {
            option.style.backgroundColor = '#007bff';
        }
    });
}

function confirmAnswer() {
    playConfirmSound(); // Reproducir el sonido al confirmar la respuesta

    const questionObj = questions[currentQuestionIndex];
    selectedAnswers.forEach((answer, groupIndex) => {
        if (answer !== null) {
            const options = document.querySelectorAll('.option');
            if (answer === questionObj.answer) {
                options[answer].style.backgroundColor = '#28a745';
                scores[groupIndex]++;
            } else {
                options[answer].style.backgroundColor = '#dc3545';
            }
        }
    });
    document.getElementById('result').innerText = `La respuesta correcta es ${questionObj.options[questionObj.answer]}`;

    const answerImage = document.getElementById('answer-image');
    if (questionObj.answerImage) {
        answerImage.src = questionObj.answerImage;
        answerImage.style.display = 'block';
    } else {
        answerImage.style.display = 'none';
    }

    document.getElementById('confirm-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayScores();
    }
}

function displayScores() {
    let resultHTML = '<h1>Resultados</h1><ul>';
    scores.forEach((score, index) => {
        resultHTML += `<li>${groupNames[index]}: ${score} puntos</li>`;
    });
    resultHTML += '</ul>';

    const maxScore = Math.max(...scores);
    const winningGroups = scores.reduce((acc, score, index) => {
        if (score === maxScore) {
            acc.push(groupNames[index]);
        }
        return acc;
    }, []);

    let winnerText = '¡Empate!';
    if (winningGroups.length === 1) {
        winnerText = `¡El grupo ganador es ${winningGroups[0]}!`;
    } else if (winningGroups.length > 1) {
        winnerText = `¡Los grupos ganadores son ${winningGroups.join(', ')}!`;
    }

    resultHTML += `<p>${winnerText}</p>`;
    document.getElementById('results').innerHTML = resultHTML;

    const winnerImage = document.getElementById('winner-image');
    winnerImage.style.display = 'block';

    playStartSound(); // Reproducir el sonido inicial al mostrar los resultados

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
}

window.onload = () => {
    document.getElementById('start-container').style.display = 'block';
    playStartSound();
};

