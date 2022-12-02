let ID_CLIENT = -1

function versCommande(){
    // let COURRIEL = document.getElementById("courriel").value;
    // let MDP =document.getElementById("mot-de-passe").value;

    $.ajax({
        url: "/client/" + ID_CLIENT + "/panier",
        method:"POST",
        // data:JSON.stringify({"courriel":COURRIEL,"mdp":MDP}),
        contentType: "application/json",
        success: function(result){
            // TOKEN_CLIENT = result.token;
            // TOKEN_ADMIN = result.token;
            // ID_CLIENT = result.idClient;

            window.location.replace('#/accueil')


            // if(result.role === 'admin'){
            // }
            // else{
            //     window.location.replace('#/')
            // }
        },
        // error: function (result) {
        //      document.getElementById(`error`).setAttribute("style","display:block")
        // }
    });
}
