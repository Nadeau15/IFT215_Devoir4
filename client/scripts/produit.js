function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qte dispo :' + item.qte_inventaire +'</li>')
        .append('<li>Categorie. :' + item.categorie.nom +'</li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>')
        .append(item_detail)
        .append(' <p class="card-text"> ' + item.description + '</p>');
    item_footer = $('<div style="text-align: center"></div>')
        .append('<p class="w-100 display-6 text-center">\n' +
            '<button type="button" class="btn btn-primary position-relative" onclick="add_item(' + item.id + ')">\n' +
            '<i class="bi bi-cart-plus"></i>\n' +
            '</button>\n' +
            '</p>');
    item_card.append(item_head).append(item_body).append(item_footer);
    return $('<div></div>').addClass('col-md-3').append(item_card);
}

function chargerproduit(){
    let ID_CLIENT = 1;
    let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";

    $('<div></div>').addClass('container mb-4 text-center');
    $.ajax({
        url: "/produits",
        success: function( result ) {
            console.log(result);
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
            $('#item_counter').append()
        }
    });

    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length);
        }
    });
}

function add_item(id_item){
    let ID_CLIENT = 1;
    let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length);
        }
    });
}

$(function () {
    console.log("ift215");
});