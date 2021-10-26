
var count=0;

window.onload= function onload(){
    var url_get_songs = "http://localhost:9003/initiatives/getAll";
    var id=1;
    
    $.ajax(
        {
            url: url_get_songs,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                console.log(results);

                var htmlc='';
                
                $.each(results.initiativeList, function(key,item){
                    var descript = (item.description).substring(0,100);
                    if((item.description).length>=100)
                        descript +="...";

                    htmlc += '<div class="my-list-element" style="margin-top:2%;">';
                    htmlc += '<table class="table my-tab-color w-100">';
                    htmlc += '<tbody id="tab-body">';
                         htmlc += '<tr><tr>';
                             htmlc += '<td id="row'+id+'-title" style="font-weight:bold; font-size:1.25em;">'+item.title+'</td>';
                             htmlc += '<td id="row'+id+'-districtName" class="city-name-list" >'+item.district.name+'</td>';
                         htmlc += '</tr><tr>';
                             htmlc += '<td id="row'+id+'-description">'+descript+'</td>';
                        htmlc += '</tr>';
                    htmlc += '</tr>';
                    htmlc += '<tr></tr></tbody></table></div>';
                    console.log(item.title+","+item.description);
                    count++;
                    id++;
                });
                $("#list-section").append((htmlc));

               // $('#tab-body').html(htmlc);
            }
        }
    );
}

function randomSong(){
    count = $('#tab-body .col1').length;
    console.log(count);
    if(count>0){
        var rand = Math.ceil(Math.random() * (+count - +1)) + +1;
        var title = document.getElementById("row"+rand+"-title").innerHTML;
        var author = document.getElementById("row"+rand+"-author").innerHTML;
        location.href="game.html?title="+title+"&author="+author;
    }
    else{
        window.alert("Brak piosenek - nie udało się wylosować :/");
    }
}