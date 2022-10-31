

// empty progress bar
function progressBarEmpty() {
    const emptyProg = document.querySelector('.progress').innerHTML =
        `<div class="progress-bar progress-bar-striped progress-bar-animated" 
    role="progressbar" aria-valuenow="75"
    aria-valuemin="0" aria-valuemax="100" style="width: 0"></div>
</div>`
}

// full progress bar
function progressBarFull() {
    const fullProg = document.querySelector('.progress').innerHTML =
        `<div class="progress-bar progress-bar-striped progress-bar-animated" 
    role="progressbar" aria-valuenow="75"
    aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
</div>`
}





// refresh button
function refresh() {
    document.querySelector('#coinCards').innerHTML = null;
    onload()
}





// present coin cards on load section

// fetch data
window.onload = function () {
    progressBarFull()

    fetch('https://api.coingecko.com/api/v3/coins')
        .then(response => response.json())
        .then(arrayOfCoinsObjects => {
            displayCoins(arrayOfCoinsObjects)
        })
        .catch(err => alert('Error Occurred'));
}


// display data from link after page loaded
function displayCoins(arrayOfCoinsObjects) {

    for (const objectOfCoin of arrayOfCoinsObjects) {
        document.querySelector('#coinCards').innerHTML +=
            `<div class="card w-50 col-md-4">
        <div class="card-body">

              <div class="img-toggle">
                  <img src="${objectOfCoin.image['large']}"> 
                  <div class="form-check form-switch">
                    <span><input onchange="infoFetchForToggle('${objectOfCoin.id}')" 
                    id="flexSwitchCheckDefault_${objectOfCoin.id}" 
                    class="form-check-input" type="checkbox"></span>
                  </div>
              </div>         

              <div class="title-id-info">

                  <span>
                    <h6 class="card-title"><br> ${objectOfCoin.symbol}</h6>
                    <h6 class="card-title">${objectOfCoin.id} &nbsp</h6>
                  </span>

                  <span>
                    <button onclick="infoFetch('${objectOfCoin.id}')" 
                    class="btn btn-primary button-info" 
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseExampleFor_${objectOfCoin.id}" 
                    aria-expanded="false"
                    aria-controls="collapseExampleFor_${objectOfCoin.id}">
                    Info
                    </button>
                  </span>
                
                  <div class="collapse infoClass" id="collapseExampleFor_${objectOfCoin.id}">
                    <div class="card card-body">
                    
                    </div>
                  </div>
                  
              </div>
        </div>
    </div>`}

    progressBarEmpty()

}

// end of section







// present searched coin cards section

// search button onClick event
function searchButton() {
    fetch('https://api.coingecko.com/api/v3/coins')
        .then(response => response.json())
        .then(coinsSearchSubmit => {
            displaySearch(coinsSearchSubmit)
        })
        .catch(error => alert('Error Occurred'))
}


// display results after pressing search button onClick event
function displaySearch(coinsSearchSubmit) {

    let typeWord = document.querySelector('#search-field').value;
    let foundFlag = false
    for (const coinDisplay of coinsSearchSubmit) {
        if (coinDisplay.symbol === typeWord) {
            foundFlag = true;
            document.querySelector('#coinCards').innerHTML =
                `<div class="card w-50">
      <div class="card-body">

          <div class="img-toggle">
            <img src="${coinDisplay.image['large']}">
              <div class="form-check form-switch">
                <span>
                <input onclick="toggle('${coinDisplay.id}')"
                id="flexSwitchCheckDefault_${coinDisplay.id}"
                class="form-check-input" type="checkbox">
                </span>
              </div>
           </div>

                <div class="title-id-info">
                    <span>
                      <h6 class="card-title"><br> ${coinDisplay.symbol}</h6>
                      <h6 class="card-title">${coinDisplay.id} &nbsp</h6>
                    </span>

                    <span>
                      <button onclick="infoFetch('${coinDisplay.id}')"
                      class="btn btn-primary button-info" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExampleFor_${coinDisplay.id}"
                      aria-expanded="false"
                      aria-controls="collapseExampleFor_${coinDisplay.id}">
                      Info
                      </button>
                    </span>
                </div>

                <div class="collapse infoClass" id="collapseExampleFor_${coinDisplay.id}">
                    <div class="card card-body">
                    </div>
                </div>
                </div>   
          </div>
      </div>`}
    }

    if (!foundFlag) {
        alert('No Coins Match To Your Search')
        document.querySelector('#search-field').value = '';
    }
}

// end of section







// info card section

let coinsArrayHomePage = [];

// fetching crypto currency info sub card
function infoFetch(id) {
    progressBarFull()

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(responseInfo => responseInfo.json())
        .then(objInfoForModal => {
            checkItemInArray(objInfoForModal)
        })

        .catch(err => alert('Error Occurred'));
}

// end of section







// check for delete once per second
const deleteAfter = 120000
setInterval(function checkItems() {
    coinsArrayHomePage.forEach(function (item) {
        if (Date.now() - deleteAfter > item.createdTime) {
            coinsArrayHomePage.splice(coinsArrayHomePage[item], 1)
        }
    })
}, 1000)


// check if fetched info exist in array
function checkItemInArray(item) {
    (!coinsArrayHomePage || [])

    coinAndTimeOut = {

        coinInfo: item,

        createdTime: Date.now()

    }

    let idToString = coinsArrayHomePage.map(i => i.coinInfo.id).toString();


    (idToString === item.id) ? displayInfoFromArray(coinsArrayHomePage) : (
        coinsArrayHomePage.push(coinAndTimeOut) &&
        displayInfo(item)
    )

}


// display info from array in sub card
function displayInfoFromArray(infoFromArray) {

    for (let i = 0; i < infoFromArray.length; i++) {
        for (let j = 0; j < i.length; j++) {
            document.querySelector(`#collapseExampleFor_${j.id}`).innerHTML =
                `<div>
                <span>${j.id}</span>
              </div>
    <h5>Relative Value:</h5>
      <span>${j['market_data']['total_volume'].usd} &nbsp <i class="fa fa-dollar"></i></span>
    </div>

    <div>
      <span>${j['market_data']['total_volume'].ils} &nbsp <i class="fa fa-shekel"></i></span>
    </div>

    <div>
      <span>${j['market_data']['total_volume'].eur} &nbsp <i class="fa fa-euro"></i></span>
    </div>`
        }
    }
    progressBarEmpty()
}



// display currency info in sub card after fetch
function displayInfo(coinPresentInfoCard) {
    console.log(coinPresentInfoCard.id);
    document.querySelector(`#collapseExampleFor_${coinPresentInfoCard.id}`).innerHTML =
        `<div>
        <span>${coinPresentInfoCard.id}</span>
      </div>
        <h5>Relative Value:</h5>
      <span>${coinPresentInfoCard['market_data']['total_volume'].usd} &nbsp <i class="fa fa-dollar"></i></span>
    </div>

    <div>
      <span>${coinPresentInfoCard['market_data']['total_volume'].ils} &nbsp <i class="fa fa-shekel"></i></span>
    </div>

    <div>
      <span>${coinPresentInfoCard['market_data']['total_volume'].eur} &nbsp <i class="fa fa-euro"></i></span>
    </div>
      </div>
  </div>`

    progressBarEmpty()
}

// end of section







// toggle input in Home page section

let toggleArray = []


// fetching info for toggle input
function infoFetchForToggle(coinObjectToggle) {
    progressBarFull();

    fetch(`https://api.coingecko.com/api/v3/coins/${coinObjectToggle}`)
        .then(responseInfo => responseInfo.json())
        .then(objInfoToggle => {
            toggle(objInfoToggle)
        })

        .catch(alert('Error Occurred'));
}





// check if toggle array exist and push object to array
function toggle(toggleCardObject) {


    progressBarEmpty();


    (!toggleArray || [])


    let toggleOnOff = `#flexSwitchCheckDefault_${toggleCardObject.id}`



    for (i = -1; i < toggleArray.length; i++) {

        if (toggleArray[i] === toggleCardObject) {
            return
        }

    }



    if (document.querySelector(toggleOnOff).checked === true) {

        toggleArray.push(toggleCardObject)
    }



    if (document.querySelector(toggleOnOff).checked === false) {

        toggleArray.splice(toggleOnOff, 1);

    }



    if (toggleArray.length > 5) {

        modal(toggleArray)
    }
}

// end of section







// modal after selecting more than 5 coin cards section

// show coin cards in modal
function modal(toggleArray) {

    let modalOfCards = document.querySelector('#exampleModal');

    const html =
        `<div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"
                id="exampleModalLabel">Choose Only 5 Coins - Please Check One Off</h4>
                <button onclick="restoreDefault()"
                type="button" class="btn-close"
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
            </div>

        
    <div id="array_content_modal" class="modal-body">
    
    ${toggleArray.map(objectOfCoin =>
            `<div class="card w-50">
            <div class="card-body">
                <div class="img-toggle">
                    <img src="${objectOfCoin.image['large']}">
                    <div class="form-check form-switch">
                    <span><input onchange="toggleDeleteCard('${objectOfCoin.id}')" 
                    id="flexSwitchCheckToggle_${objectOfCoin.id}" 
                    class="form-check-input" type="checkbox" checked>
                    </span>

                    
                    </div>
                    <div>
                    <h6 class="card-title"><br> ${objectOfCoin.symbol}</h6>
                    <h6 class="card-title">${objectOfCoin.id} &nbsp</h6>
                    </div>
                </div>  
            </div>
        </div>`).join('')}
        
    </div>        
    </div>
    </div>`

    modalOfCards.innerHTML = html


    new bootstrap.Modal(modalOfCards).show();
}



// remove coin card from array after toggle off and close modal
function toggleDeleteCard(coinId) {

    let modalOfCards = document.querySelector('#exampleModal');

    let updateModalCards = toggleArray.findIndex(item => item.id === coinId)
    let itemSpliced = toggleArray.splice(updateModalCards, 1);

    if (toggleArray.length === 5) {

        let closingModalOfCards = bootstrap.Modal.getInstance(modalOfCards)
        closingModalOfCards.hide()

        toggleOffFromHomePage(itemSpliced)
    }

}


// update results in home page after modal closed
function toggleOffFromHomePage(itemInMainPage) {

    document.querySelector(`#flexSwitchCheckDefault_${itemInMainPage[0].id}`).checked = false;

}

// end of section







// update results in home page after pressing exit button in modal section

// keep the original 5 coin cards array and close modal after modal exit button pressed
function restoreDefault() {

    let modalOfCards = document.querySelector('#exampleModal');

    let updateHomePageCards = toggleArray.pop()


    if (toggleArray.length === 5) {

        let closingModalOfCards = bootstrap.Modal.getInstance(modalOfCards)
        closingModalOfCards.hide()

        toggleOffFromHomePageAfterModalCancelButton(updateHomePageCards)
    }

}


// present the original 5 coin cards in home page after modal closed by exit button pressed
function toggleOffFromHomePageAfterModalCancelButton(coinCardToToggleOff) {
    document.querySelector(`#flexSwitchCheckDefault_${coinCardToToggleOff.id}`).checked = false;
}

// end of section