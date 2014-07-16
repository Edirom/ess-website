/* pro Halbtag eine Ziffer in das Array "Termin" vergeben */
var KursList = [
    {"KursID":"dariah", "Termin":[2], "Counter":0},
    {"KursID":"edirom", "Termin":[7,8,9], "Counter":0},
    {"KursID":"euf", "Termin":[], "Counter":0},
    {"KursID":"mei-rendering", "Termin":[5,6], "Counter":0},
    {"KursID":"kdm", "Termin":[1], "Counter":0},
    {"KursID":"mei-einf", "Termin":[2,3,4], "Counter":0},
    {"KursID":"mei-einf-en", "Termin":[2,3,4], "Counter":0},
    {"KursID":"mermeid", "Termin":[5,6], "Counter":0},
    {"KursID":"odd", "Termin":[6,7], "Counter":0},
    {"KursID":"python", "Termin":[8,9], "Counter":0},
    {"KursID":"tei-einf", "Termin":[3,4,5], "Counter":0},
    {"KursID":"xpath", "Termin":[2,3,4], "Counter":0},
    {"KursID":"xslt", "Termin":[5,6,7], "Counter":0}
];

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
			if (termin1[i]==termin2[j]) return true;
		}
	return false;			
}

function conflict(kurs)
{		
    var k = pos(kurs);
    var termin=KursList[k].Termin;				
    if (document.getElementById(kurs).checked==false)
    {
		for(var i=0;i<k;i++)
		{
			if (match(termin,KursList[i].Termin))
			{
			$(document.getElementById(KursList[i].KursID)).attr('disabled', true);
			$(document.getElementById(KursList[i].KursID).parentNode).removeAttr('onclick');
			$(document.getElementById(KursList[i].KursID).nextSibling).addClass('disabled');
			KursList[i].Counter++;
			}
		}
		for(var j=k+1;j<KursList.length;j++)
		{
			if (match(termin,KursList[j].Termin))
			{
			$(document.getElementById(KursList[j].KursID)).attr('disabled', true);
			$(document.getElementById(KursList[j].KursID).parentNode).removeAttr('onclick');
			$(document.getElementById(KursList[j].KursID).nextSibling).addClass('disabled');
			KursList[j].Counter++;
			}
		}		
	}
	else 
	{	
		for(var i=0;i<k;i++)
		{
			if (match(termin,KursList[i].Termin)&&KursList[i].Counter==1)
			{
			$(document.getElementById(KursList[i].KursID)).removeAttr('disabled');
			$(document.getElementById(KursList[i].KursID).parentNode).attr('onclick','conflict("'+KursList[i].KursID+'")');
			$(document.getElementById(KursList[i].KursID).nextSibling).removeClass('disabled');
			KursList[i].Counter--;
			}
			else if (match(termin,KursList[i].Termin)&&KursList[i].Counter>1)
			KursList[i].Counter--;
		}
		for(var j=k+1;j<KursList.length;j++)
		{
			if (match(termin,KursList[j].Termin)&&KursList[j].Counter==1)
			{
			$(document.getElementById(KursList[j].KursID)).removeAttr('disabled');
			$(document.getElementById(KursList[j].KursID).parentNode).attr('onclick','conflict("'+KursList[j].KursID+'")');
			$(document.getElementById(KursList[j].KursID).nextSibling).removeClass('disabled');
			KursList[j].Counter--;
			}
			else if (match(termin,KursList[j].Termin)&&KursList[j].Counter>1)
			KursList[j].Counter--;
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
    //console.log(error);
    if (error!=0) return false; 
    }
}
