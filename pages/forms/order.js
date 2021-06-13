const database=firebase.firestore();
const user=database.collection('Users');
//var alovelaceDocumentRef = db.collection('Users').doc('Orders');
var arr=[];
var x=[];
var tr ='';
var element='';
var tbody = document.getElementById('tbody');
function getId(){
user.get()
        .then(function(result) {
            result.forEach(function(doc) {
                arr.push(doc.id);
               
            });
       // console.log(arr);
        for(let i=0;i<=2;i++){
        user.doc(arr[i]).collection('Orders').get().
        then(function(result2) {
            result2.forEach(function(doc2) {
           // console.log(doc2.id); 
           // console.log(doc2.data().orderNo);               
              x.push(doc2.data())
            tr += "<tr><td>" + doc2.data().orderNo+ "</td><td>" +doc2.data().orderState + "</td><td>" +doc2.data().orderTotalPrice+ "</td>"
            tr+="<td><form><div  style='width:200px;'><select id='sel'><option value='0'>Select car:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Cancelled</option></select></div> <br><br>"
            tr+="<button type='submit' style='text-align:center;' class='btn btn-danger' value='"+ doc2.id+"'  id='delete"+i+ "' name='delete' >Change State</button></form></td></tr>";
          console.log(tr);
        //   database.collection("Users").get()
        //   .then((querySnapshot) =>{
        //   querySnapshot.forEach((doc) => {
          document.getElementById('delete'+i).value =doc2.id;
          document.getElementById("delete"+i).addEventListener("click",e=>{
              e.preventDefault();
              console.log("dshdsdhshds");
         user.doc(doc.id).collection('Orders').doc("a90f23d7-dcd8-45df-9a4f-a546eb3f678c").update({
        orderState:"Shipped"
    });
 })
// })})
            //     document.getElementById("delete"+i).addEventListener("click",e=>{
        //         console.log("ddklfjarjk");
        //         e.preventDefault();
        //        if(document.getElementById("sel").value=="1"){
        //            console.log("dssdfjkdallllad");
                  
        //         user.doc("5etPvedlbRRj5U4oau094qlCONi2").collection('Orders').doc(document.getElementById('delete'+i).value).update({
        //             orderState:"Pending"
        //         }).then(()=>{ window.location.href = "orders.html"; })
        //         .catch((error)=>{console.error(error)});
        //     }
        //     if(document.getElementById("sel").value=="2"){
        //         user.doc("5etPvedlbRRj5U4oau094qlCONi2").collection('Orders').doc(document.getElementById('delete'+i).value).update({
        //             orderState:"Shipped"
        //         }).then(()=>{ window.location.href = "orders.html"; })
        //         .catch((error)=>{console.error(error)});
        //     } if(document.getElementById("sel").value=="3"){
        //         user.doc("5etPvedlbRRj5U4oau094qlCONi2").collection('Orders').doc(document.getElementById('delete'+i).value).update({
        //             orderState:"Cancelled"
        //         }).then(()=>{ window.location.href = "orders.html"; })
        //         .catch((error)=>{console.error(error)});
        //     }
        //     }) 
               });
         tbody.innerHTML += tr;
        })
         }//end for
         });
    }
    getId()   
  
    // user.doc("5etPvedlbRRj5U4oau094qlCONi2").collection('Orders').doc("a90f23d7-dcd8-45df-9a4f-a546eb3f678c").update({
    //     orderState:"Pending"
    // });
