  // Get the balloon element
  var balloon = document.querySelector('.baloon');

  // Initial position and direction
  var x = 0;
  var y = 0;
  var xDirection = 1; // Initial horizontal direction
  var yDirection = 1; // Initial vertical direction

  // Animation loop
  function moveBalloon() {
    // Calculate new position
    x += 0.5 * xDirection; // Change this value to adjust horizontal speed
    y += 0.2 * yDirection; // Change this value to adjust vertical speed

    // Check for collision with screen edges
    var maxX = window.innerWidth - balloon.clientWidth;
    var maxY = window.innerHeight - balloon.clientHeight;

    if (x > maxX || x < 0) {
      xDirection *= -1; // Reverse horizontal direction
    }

    if (y > maxY || y < 0) {
      yDirection *= -1; // Reverse vertical direction
    }

    // Apply new position
    balloon.style.left = x + 'px';
    balloon.style.top = y + 'px';

    // Request the next animation frame
    requestAnimationFrame(moveBalloon);
  }

  // Start the animation
  moveBalloon();

