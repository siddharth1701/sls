function geturl(url){
queryString= url;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);
if(id!=null){
test4(id);
}else{
console.log("null");
}
}
var tr='';
const database=firebase.firestore();
const user=database.collection('Users');
var tbody = document.getElementById('tbody');
var tbody1 = document.getElementById('tbody1');



// user.doc(id).collection('Orders').get().
// then(function(result2) {
//     console.log(result2);
//     console.log("jdksdjkj");
//     result2.forEach(function(doc2) {
        
//     console.log(doc2.id); 
//    // console.log(doc2.data().orderNo);               
//      // x.push(doc2.data())
//     tr += "<tr><td>" + doc2.data().orderNo+ "</td><td>" +doc2.data().orderState + "</td><td>" +doc2.data().orderTotalPrice+ "</td>"
//     tr+="<td><form><div  style='width:200px;'><select id='sel'><option value='0'>Select car:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Cancelled</option></select></div> <br><br>"
//     tr+="<button type='submit' style='text-align:center;' class='btn btn-danger' value='"+ doc2.id+"'  id='delete"+i+ "' name='delete' >Change State</button></form></td></tr>";
//   console.log(tr);
//     })
//     tbody.innerHTML += tr;
// })


function findUserByEmail1( id,callBack, fallBack) {
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


function test4(id) {
    findUserByEmail1(id,function (arr) {
        // console.log(arr[0]['email']);
        var tr ='';
        var tr1='';
        var element='';
        var s=[];
        var n=[];
        console.log(arr);
        database.collection("Users").doc(id).collection('Orders').get()
        .then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
         s.push(doc.id)
        })})
        for (let i = 0; i < arr.length; i++) {   
            if(arr[i]['userInfo']['userID']!=''){ 
        tr += "<tr><td>" + arr[i]['userInfo']['userID']+ "</td><td>" +arr[i]['userInfo']['shippingAddress'] + "</td><td>" +arr[i]['userInfo']['userName'] + "</td><td>" +arr[i]['orderNo'] + "</td><td><a id='getid"+i+ "' href=''>get all user info</a></td></tr>";
    console.log(arr[i]['userInfo']['userID']);
//     database.collection("Users").doc(arr[i]['userInfo']['userID']).collection('Orders').get()
//      .then((querySnapshot) =>{
//         querySnapshot.forEach((doc) => {
//      n.push(doc.id);
//      })})
//      console.log(n)
// database.collection("Users").where().collection('Orders').get()
// .then((querySnapshot) =>{
// querySnapshot.forEach((doc) => {
//  //   console.log(doc.data().orderNo)
 
// console.log(document.getElementById('getid'+i));
   
// const database=firebase.firestore();
//    // element=doc.id;
//     document.getElementById("getid"+i).addEventListener("click",e=>{
     
//     console.log(doc.id);
//     e.preventDefault();
//     document.getElementById("getid"+i).href="get_user_info.html?id="+doc.id;
//     console.log(document.getElementById("getid"+i));
//    // window.location.href = "get_user_info.html?id="+doc.id
     
// })
 
// })
//})
database.collection("Users").get()
.then((querySnapshot) =>{
    querySnapshot.forEach((doc) => {
        if(doc.id==arr[i]['userInfo']['userID']){
            //const database=firebase.firestore();
            // element=doc.id;
             document.getElementById("getid"+i).addEventListener("click",e=>{
              
             console.log(arr[i]['orderNo']);
             e.preventDefault();
             document.getElementById("getid"+i).href="get_user_info.html?id="+doc.id+"&orderNo="+arr[i]['orderNo'];
             console.log(document.getElementById("getid"+i));
            window.location.href = "get_user_info.html?id="+doc.id+"&orderNo="+arr[i]['orderNo']
            
         })
        }
    })
})
 }
    else{
    tr1 += "<tr><td>" + arr[i]['orderNo']+ "</td><td>" +arr[i]['orderState'] + "</td><td>" +arr[i]['orderTotalPrice'] + "</td><td>" +arr[i]['sellerID'] + "</td><td><form><div  style='width:200px;'><select  id='sel"+i+ "' ><option disabled selected hidden>Select State:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Cancelled</option></select></div> <br><br>"
    tr1+="<button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='getid"+i+ "' name='getid' >Change State</button></form></td></tr>";
     console.log(arr[i]['userInfo']['userID']);}
   
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

  