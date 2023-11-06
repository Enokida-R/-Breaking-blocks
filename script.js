var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;

var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}



function collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if(score == brickRowCount * brickColumnCount){
                        alert('You Win')
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font ='16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('score:' + score, 8, 20);
}

function drawLives(){
    ctx.font ='16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('lives:' + lives, canvas.width - 65, 20);
}

/*ボール */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle='#0095DD';
    ctx.fill();
    ctx.closePath();

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle='#0095DD';
    ctx.fill();
    ctx.closePath();

}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight, Math.PI * 2);
                ctx.fillStyle='#0095DD';
                ctx.fill();
                ctx.closePath();

            }
            
        }
    }
}

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (y + dy > canvas.height - ballRadius) {
        // ボールがパドルに当たっているかチェック
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            // ボールがパドルの中に埋まらないように位置を調整
            y = canvas.height - paddleHeight - ballRadius;
        } else {
            lives--;

            if(!lives) {
                alert('GAME OVER');
                document.location.reload();
                return; // ここに return 文を追加して、関数の早期に出る
            }else{
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }

            
        }
    }
    
    
    

    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = -dx;
    }

    if(y + dy < ballRadius || y + dy > canvas.width - ballRadius){
        dy = -dy;
    }


    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);

    
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    }else if (e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }else if (e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

draw();
/*赤色の四角 */
/*ctx.beginPath();
ctx.rect(20, 40, 50, 50,);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.stroke();
ctx.closePath();*/