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
        .append('<i class="fa-solid fa-cart-plus fa-3x" style="padding-bottom: 1rem"></i>');
    item_card.append(item_head).append(item_body).append(item_footer);
    return $('<div></div>').addClass('col-md-3').append(item_card);
}

function chargerproduit(){
    $('#list_items').append('<p> Ceci est un paragraphe avec jQuery</p>');
    $('<div></div>').addClass('card mb-4 text-center');
    $.ajax({
        url: "/produits",
        success: function( result ) {
            console.log(result);
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    });
}

$(function () {
    console.log("ift215");
});