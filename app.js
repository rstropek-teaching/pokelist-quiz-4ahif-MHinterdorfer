var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(function () {
    $('.pokedetails').hide();
    listPokemons();
    $('#nextButton').click(function () {
        nextButton();
    });
    $('#previousButton').click(function () {
        previousButton();
    });
    $('#goBack').click(function () {
        goBack();
    });
});
let offset = 0;
function listPokemons() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pokelist = yield $.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + offset);
            let html = '';
            for (const pokemon of pokelist.results) {
                html += `<tr> <td> ${pokemon.name} </td> <td> <button type="button" onclick="listDetails('${pokemon.url}')">Details</button> </td> </tr>`;
            }
            $('#resultBody')[0].innerHTML = html;
        });
    })();
}
function listDetails(url) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pokemonDetails = yield $.get(url);
            let html = '';
            html += `<tr><td>Name:</td> <td> ${pokemonDetails.name} </td> </tr>`;
            html += `<tr><td>Image:</td> <td><img src="${pokemonDetails.sprites.front_default}"</td></tr>`;
            html += `<tr><td>Weight:</td> <td>${pokemonDetails.weight}</td></tr>`;
            html += `<tr><td>Abilities:</td> <td> <ul>`;
            for (const ability of pokemonDetails.abilities) {
                html += `<li> ${ability.ability.name} </li>`;
            }
            html += `</ul></td></tr>`;
            $('#detailBody')[0].innerHTML = html;
            $('.pokelist').hide();
            $('.pokedetails').show();
        });
    })();
}
function nextButton() {
    offset += 20;
    listPokemons();
}
function previousButton() {
    if (offset >= 20) {
        offset -= 20;
    }
    listPokemons();
}
function goBack() {
    $('.pokedetails').hide();
    $('.pokelist').show();
}
