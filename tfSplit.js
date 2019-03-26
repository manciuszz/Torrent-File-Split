(function() {
    class tfSplit {
        constructor() {
            let jsonEditorValue = window.ace.edit("jsonEditor").getValue();
            if (!jsonEditorValue)
                return console.log("Empty structure");
            this.originalStructure = JSON.parse(jsonEditorValue);
            this.copyOf = JSON.parse(JSON.stringify(this.originalStructure));
            this.pieces = this.getPiecesByteString();
            this.piecesLength = this.originalStructure.info["piece length"];
            this.piecesArr = [];
        };

        getFiles() {
            return this.originalStructure.info.files;
        };

        getFile(index) {
            return this.getFiles()[index];
        };

        getSplitPieces() {
            return this.piecesArr;
        };

        splitPiecesToByteString(fileIndexArr) {
            let byteString = "";
            let indexArr = fileIndexArr || this.fileIndexArr;
            for(let i=0; i < indexArr.length; i++) {
                byteString += this.getSplitPieces()[indexArr[i]].filePiece;
            }
            return byteString;
        };

        getPiecesByteString() {
            let pieces = this.originalStructure.info.pieces;
            let stripTags = pieces.replace(/<hex>(.*)<\/hex>/g, '$1');
            let removeSpaces = stripTags.replace(/\s/g, '').trim();
            return removeSpaces;
        };

        setPiecesByteString(newPiecesByteString) {
            this.copyOf.info.pieces = `<hex>${newPiecesByteString}</hex>`;
        };

        pasteNewStructure() {
            let jsonString = JSON.stringify(this.copyOf, null, 2);
            //copy(jsonString);
            //console.log(jsonString);
            window.ace.edit("jsonEditor").setValue(jsonString);
        };

        calcFilePieceLength(fileIndex) {
            // SHA1 produces a 160-bit (20-byte) hash value, typically rendered as a hexadecimal number, 40 digits long.
            let offset = null; 
            if ((this.getFiles().length - 1) === fileIndex)
                offset = -~(this.getFile(fileIndex).length % this.piecesLength) * 40;
            else
                offset = -~(this.getFile(fileIndex).length / this.piecesLength) * 40;

            let filePiece = this.pieces.substr(0, offset);
            this.pieces = this.pieces.replace(filePiece, '');
            this.piecesArr[fileIndex] = { offset: offset, filePiece: filePiece};
        };

        selectFiles(fileIndexArr) {
            if (!fileIndexArr)
                return;
                
            let newArr = [];
            for(let i=0; i < fileIndexArr.length; i++)
                newArr[i] = this.getFile(fileIndexArr[i]);     
            this.copyOf.info.files = newArr;
            this.fileIndexArr = fileIndexArr;
        };

        calcNewPieceByteStructure() {
            this.pieces = this.getPiecesByteString();
            for(let i=0; i < this.getFiles().length; i++) {
                this.calcFilePieceLength(i);
            }
        };
    };

    let main = !function(wantedFilesIndexes) {
        let newSplit = new tfSplit();
        newSplit.calcNewPieceByteStructure();
        newSplit.selectFiles(wantedFilesIndexes);
        newSplit.setPiecesByteString(newSplit.splitPiecesToByteString());
        newSplit.pasteNewStructure();
    }([0, 1, 2, 3]);
})();