document.addEventListener('DOMContentLoaded', () => {
  // Configurações do jogo
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  const gridSize = 10;
  const gridWidth = canvas.width / gridSize;
  const gridHeight = canvas.height / gridSize;


  // Estado do jogo
  let snake = [{ x: 10, y: 10 }];
  let direction = 'right';

  // Função para atualizar o estado do jogo
  function update() {
    // Movimentar a cobrinha
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // Verificar colisão com as bordas do tabuleiro
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      gameOver();
      return;
    }

    // Verificar colisão com a própria cobrinha
    if (snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
      gameOver();
      return;
    }


    snake.unshift(head);

    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a cobrinha
    context.fillStyle = 'black';
    snake.forEach(segment => {
      context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    for (var i = snake.length - 1; i > 1; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;

    }

    // Agendar a próxima atualização
    setTimeout(update, 1000 / 70);
  }

  // Função para lidar com as teclas pressionadas
  function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  }

  // Função para encerrar o jogo
  function gameOver() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Exibir mensagem de fim de jogo
    context.fillStyle = 'white';
    context.font = '100px Arial';
    context.fillText('Game Over', canvas.width / 3 - 80, canvas.height / 1.6);
  }

  // Adicionar o evento de pressionar tecla
  document.addEventListener('keydown', handleKeyPress);

  // Iniciar o jogo
  update();
});

