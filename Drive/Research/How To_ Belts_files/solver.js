/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function csolve(center,length,r,L,S){
    
    var ferror = 1;
    var step = parseFloat(center);
    var result;
    var answer = 0;
    var tolerance = .00001;
    while (Math.abs(ferror)>=tolerance){
        result = (((180+(2*((180/Math.PI)*Math.asin(r/step))))/360)*L)+(((180-(2*((180/Math.PI)*Math.asin(r/step))))/360)*S)+(2*Math.sqrt((Math.pow(step,2))-(Math.pow(r,2))))-length;
        ferror = answer - result;
        step = step+(ferror*.5);
    }
    return step;
    
}

function tmesh(r,center,P0r,p1t,p2t){
    if (center==="N/A"){
        this.TM1 = "N/A";
        this.TM2 = "N/A";
    }
    else{
        var tan = convert(Math.asin(r/center),"deg");
        if (P0r===0){
        
            var TR1 = (180+(2*tan))/360;
            var TR2 = (180-(2*tan))/360;
        }
        if (P0r===1){
        
            var TR1 = (180-(2*tan))/360;
            var TR2 = (180+(2*tan))/360;
        }
        this.TM1 = TR1*p1t;
        this.TM2 = TR2*p2t;
    }
}