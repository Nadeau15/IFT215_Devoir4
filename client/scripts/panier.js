

function panier_to_html(item){
    items_panier = $('<div></div>')
            .addClass('row')
            .append('<p class="col">' + item.nomProduit + '</p>')
            .append('<p class="col">' + item.prix + '</p>')
            .append('<p class="col">' + item.quantite + '</p>')
            .append('<p class="col">' + item.prix * item.quantite + '</p>')
            .append('<hr/>');
    return items_panier;
}

function chargerpanier() {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/1/panier",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
        },
        success: function( result ) {
            console.log(result);
            $.each(result.items, function (key, value) {
                panier = panier_to_html(value);
                $('#list_panier').append(panier);
            });
            $('#totalFacture').append(
                '<h6>Total: '+ result.valeur + '</h6>');
        }
    });
}