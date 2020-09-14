//Funcion para copiar link usando Clipboard

let shortUrl = document.querySelector('.shortUrl')
console.log(shortUrl)

const clipboard = new ClipboardJS('.btnCopy', {
    text: function(shortUrl) {
        //Copia el elemento anterior al boton copiar
        return shortUrl.previousElementSibling.href;
    }
})

clipboard.on('success', function(e) {
    console.info('Accion:', e.action);
    console.info('Texto:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Accion:', e.action);
    console.error('Trigger:', e.trigger);
});

