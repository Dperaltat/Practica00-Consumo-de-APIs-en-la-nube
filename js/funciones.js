$(document).ready(() => {
    $('#buscador').on('enviar', (e) => {
        let busctext = $('#buscTXT').val();
        getPelis(busctext);
        e.preventDefault();
    });
});

function getPelis(busctext){
    axios.get('http://www.omdbapi.com?s='+busctext).then((respuesta) => {
    console.log(respuesta);
    })
    .catch((err) =>{
        console.log(err);
    });
}

//id 813e50a8