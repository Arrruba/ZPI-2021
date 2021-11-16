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

    var currentTime = new Date();
    var url = "http://localhost:9003/requests?isApproved=false&year=" + currentTime.getFullYear();
    console.log(url);

    id = 1;
    $.ajax(
        {
            url: url,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                var requests = results.requestList.reverse();

                var htmlc='';
                
                $.each(requests, function(key,item){
                    var descript = (item.description).substring(0,100);
                    if((item.description).length>=100)
                        descript +="...";
                    
                    var date = (item.dateSubmitted).substring(8,10) + '-' + (item.dateSubmitted).substring(5,7) + '-' + (item.dateSubmitted).substring(0,4);

                    htmlc += '<div id="element'+item.id+'" class="my-list-element" style="margin-top:2%;" onclick="location.href=\'request-details.html?id='+item.id+'\';">';
                    console.log('"location.href=\'request-details.html?id='+item.id+';"');
                    htmlc += '<table class="table my-tab-color w-100">';
                    htmlc += '<tbody id="tab-body">';
                        htmlc += '<tr><tr>';
                            htmlc += '<td id="row'+id+'-user" style="font-style:italic;">'+item.user.login+'</td>';                            
                            htmlc += '<td id="row'+id+'-date" style="font-style:italic; float:right;">'+date+'</td>';                          
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
