$(document).ready(function(){
    (async function (){
        const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/');

        let html = '';
        for(const pokemon of pokelist.results){
            html += `<tr> <th> ${pokemon.name} </th></tr>`
        }

        $('#resultBody')[0].innerHTML = html;
    })();
});  