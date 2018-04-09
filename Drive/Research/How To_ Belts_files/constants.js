/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// rounding constant
var rnd = 4;

//belt constants
function beltspecs(size){
    if (size==="5mm HTD"){
        this.unit = "metric";
        this.rawpitch = 5;
        this.pdconv = .06266;
        this.pdadd = 0;
        this.odconv = .06265;
        this.odadd = -.04473;
    }
    if (size==="#25 Chain"){
        this.unit = "inch";
        this.rawpitch = .25;
        this.pdconv = 1;
        this.pdadd = 1;
        this.odconv = 1;
        this.odadd = 1;
    }
}
//deg/rad converter
function convert(num,type){
       if (type==="rad"){
           var converted = num*(Math.PI/180);
       }
       if (type==="deg"){
           var converted = num*(180/Math.PI);
       }
       if (type==="inch"){
           var converted = num/25.4;
       }
       return converted;
   }
//belt selector
function beltselect(teeth){
    //array of belts
    var belts = new Array("60","70","80","90","100","104","110","120","130","140","150","160","170","180","200","225","250");
    var arraylength = belts.length;
    //edge cases
   if (teeth <= belts[0]){
       this.abelt = parseFloat(belts[0]);
       this.bbelt = "N/A";
   }
   else if (teeth>= belts[arraylength-1]){
       this.abelt = "N/A";
       this.bbelt = parseFloat(belts[arraylength-1]);
   }
   //other cases
   else{
       //exact belt case
       for(var i=0;i<arraylength;i++){
           if(teeth===parseFloat(belts[i])){
               this.abelt = parseFloat(belts[i+1]);
               this.bbelt = parseFloat(belts[i]);
               break;
           }
       }
       //all other cases
       for(var j=0;j<arraylength;j++){
           if(belts[j]<teeth && belts[j+1]>teeth){
               this.abelt = parseFloat(belts[j+1]);
               this.bbelt = parseFloat(belts[j]);
               break;
           }
       }
   }
    
    
}
//existing pulleys
function existingpulleys(p1,p2){
    this.p1 = new Boolean;
    this.p2 = new Boolean;
    
    var pulleys = new Array("18","24","30","36","42","60");
    var Arraylength = pulleys.length;
    for(var k=0;k<Arraylength;k++){;
        if(parseFloat(p1)===parseFloat(pulleys[k])){
            this.p1 = true;
        }
        if(parseFloat(p2)===parseFloat(pulleys[k])){
            this.p2 = true;
        }
    }
    
}