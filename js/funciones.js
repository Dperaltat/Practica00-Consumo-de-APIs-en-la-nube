$(document).ready(() => {
    $('#buscador').on('submit', (e) => {
        var buscTexT = $('#buscTXT').val();
        getPelis(buscTexT);
        e.preventDefault();
    });
});

function getPelis(buscTexT){
    axios.get('https://www.omdbapi.com?s='+buscTexT+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        var peliculas = respuesta.data.Search;
        var output = '';
        $.each(peliculas, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="peliSelect('${movie.imdbID}')" class="btn btn-success" href="#"> Detalles</a>
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
    var peliId = sessionStorage.getItem('peliId');
    axios.get('http://www.omdbapi.com?i='+peliId+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        var movie = respuesta.data;
        var output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Género:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Publicación:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Clasificación:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>Calificación IMDB:</strong> ${movie.imdbRating}</li>
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
                    <a href="index.html" class="btn btn-default">Inicio</a>
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

$(document).ready(() => {
    $('#buscadorid').on('submit', (e) => {
        var buscID = $('#buscID').val();
        getPelisID(buscID);
        e.preventDefault();
    });
});

function getPelisID(id){
    axios.get('https://www.omdbapi.com?i='+id+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        var movieID = respuesta.data;
        var output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movieID.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movieID.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Género:</strong> ${movieID.Genre}</li>
                        <li class="list-group-item"><strong>Publicación:</strong> ${movieID.Released}</li>
                        <li class="list-group-item"><strong>Clasificación:</strong> ${movieID.Rated}</li>
                        <li class="list-group-item"><strong>Calificación IMDB:</strong> ${movieID.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movieID.Director}</li>
                        <li class="list-group-item"><strong>Escritor:</strong> ${movieID.Writer}</li>
                        <li class="list-group-item"><strong>Actores:</strong> ${movieID.Actors}</li>
                        <li class="list-group-item"><strong>Código:</strong> ${movieID.imdbID}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Trama</h3>
                    ${movieID.Plot}
                </div>
            </div>
        `;
        $('#peliculasid').html(output);
    })
    .catch((err) =>{
        console.log(err);
    });
}

//id 813e50a8