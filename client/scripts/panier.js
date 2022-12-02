

function panier_to_html(item){
    items_panier = $('<div></div>')
            .addClass('row')
            .append('<p class="col">' + item.nomProduit + '</p>')
            .append('<p class="col">' + item.prix.toFixed(2) + '</p>')
            .append('<p id="id'+item.id+'" class="col">' + item.quantite + '</p>')
            .append('<p class="col">' + (item.prix * item.quantite).toFixed(2) + '</p>')
            .append('<hr/>');
    return items_panier;
}

function chargerpanier() {
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN);
        },
        success: function( result ) {
            console.log(result);
            $.each(result.items, function (key, value) {
                panier = panier_to_html(value);
                $('#list_panier').append(panier);
            });
            $('#totalFacture').append(
                '<h6>Total: '+ result.valeur.toFixed(2) + '</h6>');
        }
    });
}