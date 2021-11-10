window.onload= function  onload(){
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
        console.log('x');
        console.log(loggedInUser);
        document.getElementById('content').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
    } else {
        console.log('no user');
        document.getElementById('content').style.display = 'none';
        document.getElementById('signIn').style.display = 'block';
    }

    var url = "http://localhost:9003/requests?user=" + loggedInUser['login'];
    console.log(url);

    id = 1;
    $.ajax(
        {
            url: url,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                console.log(results);

                var htmlc='';
                
                $.each(results.requestList, function(key,item){
                    var descript = (item.description).substring(0,100);
                    if((item.description).length>=100)
                        descript +="...";

                    htmlc += '<div id="element'+item.id+'" class="my-list-element" style="margin-top:2%;" onclick="location.href=\'request-details.html?id='+item.id+'\';">';
                    console.log('"location.href=\'request-details.html?id='+item.id+';"');
                    htmlc += '<table class="table my-tab-color w-100">';
                    htmlc += '<tbody id="tab-body">';
                        htmlc += '<tr><tr>';
                            var is_approved = (item.isApproved === true) ? 'Zaakceptoway' : 'Czeka na akceptację';
                            htmlc += '<td id="row'+id+'-is-approved" style="font-style:italic;">'+is_approved+'</td>';                            
                        htmlc += '</tr><tr>';
                            htmlc += '<td style="font-size:0.25em; display:none;">'+item.id+'</td>';
                            htmlc += '<td id="row'+id+'-title" style="font-weight:bold; font-size:1.25em;">'+item.title+'</td>';
                            htmlc += '<td id="row'+id+'-cost" style="font-weight:bold; float:right;">'+item.cost+' zł</td>';
                        htmlc += '</tr><tr>';
                            htmlc += '<td id="row'+id+'-description">'+descript+'</td>';
                        htmlc += '</tr>';
                    htmlc += '</tr>';
                    htmlc += '<tr></tr></tbody></table></div>';
                    console.log(item.title+","+item.description);
                    id++;
                });
                $("#list-section").append((htmlc));
            }
        }
    );
}
