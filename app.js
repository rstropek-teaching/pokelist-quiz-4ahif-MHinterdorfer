var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let offset = 0;
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
function listPokemons() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pokelist = yield $.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + offset);
            let html = '';
            for (const pokemon of pokelist.results) {
                html += `<tr> <td> ${pokemon.name} </td> <td> <button class="btn btn-info" type="button" onclick="listDetails('${pokemon.url}')">Details</button> </td> </tr>`;
            }
            $('#resultBody')[0].innerHTML = html;
            document.documentElement.scrollTop = 0; //Jump on top of the page
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
            html += `<tr><td>Abilities:</td> <td>`;
            for (const ability of pokemonDetails.abilities) {
                html += `${ability.ability.name} <br>`;
            }
            html += `</td></tr>`;
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
