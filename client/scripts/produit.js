function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3 headerItem')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>')
        .append('<button type="button" id="info'+item.id+'" class="infoButton" data-bs-toggle="modal" data-bs-target="#'+item.nom+'" onclick="editPopup('+item.id+', '+item.qte_inventaire+')">' + 
        '<i class="fa-solid fa-circle-info fa-xl"></i>'+
        '</button>' + 
        '<div class="modal fade" id="'+item.nom+'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<h1 class="modal-title fs-5" id="staticBackdropLabel">' + item.nom + '</h1>'+
        //'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
      '</div>'+
      '<div class="modal-body">'+
        '<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; heigth: 130px"/></div>'+
        '<p>'+item.description+'</p>' +
        '<p>Catégorie: '+item.categorie.nom+'</p>'+
        '<div style="display:inline-flex">'+
            '<p id="itemQte'+ item.id+'" style="padding-right:5px;">Quantité disponible: </p>'+
            '<p id="qte'+item.id+'">'+item.qte_inventaire+'</p>'+
        '</div>'+
      '</div>'+
      '<div id="alert'+item.id+'" class="alert alert-success alert-dismissable">'+
        'Success! message sent successfully.'+
        '<button type="button" class="infoButton" onclick="closeAlert('+item.id+')">'+
            '<i class="fa-solid fa-xmark Close" aria-hidden="true"></i>'+
      '</button>'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeAlert('+item.id+')">Fermer</button>'+
        '<button id="'+item.id+'" type="button" class="btn btn-primary" onclick="add_item('+item.id +','+item.qte_inventaire+')">Ajouter au panier</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li id="itemQteCard'+item.id+'"><br/></li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append('<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; height:130px"/></div>')
        .append(' <h4 class="card-title text-center"> $' + item.prix +'</h4>')
        .append(item_detail)
        //.append(' <p class="card-text"> ' + item.description + '</p>');
    item_footer = $('<div style="text-align: center"></div>')
        .append('<p class="w-100 display-6 text-center">\n' +
            '<button id="cardPanierBtn'+item.id+'" type="button" class="btn btn-primary position-relative" onclick="add_item(' + item.id + ')">\n' +
            '<i class="bi bi-cart-plus"></i>\n' +
            '</button>\n' +
            '</p>');
      
    item_card.append(item_head).append(item_body).append(item_footer);
    return $('<div></div>').addClass('col-md-3').append(item_card);
}

function searchItem_to_html(item){
    item_card = $('<div id="previous"></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3 headerItem')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>')
        .append('<button type="button" class="infoButton" data-bs-toggle="modal" data-bs-target="#'+item.nom+'" onclick="editPopup('+item.id+', '+item.qte_inventaire+')">' + 
        '<i class="fa-solid fa-circle-info fa-xl"></i>'+
        '</button>' +
        '<div class="modal fade" id="'+item.nom+'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<h1 class="modal-title fs-5" id="staticBackdropLabel">' + item.nom + '</h1>'+
        //'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
      '</div>'+
      '<div class="modal-body">'+
        '<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; heigth: 130px"/></div>'+
        '<p>'+item.description+'</p>' +
        '<p>Catégorie: '+item.categorie.nom+'</p>'+
        '<div style="display:inline-flex">'+
            '<p id="itemQte'+ item.id+'" style="padding-right:5px;">Quantité disponible: </p>'+
            '<p id="qte'+item.id+'">'+item.qte_inventaire+'</p>'+
        '</div>'+
      '</div>'+
      '<div id="alert'+item.id+'" class="alert alert-success alert-dismissable">'+
        'Success! message sent successfully.'+
        '<button type="button" class="infoButton" onclick="closeAlert('+item.id+')">'+
            '<i class="fa-solid fa-xmark Close" aria-hidden="true"></i>'+
      '</button>'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeAlert('+item.id+')">Fermer</button>'+
        '<button id="'+item.id+'" type="button" class="btn btn-primary" onclick="add_item('+item.id +','+item.qte_inventaire+')">Ajouter au panier</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li id="itemQteCard'+item.id+'"><br/></li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append('<div class="productImg"><img src="images/'+item.nom+'.jpg" style="width: 130px; height:130px"/></div>')
        .append(' <h4 class="card-title text-center"> $' + item.prix +'</h4>')
        .append(item_detail);
        //.append(' <p class="card-text"> ' + item.description + '</p>');
    item_footer = $('<div style="text-align: center"></div>')
        .append('<p class="w-100 display-6 text-center">\n' +
            '<button id="cardPanierBtn'+item.id+'" type="button" class="btn btn-primary position-relative" onclick="add_item(' + item.id + ')">\n' +
            '<i class="bi bi-cart-plus"></i>\n' +
            '</button>\n' +
            '</p>');
      
    item_card.append(item_head).append(item_body).append(item_footer);
    return $('<div></div>').addClass('col-md-3').append(item_card);
}

function editPopup(id, qte){
    if(qte == 0){
        document.getElementById(id).disabled = true;
        document.getElementById("itemQte"+id).style.color = "orangered";
        document.getElementById("itemQte"+id).innerHTML = "Stock épuisé";
        document.getElementById("qte"+id).innerHTML = "";
     }
    //else{
    //     document.getElementById(id).disabled = false;
    //     document.getElementById("itemQte"+id).style.color = "";
    //     document.getElementById("itemQte"+id).innerHTML = "Quantité disponible: "+qte;
    // }
}

function closeAlert(id){
    $("#alert"+id).fadeTo(0, 500).slideUp(500, function(){
        $("#alert"+id).slideUp(500);
    });
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
                console.log(value);
                $('#list_items').append(item);

                if(value.qte_inventaire == 0){
                    document.getElementById("itemQteCard"+value.id).innerHTML = "Stock épuisé";
                    document.getElementById("itemQteCard"+value.id).style.color = "orangered";
                    document.getElementById("itemQteCard"+value.id).style.textAlign = "center";
                    document.getElementById("cardPanierBtn"+value.id).disabled = true;
                }
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

function submit(event){
    if(event.code == "Enter") {
        submitted();
    }
}

function submitted() {
    let search = document.getElementById('search');
    console.log(search.value);
    if(search.value == ""){
        document.getElementById("list_items").style.display = "";
        document.getElementById("searched_items").style.display = "none";
        $('#previous').remove();
        return;
    }
    $('#previous').remove();
    $.ajax({
            url: "/produits?nom="+search.value,
            method: "GET",
            success: function( result ) {
                console.log(result);
                $.each(result, function (key, value) {
                    document.getElementById("searched_items").style.display = "";
                    item = searchItem_to_html(value);
                    $('#searched_items').append(item);
                    document.getElementById("list_items").style.display = "none";

                    if(value.qte_inventaire == 0){
                        document.getElementById("itemQteCard"+value.id).innerHTML = "Stock épuisé";
                        document.getElementById("itemQteCard"+value.id).style.color = "orangered";
                        document.getElementById("itemQteCard"+value.id).style.textAlign = "center";
                        document.getElementById("cardPanierBtn"+value.id).disabled = true;
                    }
                });
            },
        });
  }

function add_item(id, qte){
    let ID_CLIENT = 1;
    let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length);
            if(qte-1 == 0){
                document.getElementById("itemQteCard"+id).innerHTML = "Stock épuisé";
                document.getElementById("itemQteCard"+id).style.color = "orangered";
                document.getElementById("itemQteCard"+id).style.textAlign = "center";
                document.getElementById("cardPanierBtn"+id).disabled = true;
            }
            $("#alert"+id).hide().show('medium');
            current_qty = document.getElementById("qte"+id).innerHTML;
            document.getElementById("qte"+id).innerHTML = current_qty-1;
        }
    });
}

$(function () {
    console.log("ift215");
});