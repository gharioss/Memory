document.addEventListener('DOMContentLoaded', () => {
  let arrayOfImage = ['Images/image1.jpg', 'Images/image2.jpg', 'Images/image3.jpg', 'Images/image4.jpg', 'Images/image5.png', 'Images/image6.jpeg', 'Images/image7.png', 'Images/image8.png', 'Images/image9.jpg', 'Images/image10.jpg', 'Images/image11.png', 'Images/image12.jpg']
  let cardFree = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  let firstFlip = ''
  let time;
  let valided = 0
  let playAgain = document.getElementById('restart')
  playAgain.style.display = 'none'
  let score = 0;
  if (window.localStorage.getItem('score')) {
    document.getElementById('bestScore').textContent = 'Your current best score is : ' + window.localStorage.getItem('score')
  }

  Array.from(document.getElementsByTagName('img')).forEach(card => {
    card.addEventListener('click', () => {
      flipCard(card)
    })
  })
  playAgain.addEventListener('click', function () {
    console.log("validated")
    startGame()
  })
  function startGame() {
    playAgain.style.display = 'none'
    valided = 0;
    cardFree = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    arrayOfImage.forEach(imageSrc => {
      for (let y = 0; y < 2; y++) {
        let availablePlace = cardFree.length
        let randomIndex = Math.floor(Math.random() * availablePlace)
        let idCard = cardFree[randomIndex]
        cardFree.splice(randomIndex, 1)
        document.getElementById(idCard).src = 'Images/hiddenImg.jpg'
        document.getElementById(idCard).dataset.src = imageSrc
      }
    });
  }
  startGame()
  Array.from(document.getElementsByTagName("img")).map(i => console.log(i.id, i.src.split("/")[i.src.split("/").length - 1], i.dataset.src.split("/")[i.dataset.src.split("/").length - 1]))

  function flipCard(card) {
    if (time || card.dataset.src == card.src) {
      return
    }
    card.src = card.dataset.src
    if (firstFlip == '') {
      firstFlip = card.id
      console.log(firstFlip)
      return
    }
    score += 1
    if (document.getElementById(firstFlip).src != card.src) {
      time = setTimeout(function () {
        document.getElementById(firstFlip).src ='Images/hiddenImg.jpg'
        card.src = 'Images/hiddenImg.jpg'
        firstFlip = ''
        time = null;
      }, 800);
    } else {
      firstFlip = ''
      valided += 1
      if (arrayOfImage.length == valided) {
        playAgain.style.display = 'flex'
        if (!window.localStorage.getItem('score') || window.localStorage.getItem('score') > score) {
          window.localStorage.setItem('score', score)
          document.getElementById('bestScore').textContent = 'Your current best score is : ' + score
        }
      }
    }
  }



});