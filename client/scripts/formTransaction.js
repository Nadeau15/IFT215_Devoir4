function transaction_to_html(panier){
    item_affiche = $('<div></div>')
    .addClass('row')
    .append('<p class="col">' + panier.nomProduit + '</p>')
    .append('<p id="id'+panier.id+'" class="col">x' + panier.quantite + '</p>')
    .append('<p class="col">$' + panier.prix.toFixed(2) + '</p>')
    .append('<hr/>');
    return item_affiche;
}

function chargertransaction() {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/1/panier",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
        },
        success: function( result ) {
            $.each(result.items, function (key, value) {
                panier = transaction_to_html(value);
                $('#panier').append(panier);
            });
            $('#totalFacture').append(
                '<h6>Total: '+ result.valeur.toFixed(2) + '</h6>');
            $('#qteItem').text(result.items.length);
            $('#confirmationButtons').append('<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non</button>'+
            '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="envoyerCommande()">Oui</button>');
        }
    });
}

function envoyerCommande(){
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY2OTk5MjQ5MywiZXhwIjoxNjY5OTk5NjkzfQ.w-12aWe0WrxXVo_z070X0pYcyAc5tVhOQpW2gD5jiiA";
    $.ajax({
        url: "/ventes",
        method: "POST",
        body: JSON.stringify({
            "idClient": 1
        }),
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
        },
        success: function( result ) {
            console.log(allllllooooo);
        }
    });
}