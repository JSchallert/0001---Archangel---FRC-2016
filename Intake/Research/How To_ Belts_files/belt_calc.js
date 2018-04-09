/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function runcalc() {

    var data = new intial_get();
    //Set belt constants
    var belt = new beltspecs(data.inputpitch);
    //convert to inches
    if (belt.unit==="metric"){
        var pitch = convert(belt.rawpitch,"inch");
    }
    else{
        var pitch = belt.rawpitch;
    }
    //belt diameters calc
    //pd = pitch diameter
    //od = outerdiameter
    var p1pd = (belt.pdconv*data.p1t)+belt.pdadd;
    var p1od = (belt.odconv*data.p1t)+belt.odadd;
    var p2pd = (belt.pdconv*data.p2t)+belt.pdadd;
    var p2od = (belt.odconv*data.p2t)+belt.odadd;
    // for sprockets
    
    if (data.inputpitch==="#25 Chain"){
        var p1pd = pitch/Math.sin(convert((180/data.p1t),"rad"));
        var p1od = pitch*(.6+(1/(Math.tan(convert((180/data.p1t),"rad")))));
        var p2pd = pitch/Math.sin(convert((180/data.p2t),"rad"));
        var p2od = pitch*(.6+(1/(Math.tan(convert((180/data.p2t),"rad")))));
    }
    //gear ratio
    var ratio = (data.p1t/data.p2t);
    //min center
    var mincenter = p1od+p2od;
    setpulleyspecs(p1pd,p1od,p2pd,p2od,ratio);
    //circumferences
    var p1c = p1pd*Math.PI;
    var p2c = p2pd*Math.PI;
    var p1r = p1pd*.5;
    var p2r = p2pd*.5;
    //minimum center distance
    var p0r = Math.abs(p1r-p2r);
    
    // check minimum center distance
    if (p0r >= data.dcenter || mincenter >= data.dcenter){
        alert("Center Distance Too Small");
    }
    //do some math
    var tL = Math.sqrt((Math.pow(data.dcenter,2))-(Math.pow(p0r,2)));
    var tA = convert((Math.asin(p0r/data.dcenter)),"deg");
    
    //calc belt length
    if (p1r>=p2r){
        var p1ae = (2*tA)+180;
        var p2ae = 180-(2*tA);

        var pLc = p1c;
        var pSc = p2c;
        var p0R = 0;
    }
    else{
        var p1ae = 180-(2*tA);
        var p2ae = (2*tA)+180;
        
        var pLc = p2c;
        var pSc = p1c;
        var p0R = 1;
    }
    
    var p1re = (p1ae/360);
    var p1le = p1c*p1re;      
    var p2re = (p2ae/360);
    var p2le = p2c*p2re;
        
    //Desired belt Length
    var dlength = (p1le+p2le)+(2*tL);
    var dlinks = dlength/pitch;
    //nearest integer link
    var wlinks = Math.round(dlinks);
    
    if (wlinks>=dlinks){
        var alinks = wlinks;
        var blinks = wlinks -1;
        
    }
    if (wlinks<dlinks){
        var blinks = wlinks;
        var alinks = wlinks+1;
        
    }
    
    //belt selection
    var size = new beltselect(wlinks);
    //handle N/A & calc belts
    //create ness varibles
    var acenter;
    var bcenter;
    var alength;
    var blength;
    // abelt n/a case
    if (data.inputpitch==="5mm HTD"){
        if (size.abelt==="N/A"){
            acenter = "N/A";

            blength = size.bbelt*pitch;
            bcenter = (csolve(data.dcenter,blength,p0r,pLc,pSc))+data.cadd;
            }
    //bbelt n/a case
        else if (size.bbelt==="N/A"){
            bcenter = "N/A";

            alength = size.abelt*pitch;
            acenter = (csolve(data.dcenter,alength,p0r,pLc,pSc))+data.cadd;
        }
    // all other cases
        else{
            alength = size.abelt*pitch;
            acenter = (csolve(data.dcenter,alength,p0r,pLc,pSc))+data.cadd;

            blength = size.bbelt*pitch;
            bcenter = (csolve(data.dcenter,blength,p0r,pLc,pSc))+data.cadd;
        }
    }
    
    if (data.inputpitch==="#25 Chain"){
        alength = (alinks)*pitch;
        acenter = (csolve(data.dcenter,alength,p0r,pLc,pSc))+data.cadd;

        blength = (blinks)*pitch;
        bcenter = (csolve(data.dcenter,blength,p0r,pLc,pSc))+data.cadd;
        console.log(alength);
        console.log(blength);
    }
    
    //center set
    if (data.inputpitch==="5mm HTD"){
        setcenterspecs(size.abelt,size.bbelt,acenter,bcenter);
    }
    
    if (data.inputpitch==="#25 Chain"){
        setcenterspecs(alinks,blinks,acenter,bcenter);
    }
    
    //Teeth mesh calcs
    var amesh = new tmesh(p0r,acenter,p0R,data.p1t,data.p2t);
    var bmesh = new tmesh(p0r,bcenter,p0R,data.p1t,data.p2t);
    
    // set mesh specs
    setmeshspecs(amesh.TM1,amesh.TM2,bmesh.TM1,bmesh.TM2);
    //bold pulleys
    
    
 
}


    
  
    
    
    
