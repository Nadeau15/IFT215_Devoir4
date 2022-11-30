function item_to_html(item){
    item_card = $('<div type="button" data-bs-toggle="modal" data-bs-target="#'+item.nom+'"></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3 headerItem')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>')
        .append('<button type="button" class="infoButton" data-bs-toggle="modal" data-bs-target="#'+item.nom+'">' + 
        '<i class="fa-solid fa-circle-info fa-xl"></i>'+
        '</button>' + 
        '<div class="modal fade" id="'+item.nom+'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<h1 class="modal-title fs-5" id="staticBackdropLabel">' + item.nom + '</h1>'+
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
      '</div>'+
      '<div class="modal-body">'+
        '<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; heigth: 130px"/></div>'+
        '<p>'+item.description+'</p>' +
        '<p>quantité disponible: '+item.qte_inventaire+'</p>'+
        '<p>catégorie: '+item.categorie.nom+'</p>'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>'+
        '<button type="button" class="btn btn-primary" onclick="add_item(' + item.id + ')">Ajouter au panier</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        //.append('<li>Qte dispo :' + item.qte_inventaire +'</li>')
        //.append('<li>Categorie :' + item.categorie.nom +'</li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append('<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; height:130px"/></div>')
        .append(' <h4 class="card-title text-center"> $' + item.prix +'</h4>')
        .append(item_detail)
        //.append(' <p class="card-text"> ' + item.description + '</p>');
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
            $('#item_counter').append();
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