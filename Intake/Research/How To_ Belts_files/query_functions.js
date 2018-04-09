/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Intial data get
//get pitch off page
function intial_get(){
    
    this.inputpitch = $("#pitchselect :selected").text();
    //get nteeth off page
    this.p1t = $("#Pulley1teeth").val();
    this.p2t = $("#Pulley2teeth").val();
    //add manual input if nessacary
    if (this.p1t==="Other"){
        if ($("#Pulley1other").length===0){
            $("#otherp1").empty();
            $("#otherp1").append("<label class='calclabels' for='Pulley1other'>Please Specify</label>");
            $("#otherp1").append("<input class='userinput' id='Pulley1other' value='15'>");
            
        }
        this.p1t = $("#Pulley1other").val();
    }
    else{
        $("#otherp1").empty();
    }
    if (this.p2t==="Other"){
        if ($("#Pulley2other").length===0){
            $("#otherp2").empty();
            $("#otherp2").append("<label class='calclabels' for='Pulley2other'>Please Specify</label>");
            $("#otherp2").append("<input class='userinput' id='Pulley2other' value='32'>");
            
        }
        this.p2t = $("#Pulley2other").val();
    }
    else{
        $("#otherp2").empty();
    }
    //get centers off page
    this.dcenter = $("#DesiredCenter").val();
    this.cadd = parseFloat($("#CenterAdd").val());
    }
       
function setpulleyspecs(P1pd,P1od,P2pd,P2od,Ratio){
    
    $("#Pulley1PD").val(P1pd.toFixed(rnd));
    $("#Pulley1OD").val(P1od.toFixed(rnd));
    $("#Pulley2PD").val(P2pd.toFixed(rnd));
    $("#Pulley2OD").val(P2od.toFixed(rnd));
    $("#Ratio").val(Ratio.toFixed(rnd));
    
}

function setcenterspecs(alinks,blinks,acenter,bcenter){
    $("#Upperbeltteeth").val(alinks);
    $("#Lowerbeltteeth").val(blinks);
    if (acenter==="N/A"){
         $("#UpperbeltC").val(acenter);
    }
    else{
        $("#UpperbeltC").val(acenter.toFixed(rnd));
    }
    if (bcenter==="N/A"){
        $("#LowerbeltC").val(bcenter);
    }
    else{
        $("#LowerbeltC").val(bcenter.toFixed(rnd));
    }
}

function setmeshspecs(a1m,a2m,b1m,b2m){
    if (a1m==="N/A"){
        $("#UpperP1T").val(a1m);
        $("#UpperP2T").val(a2m);
    }
    else{
        $("#UpperP1T").val(a1m.toFixed(rnd));
        $("#UpperP2T").val(a2m.toFixed(rnd));
    }
    if (b1m==="N/A"){
        $("#LowerP1T").val(b1m);
        $("#LowerP2T").val(b2m);
    }
    else{
        $("#LowerP1T").val(b1m.toFixed(rnd));
        $("#LowerP2T").val(b2m.toFixed(rnd));
    }
}

function boldpulley(p1,p2){
    
    var pulley = new existingpulleys(p1,p2);
    
    if (pulley.p1===true){
        $("#Pulley1teeth").css("font-weight","bold");
    }
    else{
        $("#Pulley1teeth").css("font-weight","normal");
    }
     if (pulley.p2===true){
        $("#Pulley2teeth").css("font-weight","bold");
    }
    else{
        $("#Pulley2teeth").css("font-weight","normal");
    }
}