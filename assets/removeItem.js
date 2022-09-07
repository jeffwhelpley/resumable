// removeItem.js
(() => {
    window.eventHandlers["/removeItem.js"] = function (evt, target) {
        evt.target.parentNode.remove();
    };
})();

