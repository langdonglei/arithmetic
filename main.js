const fs = require('fs');
const pdf = require('pdfkit');
const doc = new pdf({
    margins: {
        top: 15,
        bottom: 40,
        left: 40,
        right: 0
    }
});

doc.pipe(fs.createWriteStream('./arithmetic.pdf'));
doc.font('./fonts/consola.ttf');
doc.fontSize(20);
// doc.text('郎情');
// doc.moveDown();
let page = 20;
let line = 16 * page;

for (let i = 0; i < line; i++) {
    doc.text(gan());
    doc.moveDown();
}
doc.end();

function gan() {
    let max = 100;
    let i = 3;
    let r = '';
    while (i > 0) {
        let a = 1 + Math.round(Math.random() * (max - 2));
        let b = 1 + Math.round(Math.random() * (max - 2));
        let c = a + b;
        let d = a - b;
        if (a.toString().length === 1) {
            a = a + '  ';
        } else if (a.toString().length === 2) {
            a = a + ' ';
        }
        if (b.toString().length === 1) {
            b = b + '  ';
        } else if (b.toString().length === 2) {
            b = b + ' ';
        }
        if (Math.round(Math.random() * 100) % 2 === 0) {
            if (c <= max) {
                r += a + " + " + b + " =      ";
                i--;
            }
        } else {
            if (d >= 1) {
                r += a + " - " + b + " =      ";
                i--;
            }
        }

    }
    return r
}

