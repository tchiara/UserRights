var userTab = new Array(); // tableau pour s�lectionner le nom de l'utilisateur en fonction de la cl� primaire (58 i�i)

var rightsTab = new Array(); // tableau pour r�cup�rer les droits par table
var tableTab = new Array(); // tableau pour r�cup�rer les tables
var myTrad = new Array(); // tableau pour afficher le nom de la table en fonction de son num�ro


$(function () {

    $('#lecture').on('click', function () {

        // Amélioration CSS/mise en forme des données
        $('#zone2').css('min-width', '250px');
        $('#zone2').css('border', '4px black solid');
        $('#zone3').css('min-width', '300px;');
        $('#zone3').css('box-shadow', '8px 8px 4px black');
        $('#zone3').css('border', '4px black solid');



        // Affichage du nom de l'utilisateur
        $.getJSON('acc_accounts.json', function (data) {    // méthode Ajax assimilé

            $.each(data, function (index, d) {

                userTab[d.k_user] = d.fullname; // pour rechercher le nom de l'user 58 par exemple

                if (d.k_user == 58) {

                    $('#zone1').append('<BR>Utilisateur :' + userTab['58'] + '<BR><BR>TABLES : <span class="espace"> DROITS : </span><BR><BR>');
                }


            });
        });


        // Enregistrement des droits
        $.getJSON('acc_rights.json', function (data) {

            $.each(data, function (index, d) {

                rightsTab [d.k_table] = d.rights;


            });

        });

        // Affichage des tables + équivalence (numéro-nom) et les droits par table de l'user
        $.getJSON('sys_tables.json', function (data) {

            $.each(data, function (index, d) {

                myTrad[d.k_table] = d.name;

                // on affiche le nom de la table
                $('#zone2').append(d.name + '<br>');

                // On fait la conversion "droit binaire" en "droit compr�hensible"
                var rightsConv; // initialisation du terme compréhensible
                if (rightsTab[d.k_table] > 1038) {
                    rightsTab[d.k_table] = 1038; // 1038 est la somme maximal de tous les droits donc au del� de 1038 l'user � tous les droits
                }
                switch (rightsTab[d.k_table]) {
                    case 2:
                        rightsConv = 'Afficher';
                        break;
                    case 4:
                        rightsConv = 'Modifier';
                        break;
                    case 6:
                        rightsConv = 'Afficher/Modifier';
                        break;
                    case 8:
                        rightsConv = 'Supprimer';
                        break;
                    case 10:
                        rightsConv = 'Afficher/Supprimer';
                        break;
                    case 12:
                        rightsConv = 'Modifier/Supprimer';
                        break;
                    case 1024:
                        rightsConv = 'AJouter';
                        break;
                    case 1026:
                        rightsConv = 'Afficher/AJouter';
                        break;
                    case 1028:
                        rightsConv = 'Modifier/AJouter';
                        break;
                    case 1032:
                        rightsConv = 'Supprimer/AJouter';
                        break;
                    case 1030:
                        rightsConv = 'Afficher/Modifier/AJouter';
                        break;

                    case 1036:
                        rightsConv = 'Afficher/Supprimer/AJouter';
                        break;

                    case 1038:
                        rightsConv = 'Afficher/Modifier/Supprimer/AJouter';
                        break;
                    default:
                        rightsConv = 'Aucuns droits';
                }

                // on affiche les droits de l'user dans la table :
                $('#zone3').append(rightsConv + '<br>');

            });

        });



    });
}
)
        ;
