//Global varaibles used for value indexing and pricing.
var coinIndex = {"10c": 0.1, "20c": 0.2, "50c": 0.5, "$1": 1, "$2": 2};
var itemIndex = {caramel: 2.5, hazelnut: 3.1, organicRaw: 2};

// The vegan vending Machine's current coins.
var coinHolder = {"5c": 0, "10c": 0, "20c": 0, "50c": 0, "$1": 0, "$2": 0};

//Value credit currently in the vending Machine
var totalCredit = 0;

var addCoin = function(coin) {
  if (validCoin(coin)) {
    updateTotalCredit(coin, "add");
    updateDisplayedCredit();
    toggleButton();
  }
  return;
};

/*
Checks parameter input to see if it is an accepted currency based on the index.

If not, it returns an error message.
*/
var validCoin = function(coin) {
  if (coinIndex[coin]) {
    returnChuteMessage(coin + " has been deposited");
    addToHolder(coin);
    return true;
  } else {
    returnChuteMessage("1 5c coin returned");
    throw new Error("Invalid currency.");
    return false;
  }
};

var addToHolder = function(coin) {
  coinHolder[coin] += 1;
};

var removeFromHolder = function(coin, amount){
  coinHolder[coin] -= amount;
};

var updateDisplayedCredit = function() {
  $(".current-credit").text(parseFloat(Math.round(totalCredit* 100) / 100).toFixed(2));
};

/*
prints a message for the user.
first paramter "message" takes a string to display.
The second parameter is optional, type "append" to append, or leave empty for the message or display whole.
*/
var returnChuteMessage = function(message, type) {
  if (type === "append") {
    $(".return-message").append(message);
  } else {
    $(".return-message").html(message);
  }
};

/*
Takes in a number value, and an action
and changes the totalCredit value accordingly
*/
var updateTotalCredit = function(coin, change) {
  if (coin === "5c") {
    return;
  }
  if (change === "add") {
    return totalCredit += coinIndex[coin];
  } else if (change === "minus") {
    return totalCredit -= coinIndex[coin];
  } else if (change === "clear") {
    return totalCredit = 0;
  }
};

/*
Make a purchase of an available item based on its index.

Takes in paramter that identifies the item, based on the button's input.

if/else is used to evaluate if there is enough credit to make the purchase.
*/
var buyItem = function(item) {
  if (totalCredit == itemIndex[item]) {
    updateTotalCredit(item, "clear");
    returnChuteMessage("A " + item + " is vended");
    toggleButton();
    updateDisplayedCredit();
    coinHolder = {"5c": 0, "10c": 0, "20c": 0, "50c": 0, "$1": 0, "$2": 0};
  } else if (totalCredit > itemIndex[item]) {
    returnChuteMessage("You have too much credit.");
    throw new Error("You have too much credit.");
  } else if (totalCredit < itemIndex[item]) {
    returnChuteMessage("You don't have enough credit.");
    throw new Error("You don't have enough credit.");
  }
};

var toggleButton = function() {
  for (var key in itemIndex) {
    if (totalCredit == itemIndex[key]) {
      $('#'+key).prop('disabled', false);
      returnChuteMessage(key + " is available for purchase.");
    } else {
      $('#'+key).prop('disabled', true);
    }
  };
};

var returnCoins = function() {
  if (totalCredit) {
    returnChuteMessage("");
    for (var key in coinHolder) {
      if (coinHolder[key] !== 0) {
        if (coinHolder[key] === 1) {
            returnChuteMessage(coinHolder[key] + " " + key + " coin returned <br/>", "append");
            removeFromHolder(key, 1);
        } else {
          returnChuteMessage(coinHolder[key] + " " + key + " coins returned <br/>", "append");
          removeFromHolder(key, coinHolder[key]);
        }
      }
    };
  } else if (totalCredit == 0) {
    returnChuteMessage("No coins to return.")
    throw new Error("No coins to return.");
    return;
  }
  updateTotalCredit(0, "clear");
  updateDisplayedCredit();
  toggleButton();
};
