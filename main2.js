const fs = require('fs');
const pdf = require('pdfkit');
const doc = new pdf({
    margins: {
        top: 15,
        bottom: 40,
        left: 40,
        right: 0
    }, autoFirstPage: false
});
doc.addPage({margin: 10, size: [540, 960]});
doc.font('./fonts/consola.ttf');
doc.fontSize(20);
doc.pipe(fs.createWriteStream('./arithmetic.pdf'));

doc.text('test');
doc.end();
