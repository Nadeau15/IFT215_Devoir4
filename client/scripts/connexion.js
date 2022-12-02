let TOKEN = -1;
let ID_CLIENT = -1;

function connexion(){
    let COURRIEL = document.getElementById("courriel").value;
    let MDP =document.getElementById("mot-de-passe").value;
    console.log(COURRIEL + MDP);
    $.ajax({
        url: "/connexion",
        method:"POST",
        data: {"courriel": COURRIEL, "mdp": MDP},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "No Auth");
        },
        success: function(result){
            console.log(result);
            TOKEN = result.token;
            ID_CLIENT = result.idClient;

            window.location.href ='#/';
        },
    });
}
