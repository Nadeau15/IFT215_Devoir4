function panier_to_html(item){
    items_panier = $('<div></div>')            
            .addClass('row')
            .append('<p class="col">' + item.nomProduit + '</p>')
            .append('<p class="col" id="prix' + item.id +'">' + item.prix + '</p>')
            .addClass('row')
            .append('<p class="col">'  + '</p>')                        
            .append('<p class="col">' + '<input type="button" id="'+ item.id +'" onclick="enleverItem('+ item.id +')" min="0" width= "10px;" value="-"' + item.quantite + '"/>' + '</p>')
            .append('<p class="col" id="qte'+ item.id +'">' + item.quantite + '</p>')
            .append('<p class="col">' + '<input type="button" id="'+ item.id +'" onclick="ajouterItem('+ item.id +')" min="0" width= "10px;" value="+"/>' + '</p>')
            .append('<p class="col" id="total'+ item.id +'">' + (item.prix * item.quantite).toFixed(2) +'</p>')            
            .append('<p class="col" id="bouton">'+ '<button type="button" id="retirer'+item.id+' "class="infoButton" onclick="retirerPanier('+item.id+')"><i class="fa-solid fa-xmark Close" aria-hidden=true"></i>'+'</button>')
            .append('<hr/>');            
    return items_panier;}

function retirerPanier(id) {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/1/panier/"+id,
        method: "DELETE",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
        },
        success: function( result ) {
            console.log(result);
            location.reload();            
            $('#totalFacture').append(
                '<h6>Total: '+ (result.valeur).toFixed(2) + '</h6>');
        }
    });
}

// Fonction desuete
function changeText(id){    
    
    var quantite = document.getElementById("qte" + id).value;
    var prix = document.getElementById("prix" + id).innerHTML;    
    var element = document.getElementById("total" + id).innerHTML = (quantite * prix).toFixed(2);
    // Mettre a jour le grand total en bas a droite  
     
    modifiePanier(id); 
}

function enleverItem(id) {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    
    var quantite = document.getElementById("qte" + id).innerHTML;

    if (quantite < 1) {
        quantite = 0;
        document.getElementById("qte" + id).innerHTML = quantite;
    }
    else {
        quantite = quantite - 1;
        document.getElementById("qte" + id).innerHTML = quantite;    
        
        // Ne fonctionne pas pour le input qte...
        var prix = document.getElementById("prix" + id).innerHTML;    
        var element = document.getElementById("total" + id).innerHTML = (quantite * prix).toFixed(2);   
        var grandTotal = document.getElementById("grandTotal").innerHTML;
        grandTotal = grandTotal - prix;

        document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);        
        
        $.ajax({
            url: "/clients/1/panier/"+id,
            method: "PUT",
            data:{'quantite':-1},
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
            },
            success: function( result ) {
                console.log(result);            
                //location.reload();                 
            }
    })};            
}

function ajouterItem(id) {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    
    var quantite = document.getElementById("qte" + id).innerHTML;

    quantite = parseInt(quantite) + 1;    
    document.getElementById("qte" + id).innerHTML = quantite;        
        
    // Ne fonctionne pas pour le input qte...
    var prix = document.getElementById("prix" + id).innerHTML;    
    var element = document.getElementById("total" + id).innerHTML = (parseInt(quantite) * prix).toFixed(2);   
    var grandTotal = document.getElementById("grandTotal").innerHTML;
    grandTotal = parseFloat(grandTotal) + parseFloat(prix);

    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
        
    $.ajax({
        url: "/clients/1/panier/"+id,
        method: "PUT",
        data:{'quantite':1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_PANIER);
        },
        success: function( result ) {
            console.log(result);            
            //location.reload();                 
        }
    });
}

function chargerpanier() {
    let TOKEN_PANIER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";
    $.ajax({
        url: "/clients/1/panier",
        method: "GET",
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
                '<h6>Total: <div id="grandTotal">'+ (result.valeur).toFixed(2) + '</div></h6>');
        }
    });
}