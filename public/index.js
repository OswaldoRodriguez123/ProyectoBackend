
let port = 8080;
fetch('../.env')
    .then(response => response.text())
    .then(text => {
        port = text.split('=')[1];
    });

const $ = selector => document.querySelector(selector);

const send = () => {
    const data = JSON.stringify({
        nombre: $('#nombre').value,
        descripcion: $('#descripcion').value,
        precio: $('#precio').value,
        imagen: $('#imagen').value,
    });

    const request = new XMLHttpRequest();
    
    request.addEventListener('load', function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            alert('Se ha enviado con exito');
        }
    });
    
    request.open('POST', `http://localhost:${port}/api/productos`, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(data);
}

