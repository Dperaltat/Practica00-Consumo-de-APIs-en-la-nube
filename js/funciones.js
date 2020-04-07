$(document).ready(() => {
    $('#buscador').on('submit', (e) => {
        let buscTXT = $('#buscTXT').val();
        getPelis(buscTXT);
        e.preventDefault();
    });
});

function getPelis(buscTXT){
    axios.get('https://www.omdbapi.com?s='+buscTXT+"&apikey=813e50a8")
    .then((respuesta) => {
        console.log(respuesta);
        let peliculas = respuesta.data.Search;
        let output = '';
        $.each(peliculas, ( index, movie) => {
            output += ` 
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#"> Detalles de la Película</a>
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

//id 813e50a8