/**
 *
 * @param {Vente} vente
 * @param {Client} client
 * @returns
 */
function vente_to_html(vente, client) {
  if (vente.status == "prepare") {couleur = "aqua"; etat = "Prête à l'envoi"}
    if (vente.status == "en_route") {couleur = "yellow";etat = "En route"}
    if (vente.status == "livree") {couleur = "green";etat = "Livré"}
    if (vente.status == "reçue"){couleur = "hotpink";etat = "Reçue"}
  const vente_html = $(`<div class="card my-3 mb4-rounded-3 shadow-sm">
    <div class="card-header py-3">
      <div class="row">
        <h4 class="my-0 fw-normal col">Commande No.${vente.id}</h4>
        <label class="col status" style="background-color:${couleur};" ><h5>${etat}</h5></label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row" style="margin-left: 1rem" id="list_venteProd_${vente.id}">
          ${vente.produits.map(produit => {
            return `  ${produit.quantite}x ${produit.nomProduit}`;
          })}
        </div>
        <div class="row montantVente"><h6 class="montantVente1">Montant: ${vente.montant}$</h6></div>
      </div>
      <div class="col" id="list_userInfo">
        <div class="row">
          <h6>En date du : ${new Date(vente.date).toLocaleString('fr-CA')}</h6>
        </div>
        <div class="row">
          <div class="col" id="informationClient">
            <h6>Nom : ${client.prenom} ${client.nom}</h6>
            <h6>Adr: ${client.adresse}, ${client.pays}</h6>
          </div>
        </div>
        <div style="text-align:right;">
          <input type="button" value="Prêt" class="btn btn-secondary ready" data-bs-toggle="modal" data-bs-target="#description"></button>
          <div class="modal fade" id="description" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div class="modal-body">
                                <p class="center">
                                    Commande prête à l'envoi?
                                </p>
                            </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="commandePrete(${vente.id})">Confirmer</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Retour</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  `);

  return vente_html;
}

function commandePrete(idVente){
  $.ajax({
    url: '/ventes/'+ idVente,
    method: "PUT",
    data:JSON.stringify({ "status": "prepare" }),
    
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Basic ' + TOKEN);
    },
    success: function (result) {
        chargervente();
    },
  });
}

function venteProd_to_html(produits) {
  produits.forEach(produit => {
    console.log(produit);
    vente_body = $('<div></div>').append(
      `<div class="">
                    <h6 class="col">` +
        produit.nomProduit +
        ` </h6>
                    <h6 class="col">` +
        produit.quantite +
        ` </h6>
                 </div>
        `
    );
  });
  return vente_body;
}

function chargervente() {
  $.ajax({
    url: '/ventes',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + TOKEN);
    },
    success: function (result) {
      console.table(result);
      $.each(result, function (key, value) {
        $.ajax({
          url: '/clients/' + value.idClient,
          method: 'GET',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + TOKEN);
          },
          success: function (result) {
            client = result;
            vente = vente_to_html(value, client);
            $('#list_ventes').append(vente);
          },
        });
      });
    },
  });
}
