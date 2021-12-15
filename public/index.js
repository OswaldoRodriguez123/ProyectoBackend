
const send = () => {
    const data = JSON.stringify({
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value,
    });

    const request = new XMLHttpRequest();
    
    request.addEventListener('load', function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            alert('Se ha enviado con exito');
        }
    });
    
    request.open('POST', 'http://localhost:8080/api/productos', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(data);
}

