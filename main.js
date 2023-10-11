const fs  = require('fs')
const pdf = require('pdfkit')
const doc = new pdf({
    margins: {
        top   : 15,
        bottom: 40,
        left  : 40,
        right : 0
    }
});

doc.pipe(fs.createWriteStream('./dist.pdf'))
doc.font('./font/consola.ttf')
doc.fontSize(20)

let page = 11
let line = 16 * page

for (let i = 0; i < line; i++) {
    doc.text(generate_add_sub())
    // doc.text(generate_mul_div())
    doc.moveDown()
}
doc.end()

function generate_add_sub(max = 100) {
    let i = 3
    let r = ''
    while (i > 0) {
        let a = 1 + Math.round(Math.random() * (max - 2))
        let b = 1 + Math.round(Math.random() * (max - 2))
        let c = a + b
        let d = a - b
        if (a.toString().length === 1) {
            a = a + '  '
        }
        if (a.toString().length === 2) {
            a = a + ' '
        }
        if (b.toString().length === 1) {
            b = b + '  '
        }
        if (b.toString().length === 2) {
            b = b + ' '
        }
        if (Math.round(Math.random() * 100) % 2 === 0) {
            if (c <= max) {
                r += a + " + " + b + " =      "
                i--
            }
        } else {
            if (d >= 1) {
                r += a + " - " + b + " =      "
                i--
            }
        }
    }
    return r
}

function generate_mul_div() {
    let r      = ''
    let column = 3
    while (column > 0) {
        column--
        let a      = (Math.random() * (Math.floor(Math.random() * (99)) + 1)).toFixed(Math.floor(Math.random() * 4))
        let b      = (Math.random() * (Math.floor(Math.random() * (99)) + 1)).toFixed(Math.floor(Math.random() * 4))
        let c      = (Math.random() * (Math.floor(Math.random() * (99)) + 1)).toFixed(Math.floor(Math.random() * 4))
        let random = Math.floor(Math.random() * 4)
        if (random === 0) {
            r = a.padEnd(6, ' ') + ' x ' + b.padEnd(6, ' ') + ' x ' + c.padEnd(6, ' ') + ' = '.padEnd(14, ' ') + (a * b * c).toFixed(6)
        }
        if (random === 1) {
            r = a.padEnd(6, ' ') + ' x ' + b.padEnd(6, ' ') + ' ÷ ' + c.padEnd(6, ' ') + ' = '.padEnd(14, ' ') + (a * b / c).toFixed(6)
        }
        if (random === 2) {
            r = a.padEnd(6, ' ') + ' ÷ ' + b.padEnd(6, ' ') + ' x ' + c.padEnd(6, ' ') + ' = '.padEnd(14, ' ') + (a / b * c).toFixed(6)
        }
        if (random === 3) {
            r = a.padEnd(6, ' ') + ' ÷ ' + b.padEnd(6, ' ') + ' ÷ ' + c.padEnd(6, ' ') + ' = '.padEnd(14, ' ') + (a / b / c).toFixed(6)
        }
    }
    return r
}

