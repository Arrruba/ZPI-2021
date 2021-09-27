window.onload= function onload(){
    var url_get_songs = "http://localhost:8080/get/topFiveScoresString";
    var id=1;
    var ini = 567;
    var count=0;
    $.ajax(
        {
            url: url_get_songs,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                var htmlc='<table class="table align-middle table-hover">'+
                '<thead >'+
                  '<tr>'+
                    '<th class="col1" scope="col">Numer na liście</th>'+
                    '<th class="col2" scope="col">Tytuł</th>'+
                    '<th class="col2" scope="col">Wykonawca</th>'+
                    '<th scope="col">Liczba odsłuchań</th>'+
                  '</tr>'+
                '</thead>'+
                '<tbody id="tab-body">';
                $.each(results, function(key,item){
                    var res_split = item.split(',');
                    if(count<5){
                        htmlc += '<tr>';
                        htmlc += '<td class="col1" scope="row">'+id+'.</td>';
                        htmlc += '<td class="col2" id="row'+id+'-title">'+res_split[0]+'</td>';
                        htmlc += '<td class="col2" id="row'+id+'-author">'+res_split[1]+'</td>';
                        htmlc += '<td class="col2" id="row'+id+'-stat">'+res_split[2]+'</td></tr>';
                        id++;
                       // ini = ini-7;
                    }
                    count++;
                });
                htmlc += '</tbody></table>';
                $("#tab").append((htmlc));

               // $('#tab-body').html(htmlc);
            }
        }
    );
}