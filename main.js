let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let timeLeft = 30;
    let bonusActive = false;
    let timer;

    const clickButton = document.getElementById('clickButton');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('highScore');
    const timeDisplay = document.getElementById('time');
    const bonusItem = document.getElementById('bonusItem');
    const clickSound = document.getElementById('clickSound');

    highScoreDisplay.textContent = highScore;

    clickButton.addEventListener('click', () => {
      if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
        clickSound.play();
        checkBonus();
      } else {
        resetGame();
      }
    });

    function checkBonus() {
      if (!bonusActive && Math.random() < 0.2) {
        bonusActive = true;
        bonusItem.style.display = 'block';
        setTimeout(() => {
          bonusItem.style.display = 'none';
          bonusActive = false;
        }, 5000);
      }
    }

    bonusItem.addEventListener('click', () => {
      score += 5;
      scoreDisplay.textContent = score;
      bonusItem.style.display = 'none';
      bonusActive = false;
    });

    function startTimer() {
      timeLeft = 30;
      timeDisplay.textContent = timeLeft;

      timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          endGame();
        }
      }, 1000);
    }

    function endGame() {
      clearInterval(timer);
      alert(`ゲーム終了！あなたのスコアは ${score} です。`);
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
      }
    }

    function resetGame() {
      score = 0;
      scoreDisplay.textContent = score;
      bonusItem.style.display = 'none';
      bonusActive = false;
      startTimer();
    }

    startTimer();
