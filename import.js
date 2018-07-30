var process = module.exports = {
  // Wait for user's response
  askingUser: function ( text ){
    return readlineSync.question( `${text} >>`);
  },
  import: function(req, res) {
    const db = require('./models/db.js');
    const readlineSync = require('readline-sync');
    const XLSX = require('xlsx');
    const async = require('async');
    console.time(`total process`);
    
    // Read the file 
    var workbook = XLSX.readFile('./test/assets/__modelo.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
    var queue = async.queue(dataProcess,5);
    //    Tables: Users
    var userEmail = "user1@email.com" //askingUser( `Email do usuario:` );
    var userProcess;

    // To-do >>> save data in the database
    db.User
    .findOrCreate({where: {email: userEmail}, defaults: {firstName: 'User x', lastName: 'User x'}})
    .spread( (user,created) => { userProcess = user } )
    .then( function( user, created ) {
      for (x = 0; x < xlData.length; x++) {
        xlData[x].user = userProcess
      }

      queue.push( xlData, function(err){
        if (err){
          console.log(err)
        }
      } );
      queue.drain = finishLog;

    });
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

function dataProcess( xlData, callback ) {
  const db = require('./models/db.js');
  var userProcess = xlData.user;
  var accountProcess;
  var categProcess;

  db.Account
  .findOrCreate( {where: { userId: userProcess.id, account: xlData.Conta } } )
  .spread( (account, created ) => { accountProcess = account } )
  .then( function( account, created ) {
    
    db.Category
    .findOrCreate( { where: { userId: userProcess.id, description: xlData.Categoria } } )
    .spread( (cat, created) => { categProcess = cat } )
    .then( function() {
      var valor = xlData.Valor;
      var movType = ( valor > 0 ? 'Receita' : 'Despesa' );
      
      // db.Movement
      // .create({
      //   userId: userProcess.id,
      //   accountFrom: accountProcess.id,
      //   categoryId: categProcess.id,
      //   movementDate: xlData.Data,
      //   title: xlData.Descrição,
      //   value: valor,
      //   movementType: movType
      //   })
      // .then(
      //   () => {} // sucesso
      //   , err => callback(err) // erro
      //   , () => { } // término
      // )
      // .catch( err => callback(err) );

    } )
    .catch( err => callback(err) );

  } )
  .catch( err => callback(err) );
}

function finishLog() {
  // return new Promise((resolve, reject) => { // (A)
  //     setTimeout(() => resolve('DONE'), 750); // (B)
  // });
  console.timeEnd(`total process`)
}