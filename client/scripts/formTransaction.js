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
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN);
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
            '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="envoyerCommande()">Oui</button>')
        }
    });
}

function envoyerCommande(result){
    $.ajax({
        url: "/ventes",
        method: "POST",
        data: JSON.stringify({ idClient: ID_CLIENT }),
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic " + TOKEN);
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: function(total){
            chargertransaction();
            $('#panier').append(panier);
            document.getElementById("panier").innerHTML = "";
            document.getElementById("totalFacture").innerHTML = "";
        },

    });
}