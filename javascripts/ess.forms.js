/* pro Halbtag eine Ziffer in das Array "Termin" vergeben */

var KursList = [
    {"KursID":"mei-E", "Termin":[1,2,3], "Counter":0},
    {"KursID":"edirom-P", "Termin":[1,2,3], "Counter":0},
    {"KursID":"xTec", "Termin":[1,2,3], "Counter":0},
    {"KursID":"PerfFrei", "Termin":[1,2,3,4,5,6,7,8], "Counter":0},
    {"KursID":"git", "Termin":[4], "Counter":0},
    {"KursID":"semWeb", "Termin":[4], "Counter":0},
    {"KursID":"audio", "Termin":[4], "Counter":0},
    {"KursID":"daten", "Termin":[5], "Counter":0},
    {"KursID":"rendMEI", "Termin":[5], "Counter":0},
    {"KursID":"edirom-E", "Termin":[6,7,8], "Counter":0},
    {"KursID":"mei-F", "Termin":[6,7,8], "Counter":0},
    {"KursID":"tei", "Termin":[6,7,8], "Counter":0}
];

/*Konfiguration der Summerschool 2016*/
/*var KursList = [
    {"KursID":"tei", "Termin":[1,2,3], "Counter":0},
    {"KursID":"mei-A-dt", "Termin":[4,5,6], "Counter":0},
    {"KursID":"edirom-A-dt", "Termin":[7,8,9], "Counter":0},
    {"KursID":"edirom-A-en", "Termin":[1,2,3], "Counter":0},
    {"KursID":"mei-A-en", "Termin":[4,5,6], "Counter":0},
    {"KursID":"metadaten", "Termin":[7,8], "Counter":0},
    {"KursID":"edition-A-en", "Termin":[9,10], "Counter":0},
    {"KursID":"mei-F-dt", "Termin":[1,2,3], "Counter":0},
    {"KursID":"edirom-F-dt", "Termin":[4,5,6], "Counter":0},
    {"KursID":"edition-F-dt", "Termin":[7,8], "Counter":0},
    {"KursID":"philo", "Termin":[1,2], "Counter":0},
    {"KursID":"eXist", "Termin":[3,4], "Counter":0},
    {"KursID":"mei-tools", "Termin":[5,6], "Counter":0},
    {"KursID":"daten", "Termin":[7], "Counter":0}
];*/

/*Konfiguration der Summerschool 2015*/
/*var KursList = [
    {"KursID":"exist", "Termin":[4,5,6], "Counter":0},
    {"KursID":"XMLdata", "Termin":[1,2,3], "Counter":0},
    {"KursID":"edition", "Termin":[8,9], "Counter":0},
    {"KursID":"edirom", "Termin":[8,9,10], "Counter":0},
    {"KursID":"euf", "Termin":[0], "Counter":0},
    {"KursID":"kolloquium", "Termin":[6,7], "Counter":0},
    {"KursID":"mei-einf", "Termin":[1,2,3], "Counter":0},
    {"KursID":"mermeid", "Termin":[8,9,10], "Counter":0},
    {"KursID":"meidev", "Termin":[1,2], "Counter":0},
    {"KursID":"odd", "Termin":[3,4], "Counter":0},
    {"KursID":"tei-einf", "Termin":[4,5,6], "Counter":0}
];*/

var errorText = '<small>Ungültige Eingabe</small>';
		
function pos(kurs)
{
	for (var i=0;i<KursList.length;i++)
	if (KursList[i].KursID==kurs)
	{
		return i;
	}
}

function match(termin1,termin2)
{			
	for (var i=0;i<termin1.length;i++)
		for (var j=0;j<termin2.length;j++)
		{
			if (termin1[i]===termin2[j]) return true;
		}
	return false;			
}

function conflict(kurs, force) {		

    // if checkbox is disabled
    if($(document.getElementById(kurs)).attr('disabled'))
        return;
    
    var k = pos(kurs);
    var termin=KursList[k].Termin;				
    
    if (force || document.getElementById(kurs).checked==false) {
		for(var i=0;i<KursList.length;i++) {
		    if(i === k) continue;
		    
			if (match(termin,KursList[i].Termin)) {
						
    			$(document.getElementById(KursList[i].KursID)).attr('disabled', true);
    			$(document.getElementById(KursList[i].KursID).nextSibling).addClass('disabled');
    			KursList[i].Counter++;
			}
		}
	}
	else {	
		for(var i=0;i<KursList.length;i++) {
		
		    if(i === k) continue;
		
			if (match(termin,KursList[i].Termin) && KursList[i].Counter==1) {
    			$(document.getElementById(KursList[i].KursID)).removeAttr('disabled');
    			$(document.getElementById(KursList[i].KursID).nextSibling).removeClass('disabled');
    			KursList[i].Counter--;
			}
			else if (match(termin,KursList[i].Termin) && KursList[i].Counter>1)
			    KursList[i].Counter--;
		}
	}				
}

function validate_name(field)
{
    var myID = field.name+'Div';
    with (field)
    {
        if (value.length < 2||value.length > 40)
      	{	
      	$('#'+ myID + '> .errorText').show();
      	$('#'+myID).addClass('error');
      	return false;
      	}
    }
    return true;
}

function validate_email(field)
{
    with (field)
    {
        apos=value.indexOf("@")
        dotpos=value.lastIndexOf(".")
        if (apos<1||dotpos-apos<2) 
        {
        $('#emailDiv > .errorText').show();
        $('#emailDiv').addClass('error');
        return false;
        }
    }
    return true;
}

function validate_anrede(field)
{
    if(field.value=='')
    {
        $('#anredeDiv > .errorText').show();
        $('#anredeDiv').addClass('error');
        return false;
    }
    return true;
}

function validate_form(thisform)
{
    var error=0;
    $('.errorText').hide();
    $('.error').removeClass('error');
    with (thisform)
    {
    if (!validate_name(vorname)) error++;
    if (!validate_name(nachname)) error++;
    if (!validate_email(email)) error++;
    if (!validate_anrede(anrede)) error++;
    if (document.getElementById('g-recaptcha-response').value.length === 0) {
        error++;
        $('.captcha > .errorText').show();
        $('.captcha').addClass('error');
    }
    //console.log(error);
    if (error!=0) return false; 
    }
}

// beim Aufruf durch die Browser-History müssen die Counter (und die disabled-Klassen) neu gesetzt werden 
function init() {

    $('.kurse input:checked').each(function(a,b) {
        conflict(b.id, true);
    });
}

init();
