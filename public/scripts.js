document.addEventListener('DOMContentLoaded', function() {
  const quizQuestions = document.querySelectorAll('.quiz-question');

  quizQuestions.forEach(question => {
    const input = question.querySelector('.answer-input');
    const button = question.querySelector('.submit-answer');
    const feedback = question.querySelector('.feedback');

    button.addEventListener('click', function() {
      const userAnswer = input.value.trim();
      const correctAnswer = input.getAttribute('data-correct');

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        button.style.backgroundColor = 'green';
        feedback.textContent = 'Rétt!';
        feedback.style.color = 'green';
      } else {
        button.style.backgroundColor = 'red';
        feedback.textContent = `Rangt! Rétt svar er: ${correctAnswer}`;
        feedback.style.color = 'red';
      }
    });
  });
});
