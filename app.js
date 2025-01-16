
const game = (function() {

  const obj = {
    '1:1': '',
    '1:2': '',
    '1:3': '',
    '2:1': '',
    '2:2': '',
    '2:3': '',
    '3:1': '',
    '3:2': '',
    '3:3': '',
  }
  
  function render() {
    return `
        ${obj['1:1']} | ${obj['1:2']} | ${obj['1:3']}
      -----------
        ${obj['2:1']} | ${obj['2:2']} | ${obj['2:3']}
      -----------
        ${obj['3:1']} | ${obj['3:2']} | ${obj['3:3']}
    `
  }

  


  function gameController () {

  }



  const players = (function(name1, name2) {
    return {
      player1: {
        name: name1,
        mark: 'X'
      },
      player2: {
        name: name2,
        mark: 'O'
      }
    }
  })();



  return {}
})

game()





