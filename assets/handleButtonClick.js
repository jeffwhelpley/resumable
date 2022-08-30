(() => {
    window.eventHandlers = window.eventHandlers || [];
    window.eventHandlers["/handleButtonClick.js"] = function (evt, target) {
        alert("Button clicked");
    };
})();

