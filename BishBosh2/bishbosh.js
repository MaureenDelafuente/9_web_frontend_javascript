window.onload = function() {
    console.log("window onload");
    let countButton = document.getElementById("countButton");
    countButton.onclick = count;
  }
  
  function count() {
    console.log("count function");
    // get the user input
    let countTo = document.getElementById("countTo").value;
    countTo = parseInt(countTo);
    let bish = document.getElementById("bish").value;
    bish = parseInt(bish);
    let bosh = document.getElementById("bosh").value;
    bosh = parseInt(bosh);
  
    // create a string to hold the numbers
    let numbers = "";
  
    // loop through the numbers
    for (let i = 1; i <= countTo; i++) {
      // check if the number is divisible by 2 and 3
      if (i % bish === 0 && i % bosh === 0) {
        numbers += "Bish-Bosh\n";
      } else if (i % bish === 0) {
        numbers += "Bish\n";
      } else if (i % bosh === 0) {
        numbers += "Bosh\n";
      } else {
        numbers += i + "\n";
      }
    }
  
    // display the numbers
    let output = document.getElementById("output");
    output.innerHTML = numbers;
  }