const { access } = require('fs')
const GoogleSpreadSheet=require('google-spreadsheet')
const {promisify}=require('util')

const creds=require('./client_secret.json')

// const documentos=document.querySelector('body')
// const wiadomosc = document.getElementById("excell-info")
// pobranie wiadomość nie działa. Nie wiem dlaczego.

// documentos.addEventListener('click', function(){
//     console.log("dsfsdfsdfsdf")
// })

// funkcja drukująca informacje
function printStudent(wiersz){
    console.log(`Wydatki: ${wiersz.wydatki}`)
    console.log(`Przychody: ${wiersz.przychody}`)
    console.log(`Pozostało: ${wiersz.razem}`)
    console.log("________________________")
}

async function accessSpreadsheet(){
    const doc = new GoogleSpreadSheet('1VYyUQKUEyARlNYDuOMYTJy-7brY4dHq4TBZvRGyKUL8')
    await promisify(doc.useServiceAccountAuth)(creds)
    const info=await promisify(doc.getInfo)()
    const sheet=info.worksheets[0]
    // console.log(`Tytuł ${sheet.title}, Wiersze: ${sheet.rowCount}`)
    const myInfo=sheet.title
    console.log(myInfo)

    const wiersze=await promisify(sheet.getRows)({
        offset:1
    });
    wiersze.forEach(wiersz=>{
        printStudent(wiersz)
    })

    const cells=await promisify(sheet.getCells)({
        'min-row':1,
        'max-row':3,
        'min-col':1,
        'max-col':2,
    })
   for(const cell of cells){
       console.log(`[${cell.row},${cell.col}]:${cell.value}`)
   }
  
}

accessSpreadsheet()
