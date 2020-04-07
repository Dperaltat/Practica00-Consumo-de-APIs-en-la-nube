$(document).ready(() => {
    $('#buscador').on('submit', (e) => {
        let buscTexT = $('#buscTXT').val();
        getPelis(buscTexT);
        e.preventDefault();
    });
});

function getPelis(buscTexT){
    axios.get('https://www.omdbapi.com?s='+buscTexT+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        let peliculas = respuesta.data.Search;
        let output = '';
        $.each(peliculas, (index, movie) => {
            output += ` 
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="peliSelect('${movie.imdbID}')" class="btn btn-primary" href="#"> Detalles</a>
                    </div>
                </div>
            `;
        });
        
        $('#peliculas').html(output);
    })
    .catch((err) =>{
        console.log(err);
    });
}

function peliSelect(id){
    sessionStorage.setItem('peliId', id);
    window.location = 'pelicula.html';
    return false;
}

function getPelicula(){
    let peliId = sessionStorage.getItem('peliId');

    axios.get('http://www.omdbapi.com?i='+peliId+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        let movie = respuesta.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}"</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Género:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Hecha:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Calificación:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>Calificación IMDB:</strong> ${movie.imbdRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Escritor:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actores:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Trama</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Ver IMDB</a>
                    <a href="index.html" class="btn btn-default">Volver</a>
                    </hr>
                </div>
            </div>  

        `;
        
        $('#peli').html(output);
    })
    .catch((err) =>{
        console.log(err);
    });
}

//id 813e50a8