function geturl(url){
    queryString= url;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const orderNo = urlParams.get('orderNo')
    console.log(id);
    console.log(orderNo);

    if(id!=null){
    test4(id,orderNo);
    }else{
    console.log("null");
    }
    }
    var tr='';
    const database=firebase.firestore();
    const user=database.collection('Users');
    var tbody = document.getElementById('tbody');
    var tbody1 = document.getElementById('tbody1');
    
    function findUserByEmail1( id,orderNo,callBack, fallBack) {
        console.log(id);
        database.collection('Users').doc(id).collection('Orders')
        .get().then(function(result2) {
            var arr=[];
            console.log("skksaosa");
            result2.forEach(function(doc1){
                console.log("skksaosa");
                arr.push(doc1.data());
                 console.log(arr); // for test
            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });}
    
    
    function test4(id,orderNo) {
        findUserByEmail1(id,orderNo,function (arr) {
            // console.log(arr[0]['email']);
            var tr ='';
            var tr1='';
            var element='';
            var s=[];
          
            console.log(arr);
            database.collection("Users").doc(id).collection('Orders').get()
            .then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
             s.push(doc.id)
            })})

        
        for(let i=0;i<arr.length;i++){
        tr1 += "<tr><td>" + arr[i]['orderNo']+ "</td><td>" +arr[i]['orderState'] + "</td><td>" +arr[i]['orderTotalPrice'] + "</td><td>" +arr[i]['sellerID'] + "</td><td><form><div  style='width:200px;'><select  id='sel"+i+ "' ><option disabled selected hidden>Select State:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Cancelled</option></select></div> <br><br>"
        tr1+="<button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='getid"+i+ "' name='getid' >Change State</button></form></td></tr>";
         console.log(arr[i]['userInfo']['userID']);
         database.collection("Users").doc(id).collection('Orders').get()
         .then((querySnapshot) =>{
        
                 document.getElementById('getid'+i).value =s[i];
               
                document.getElementById("getid"+i).addEventListener("click",e=>{
                  //  console.log(document.getElementById('getid'+i));
                   // console.log(doc.id);
                    e.preventDefault();
                     if(document.getElementById("sel"+i).value==1){
                        console.log(document.getElementById('getid'+i).value);
                     database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                        orderState:"Pending"
                    }).then(()=>{ window.location.href = "get_user_order.html?id="+id })
                    .catch((error)=>{console.error(error)});
                }
                if(document.getElementById("sel"+i).value==2){
                    console.log(document.getElementById('getid'+i).value);
                    database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                        orderState:"Shipped"
                    }).then(()=>{ window.location.href = "get_user_order.html?id="+id })
                    .catch((error)=>{console.error(error)});
                }if(document.getElementById("sel"+i).value==3){
                    database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                        orderState:"Cancelled"
                    }).then(()=>{ window.location.href = "get_user_order.html?id="+id})
                    .catch((error)=>{console.error(error)});
                }
                })
            })
    
        
        }
         
        
    
      
    
    tbody1.innerHTML += tr1;
    tbody.innerHTML += tr;
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }
    // if(id!=null){
    // test4();
    // }else{
    //  console.log('null')
    // }
    geturl(window.location.search);
    var s=[];
    
      