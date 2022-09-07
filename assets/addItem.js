// addItem.js
(() => {
    window.eventHandlers["/addItem.js"] = function (evt, target) {
        const toDoList = document.querySelector("#todolist");

        const newItem = document.createElement("li");
        const newItemInput = document.querySelector("#newitem");
        const newItemText = document.createTextNode(newItemInput.value);
        newItemInput.value = "";

        const removeNewItem = document.createElement("span");
        removeNewItem.textContent = "X";
        removeNewItem.setAttribute("on:click", "/removeItem.js");

        newItem.appendChild(newItemText);
        newItem.appendChild(removeNewItem);
        toDoList.appendChild(newItem);
    };
})();


