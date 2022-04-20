class Piece {
    
    constructor() {
        this.gravity = 0;
        this.squareSize = 30;
        this.margin = 2;
        this.pieces = [
            [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
            [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
            [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
            [[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]],
            [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
            [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
            [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]
        ];
        this.colors = ["blue","yellow","red","purple","green"];
    }

    turnPiece(piece) {
        var rotatePiece = [];
        for (var i = 0; i < 4 ; i++ ) {
            rotatePiece[i] = [];
            var j = 3;
            for (var f = 0; f < 4 ; f++ ) {
                rotatePiece[i][f] = piece[j][i];
                j--;
            }
        }
        return rotatePiece;
    }

    returnRandomPiece() {
        return this.pieces[Math.floor(Math.random()*(this.pieces.length-1))];
    }

    returnRandomColor() {
        return this.colors[Math.floor(Math.random()*(this.colors.length))];
    }


}