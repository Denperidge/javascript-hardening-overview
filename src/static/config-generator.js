
function elementsOnClick(querySelector, func) {
    const elements = document.querySelectorAll(querySelector);
    for (let i=0; i < elements.length; i++) {
        elements[i].addEventListener("click", func);
    }
}
elementsOnClick("[name='scope']", (e) => {
    e.srcElement
})

