// import libraries 
import { createLogger } from '@lvksh/logger';
import * as chalk from 'chalk';
import * as express from 'express';
import * as dotenv from 'dotenv';
const compression = require('compression');

// init @lvksh/logger
const log = createLogger(
  {
    ok: {
      label: chalk.greenBright`[OK]`,
      newLine: '| ',
      newLineEnd: '\\-',
    },
    debug: chalk.magentaBright`[DEBUG]`,
    info: {
      label: chalk.cyan`[INFO]`,
      newLine: chalk.cyan`⮡`,
      newLineEnd: chalk.cyan`⮡`,
    },
    veryBigNetworkError: chalk.bgRed.white.bold`[NETWORK]`,
  },
  { padding: 'PREPEND' },
  console.log
);

// init dotenv
dotenv.config();

// greet user
log.info('Welcome NoScriptCalc!', 'It\'s just a calculator,', 'No fuss!')

// define expressJS
const app = express();
app.use(compression({level: 6}))
const port = process.env.PORT || 8080

// Set global vars
const ops = ['add', 'subtract', 'multiply', 'divide']


// main menu
app.get('/', (req: any, res: any) => {
  let n = req.query.n || 0
  res.type('html');
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.jsdelivr.net/gh/Jontes-Tech/noscriptcalc@master/static/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jsdelivr.net/gh/Jontes-Tech/noscriptcalc@master/static/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jsdelivr.net/gh/Jontes-Tech/noscriptcalc@master/static/favicon-16x16.png">
      <link rel="manifest" href="https://cdn.jsdelivr.net/gh/Jontes-Tech/noscriptcalc@master/static/site.webmanifest">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Jontes-Tech/noscriptcalc@master/static/style.css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
    </head>
    <body>
      <h1>${n}</h1>
      <div>
      <a id='c' href='/?n=0'>clear</a>
      </div>
      <br>
      <br>
      <div>
      <a href='/setnum?n=0&e=${n}'>0</a>
      <a href='/setnum?n=1&e=${n}'>1</a>
      <a href='/setnum?n=2&e=${n}'>2</a>
      <a href='/setnum?n=3&e=${n}'>3</a>
      <a href='/setnum?n=4&e=${n}'>4</a>
      <a href='/setnum?n=5&e=${n}'>5</a>
      <a href='/setnum?n=6&e=${n}'>6</a>
      <a href='/setnum?n=7&e=${n}'>7</a>
      <a href='/setnum?n=8&e=${n}'>8</a>
      <a href='/setnum?n=9&e=${n}'>9</a>
      </div>
      <br>
      <div>
      <a class='op' href='/menu/add?e=${n}'>+</a>
      <a class='op' href='/menu/subtract?e=${n}'>-</a>
      <a class='op' href='/menu/multiply?e=${n}'>*</a>
      <a class='op' href='/menu/divide?e=${n}'>/</a>
      </div>
    </body>
  </html>
  `);
});

// for the setting of numbers
app.get('/setnum', (req: any, res: any) => {
  let n = req.query.n
  let e = req.query.e
  res.redirect(`/?n=${parseInt(e + n, 10)}`)
});

// menus and do api endpoints for ['+','-','*','/']
app.get('/menu/:o', (req: any, res: any) => {
  let o = req.params.o
  let e = req.query.e
  let n = req.query.n || 0
  let d = ''
  if (!ops.includes(o)) {
    log.debug(`Someone tried operation ${o}, didn't work!`)
    res.set('Cache-control', 'public, max-age=21600')
    res.send(`417 - Expected one of "${ops}", got "${o}"`)
    return
  }
  if (n !== undefined) {
    d = `+${n}`
  }
  res.set('Cache-control', 'public, max-age=21600')
  res.send(`
  <!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/css"><meta name="description" content="NoscriptCalc is a calculator webapp without client side JS"><title>NoScriptCalc</title><meta content="width=device-width,initial-scale=1" name=viewport>
  </head>
  <html lang="en">
    <body>
      <h1>${e + d}</h1>
      <a href='/menu/${o}?n=${n + 0}&e=${e}'>0</a>
      <a href='/menu/${o}?n=${n + 1}&e=${e}'>1</a>
      <a href='/menu/${o}?n=${n + 2}&e=${e}'>2</a>
      <a href='/menu/${o}?n=${n + 3}&e=${e}'>3</a>
      <a href='/menu/${o}?n=${n + 4}&e=${e}'>4</a>
      <a href='/menu/${o}?n=${n + 5}&e=${e}'>5</a>
      <a href='/menu/${o}?n=${n + 6}&e=${e}'>6</a>
      <a href='/menu/${o}?n=${n + 7}&e=${e}'>7</a>
      <a href='/menu/${o}?n=${n + 8}&e=${e}'>8</a>
      <a href='/menu/${o}?n=${n + 9}&e=${e}'>9</a>
      <br>
      <br>
      <a class='op' href='/do/${o}?e=${e}&n=${n}'>=</a>
    </body>
  </html>
  `)
});
app.get('/do/:o', (req: any, res: any) => {
  let o = req.params.o
  let n = req.query.n
  let e = req.query.e
  if (!ops.includes(o)) {
    res.set('Cache-control', 'public, max-age=21600')
    res.send(`417 - Expected one of "${ops}", got "${o}"`)
    return
  }
  res.redirect(`/?n=${Number(e) + Number(n)}`)
})

// listen
app.listen(port, () => {
  log.ok(`Server is running at http://0.0.0.0:${port}`);
});
