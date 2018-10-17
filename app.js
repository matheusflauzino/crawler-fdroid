$(document).ready(function () {


    dados = [];
    langua = "";

    count = 0;

    $.ajax({
        url : '/languages.json',
        type: 'get',
        dataType : 'json'
    }).done(function (links) {

        // links.forEach(function (link) {
        //     console.log(link);
        //     $.ajax({
        //         url : link,
        //         type: 'get',
        //         dataType : 'json'
        //     }).done(function (result) {
        //         console.log(result);
        //     })
        //
        //
        // })

        // console.log(links.length);

        // console.log(links);

        for(var i = 0; i < links.length; i++)
        {




            $.ajax({
                url : links[i] + '?client_id=df980e9eafe017a6552a&client_secret=c088af81d772840eabd4a3fe1a67b3c9d1dfe51e',
                type: 'get',
                dataType : 'json',
                async : false

            }).done(function (result) {

                // console.log(result);

                // if(result.Kotlin != undefined) {
                if(true){
                    var total = 0;


                    for(var language in result) {
                        console.log(result[language]);

                        if(language != "Kotlin" && language != "Java") {
                            total += result[language];
                        }
                    }


                    var newRow = $("<tr>");
                    var cols = "";
                    cols += '<td>' + count + '</td>';
                    cols += '<td>' + links[count] + '</td>';
                    cols += '<td>' + (result.Kotlin == undefined ? 0 : result.Kotlin) + '</td>';
                    cols += '<td>' + (result.Java == undefined ? 0 : result.Java) + '</td>';
                    cols += '<td>' + total + '</td>';

                    newRow.append(cols);
                    $("#products-table").append(newRow);

                }



                dados[count] = result;
                count++;
            });
        }

        console.log(dados);

        //console.log(links[0]);
        //?client_id=df980e9eafe017a6552a&client_secret=c088af81d772840eabd4a3fe1a67b3c9d1dfe51e
    });




    // $('body').append(JSON.stringify(dados))

    // $('body').append(JSON.parse(dados) + ',<br />');



});
