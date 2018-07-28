var process = module.exports = {
  // Wait for user's response
  askingUser: function ( text ){
    return readlineSync.question( `${text} >>`);
  },
  import: function(req, res) {
    const db = require('./models/db.js');
    const readlineSync = require('readline-sync');
    const XLSX = require('xlsx');
    const Rx = require('rxjs');

    console.time(`total process`);

    // Read the file 
    var workbook = XLSX.readFile('./test/assets/__modelo.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // To-do >>> database structure
    //    Tables: Users
    var userEmail = "user1@email.com" //askingUser( `Email do usuario:` );
    var userProcess;
    var accountProcess;
    var categProcess;

    // To-do >>> save data in the database
    db.User
      .findOrCreate({where: {email: userEmail}, defaults: {firstName: 'User x', lastName: 'User x'}})
      .spread( (user,created) => { userProcess = user } )
      .then( function( user, created ) {
        
        xlData.map(
          function(x) {
            
            db.Account
            .findOrCreate( {where: { userId: userProcess.id, account: x.Conta } } )
            .spread( (account, created ) => { accountProcess = account } )
            .then( function( account, created ) {
              
              db.Category
              .findOrCreate( { where: { userId: userProcess.id, description: x.Categoria } } )
              .spread( (cat, created) => { categProcess = cat } )
              .then( function() {
                
                var valor = x.Valor;
                var movType = ( valor > 0 ? 'Receita' : 'Despesa' );
                
                db.Movement
                .create({
                  userId: userProcess.id,
                  accountFrom: accountProcess.id,
                  categoryId: categProcess.id,
                  movementDate: x.Data,
                  title: x.Descrição,
                  value: valor,
                  movementType: movType
                  })
                .then(
                  () => {} // sucesso
                  , (err) => console.log('erro no movimento',err) // erro
                  , () => { } // término
                );
              } );
            } );
          }
        );
        res.send('command "import" finished');
        // console.timeEnd(`total process`);
        finishLog().then( x => console.timeEnd(`total process`) );
      }
    ,(x) => {console.log(`Erro na inclusao do usuario`, x)}
    ,() => {console.timeEnd(`total process`)}
    );
  },
  test: function(req,res){
    const db = require('./models/db.js');
    var n = 0;

    db.Test
    .findOrCreate({where: {desc: `Test ${n}`, numb: n} } )
    .spread( (test,created) => { return test } )
    .then( function( test, created ) {
      console.log(`test processed ${test.id}`);
      res.send('command "test" finished');
      n++;
    } );
  }
}

function finishLog() {
  return new Promise((resolve, reject) => { // (A)
      setTimeout(() => resolve('DONE'), 750); // (B)
  });
}