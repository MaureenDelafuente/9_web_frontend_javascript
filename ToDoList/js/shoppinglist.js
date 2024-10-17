function cross() {
  console.log("cross");
  this.style.textDecoration = "line-through";
  this.onclick = uncross;
}

function uncross() {
  console.log("uncross");
  this.style.textDecoration = "none";
  this.onclick = cross;
}

function remove() {
  console.log("remove");
  // the html for each item is <li><span class="list-item">item name</span><span>X</span></li> but
  // the remove is activated by the <span>X</span> so remove the parent <li> with everything in it
  this.parentNode.remove();
}

function add() {
  let itemNameElement = document.getElementById("itemName");
  addItem(itemNameElement.value);

  // empty and focus the input field so you can add another item
  itemNameElement.value = "";
  itemNameElement.focus();
}

// helper function used by add and load
function addItem(itemName) {
  console.log("add");
  let ul = document.getElementById("shoppingList");

  let li = document.createElement("li");
  let text = document.createElement("span");
  let crossButton = document.createElement("span");
  text.innerHTML = itemName;
  crossButton.innerHTML = "X";
  text.className = "list-item";
  li.appendChild(text);
  li.appendChild(crossButton);
  ul.appendChild(li);
  text.onclick = cross;
  crossButton.onclick = remove;
}

function crossAll() {
  console.log("crossAll");
  // only the html tags with the item names have the class "list-item"
  let items = document.getElementsByClassName("list-item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.textDecoration = "line-through";
    items[i].onclick = uncross; 
  }
}

function uncrossAll() {
  console.log("uncrossAll");
  // only the html tags with the item names have the class "list-item"
  let items = document.getElementsByClassName("list-item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.textDecoration = "none";
    items[i].onclick = cross;
  }
}

function save() {
  console.log("save");
  // each item has a line like this: <li><span class="list-item">item name</span><span>X</span></li>
  let items = document.getElementsByClassName("list-item"); // get each <span class="list-item">item name</span>
  let itemsArray = [];
  for (let i = 0; i < items.length; i++) { // loop through each <span>
    itemsArray.push(items[i].innerHTML); // take the "item name" and add it to the array
  }
  let jsonString = JSON.stringify(itemsArray); // convert the array to a JSON string
  localStorage.setItem("items", jsonString); // save the JSON string to local storage
}

function load() {
  console.log("load");
  // the items were stored as JSON in the browsers LocalStorage
  let itemsArray = JSON.parse(localStorage.getItem("items")); //get and parse the JSON into an array
  let ul = document.getElementById("shoppingList");
  ul.innerHTML = ""; // empty the list before adding loaded items
  console.log(itemsArray);
  for (let i = 0; i < itemsArray.length; i++) {
    addItem(itemsArray[i]); // use the add helper function
  }
}

window.onload = function () {
  console.log("window onload");

  document.getElementById("saveButton").onclick = save;
  document.getElementById("loadButton").onclick = load;

  document.getElementById("crossAllButton").onclick = crossAll;
  document.getElementById("uncrossAllButton").onclick = uncrossAll;
  document.getElementById("addButton").onclick = add;

  let itemElement = document.getElementById("itemName");
  // extra way to add item by pressing enter
  itemElement.onkeydown = function (event) {
    if (event.key === "Enter") {
      add();
    }
  }
  itemElement.focus() // focus the input field when the page loads so you don't have to click it first
}
