


async function handleCoursesClick(evt) {
    const courseData = await fetch('/getCourses');
    const courses = await courseData?.json() || [];
    const courseOptions = courses.map(course => {
        const el = document.createElement('option');
        el.text = course;
        return el;
    });
    evt.target.add(courseOptions);
}

// handleCompanyFieldKeyPress.js
async function handleCompanyFieldKeyPress(evt) { /* */ }

// handleFirstNameFieldKeyPress.js
async function handleFirstNameFieldKeyPress(evt) { /* */ }

// handleLastNameFieldKeyPress.js
async function handleLastNameFieldKeyPress(evt) { /* */ }

// handleEmailNameFieldKeyPress.js
async function handleEmailNameFieldKeyPress(evt) { /* */ }

// handleSectorSelectChange.js
async function handleSectorSelectChange(evt) { /* */ }

// handleDietaryFieldKeyPress.js
async function handleDietaryFieldKeyPress(evt) { /* */ }

// handleParkingToggleClick.js
async function handleParkingToggleClick(evt) { /* */ }

// handleSubmitForm.js
async function handleSubmitForm(evt) { /* */ }



(() => {
    function findModule(module) {
        return Object.values(module).find(isModule) || module;
    }
    function isModule(module) {
        return (
            "object" == typeof module &&
            module &&
            "Module" === module[Symbol.toStringTag]
        );
    }
    ((doc, hasInitialized) => {
        const broadcast = (infix, type, ev) => {
            type = type.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());
            doc.querySelectorAll("[on" + infix + "\\:" + type + "]").forEach(
                (target) => dispatch(target, infix, type, ev)
            );
        };
        const emitEvent = (el, eventName, detail) =>
            el.dispatchEvent(
                new CustomEvent(eventName, {
                    detail: detail,
                    bubbles: !0,
                    composed: !0,
                })
            );
        const error = (msg) => {
            throw new Error("QWIK " + msg);
        };
        const qrlResolver = (element, qrl) => {
            element = element.closest("[q\\:container]");
            return new URL(
                qrl,
                new URL(
                    element ? element.getAttribute("q:base") : doc.baseURI,
                    doc.baseURI
                )
            );
        };
        const dispatch = async (element, onPrefix, eventName, ev) => {
            element.hasAttribute("preventdefault:" + eventName) &&
                ev.preventDefault();
            const attrValue = element.getAttribute(
                "on" + onPrefix + ":" + eventName
            );
            if (attrValue) {
                for (const qrl of attrValue.split("\n")) {
                    const url = qrlResolver(element, qrl);
                    if (url) {
                        const symbolName = getSymbolName(url);
                        const handler =
                            (window[url.pathname] ||
                                findModule(
                                    await import(url.href.split("#")[0])
                                ))[symbolName] ||
                            error(url + " does not export " + symbolName);
                        const previousCtx = doc.__q_context__;
                        if (element.isConnected) {
                            try {
                                doc.__q_context__ = [element, ev, url];
                                handler(ev, element, url);
                            } finally {
                                doc.__q_context__ = previousCtx;
                                emitEvent(element, "qsymbol", symbolName);
                            }
                        }
                    }
                }
            }
        };
        const getSymbolName = (url) =>
            url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
        const processDocumentEvent = (ev, element) => {
            element = ev.target;
            broadcast("-document", ev.type, ev);
            while (element && element.getAttribute) {
                dispatch(element, "", ev.type, ev);
                element = ev.bubbles ? element.parentElement : null;
            }
        };
        const processWindowEvent = (ev, element) => {
            ev.target;
            broadcast("-window", ev.type, ev);
        };
        const processReadyStateChange = (readyState) => {
            readyState = doc.readyState;
            if (
                !hasInitialized &&
                ("interactive" == readyState || "complete" == readyState)
            ) {
                hasInitialized = 1;
                broadcast("", "qinit", new CustomEvent("qinit"));
                if ("undefined" != typeof IntersectionObserver) {
                    const observer = new IntersectionObserver((entries) => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(
                                    entry.target,
                                    "",
                                    "qvisible",
                                    new CustomEvent("qvisible", {
                                        bubbles: !1,
                                        detail: entry,
                                    })
                                );
                            }
                        }
                    });
                    doc.qO = observer;
                    doc.querySelectorAll("[on\\:qvisible]").forEach((el) =>
                        observer.observe(el)
                    );
                }
            }
        };
        const addDocEventListener = (eventName) => {
            document.addEventListener(eventName, processDocumentEvent, {
                capture: !0,
            });
            window.addEventListener(eventName, processWindowEvent);
        };
        if (!doc.qR) {
            doc.qR = 1;
            {
                const scriptTag = doc.querySelector("script[events]");
                if (scriptTag) {
                    scriptTag
                        .getAttribute("events")
                        .split(/[\s,;]+/)
                        .forEach(addDocEventListener);
                } else {
                    for (const key in doc) {
                        key.startsWith("on") &&
                            addDocEventListener(key.slice(2));
                    }
                }
            }
            doc.addEventListener("readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();


