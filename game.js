const initialX = 10;
const initialY = 18;

class Game {

    constructor(x, y) {

        this.gravity = 0;
        this.squaresX = x ? x : initialX;
        this.squaresY = y ? y : initialY;
        this.gameScreen = [];
        for (var i = 0; i < this.squaresX; i++) {
            this.gameScreen[i] = [];
            for (var j = 0; j < this.squaresY; j++) {
                this.gameScreen[i][j] = 0;
            }
        };
        this.squareSize = 30;
        this.margin = 2;
        this.currentPiece;
        this.currentColor;
        this.pieceInGame = false;
        this.bottom = false;
        this.initialPieceX = 1;
        this.initialPieceY = 1;
        this.x = 0;
        this.y = 0;
        this.explodedX = 0;
        this.explodedY = 0;
        
    }

    drawScreen(ctx) {
        //15 x 8 squares
        //size 10x10px each square
        for (var i = 1; i <= this.squaresY; i++) {
            for (var f = 1; f <= this.squaresX; f++) {
                ctx.fillStyle = '#aaaaaa';
                ctx.fillRect((f * this.squareSize), i * this.squareSize, this.squareSize - this.margin, this.squareSize - this.margin);
            }
        }
    }

    drawSquareFall(ctx) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.gravity, 10, 10, 10);
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.gravity, 10, 10, 10);
    }


    drawRandomPiece(ctx, x, y) {
        this.drawScreen(ctx);
        var pieceObject = new Piece();
        var piece = pieceObject.returnRandomPiece();
        this.drawPiece(piece, ctx, x, y);
    }

    drawSpecifiedPiece(ctx, x, y) {
        this.drawScreen(ctx);
        var pieceObject = new Piece();
        var piece = pieceObject.pieces[3];
        this.drawPiece(piece, ctx, x, y);
    }

    clickRotate() {
        var piece = new Piece();
        this.currentPiece = piece.turnPiece(this.currentPiece);
    }

    drawPieceFix(piece, ctx, x, y) {

        for (var i = 0; i < 4; i++) {
            for (var f = 0; f < 4; f++) {
                var sendX = x;
                var sendY = y;
                if (piece[i][f] > 0 && (sendX > 0)) {
                    sendX = i + x < 1 ? 1 : (i + x > this.squaresX ? this.squaresX : i + x);
                    sendY = f + y < 1 ? 1 : (f + y > this.squaresY ? this.squaresY : f + y);
                    this.drawDot(ctx, sendX, sendY, this.color);
                }
            }
        }
    }

    drawPiece(piece, ctx) {

        var explodeX = 0;
        var explodeY = 0;
        var pieceXTmp = [0, 0, 0, 0];
        var pieceYTmp = [0, 0, 0, 0];
        var maxX = 1;
        var maxY = 1;
        for (var i = 0; i < 4; i++) {
            for (var f = 0; f < 4; f++) {
                if (piece[i][f] > 0) {
                    pieceXTmp[f] = piece[i][f];
                }
                if (piece[f][i] > 0) {
                    pieceYTmp[f] = piece[f][i];
                }
            }
        }
        for (var i = 0; i < 4; i++) {
            maxX += pieceXTmp[i];
            maxY += pieceYTmp[i];
        }

        explodeX = this.x + maxX;
        if (explodeX > this.squaresX) {
            this.x = this.x - maxX;
        }

        explodeY = this.y + maxY;
        if (explodeY > this.squaresY) {
            this.explodeY++;
        }
        if (this.explodedX < 3 || this.explodedY < 3) {
            this.drawPieceFix(piece, ctx, this.x, this.y);
        } else {
            this.pieceInGame = false;
        }
    }

    drawDot(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect((x * this.squareSize), y * this.squareSize, this.squareSize - this.margin, this.squareSize - this.margin);
    }

    addPieceGravity(ctx) {
        console.log(this.x + " " + this.y);
        this.y = this.y + 1;
        this.drawPiece(this.currentPiece, ctx, this.x, this.y);
    }

    generateGamePiece(ctx) {
        var piece = new Piece();

        if (this.y > initialY) {
            this.pieceInGame = false;
        }

        if (!this.pieceInGame) {
            this.currentPiece = piece.returnRandomPiece();
            this.color = piece.returnRandomColor();
            var nSpin = Math.floor(Math.random() * 3) + 1;
            for (var i = 0; i < nSpin; i++) {
                this.currentPiece = piece.turnPiece(this.currentPiece);
            }
            this.x = Math.floor(Math.random() * this.squaresX) + 1;
            this.pieceInGame = true;
            this.y = -4;
            this.explodedX = 0;
            this.explodedY = 0;
        }
        if (this.pieceInGame) {
            this.addPieceGravity(ctx);
        }

    }

    draw(ctx) {
        this.drawScreen(ctx);
        this.generateGamePiece(ctx);
    }


    check(e) {
        alert(e.keyCode);
    }

}