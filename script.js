const container=document.getElementById("container");
const header=document.getElementById("header");
const navbutton=document.getElementById("vitet");
const years={2024:"1MgE4sKAI5jzhHQD4Ed0QwWpp_dQuWxJRG0tJY6KSxzI",2025:"1fkgVvfFFHsD48HqXPbdWZDwfHJR_OyOod_6QiGn9jC0",2026:"1249igh6qho66Zcm4ttG88c8NFe0-fP7I0RwZb32JQZs",2027:"14Hbn89JqWgplNfcTXR71sn-Gee6bEJJT5IwPMYVya_M",2028:"1dWOHMvTAIZLSb2-xFNfq9-2djwWd89ZNer_-XsYgEoU",2029:"1JRL2L9dOmMb6sbtlwnCXY3YQJXrbUAefRF1lGcVvq38",2030:"19lynoJIXZM0Wh70nPoCbTMiCZ0T6LQ1ppmmnoX05Tm0"};
const months = { JANAR: 31, SHKURT: 28, MARS: 31, PRILL: 30, MAJ: 31, QERSHOR: 30, KORRIK: 31, GUSHT: 31, SHTATOR: 30, TETOR: 31, NENTOR: 30, DHJETOR: 31 };

navbutton.style.visibility="hidden";
navbutton.addEventListener("click",populateYears);

const CLIENT_ID = '965830008283-9mgrb8nql7j7m05ed0efkcf0kcqqbadd.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCGksRCEBy3WQzVqu6yC9JSLK_74qFmRbM';

const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

let tokenClient;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  handleAuth();
}

function handleAuth() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    navbutton.style.visibility="visible";
    populateYears();
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    tokenClient.requestAccessToken({prompt: ''});
  }
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    callback: '',
  });
}

var month=null;
var monthstring="";
var spredsheetid=null;
var xhirocash=null;
var xhirokart=null;
var shpenzrest=null;
var shpenzpers=null;
var rrogat=null;
var pagesat=null;
var puntoret={};
var lenxhirocash=0;
var lenxhirokart=0;
var lenshpenzrest=0;
var lenshpenzpers=0;
var lenrrogat=0;
var lenpagesat=0;

function populateYears(){
    try{
        month=null;
        monthstring="";
        spredsheetid=null
        xhirocash=null;
        xhirokart=null;
        shpenzrest=null;
        shpenzpers=null;
        rrogat=null;
        pagesat=null;
        puntoret={};
        lenxhirocash=0;
        lenxhirokart=0;
        lenshpenzrest=0;
        lenshpenzpers=0;
        lenrrogat=0;
        lenpagesat=0;

        header.innerHTML="MIRSEVINI!";
        container.innerHTML=`
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>Viti</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><button class="table-button">2024</button></td></tr>
                    <tr><td><button class="table-button">2025</button></td></tr>
                    <tr><td><button class="table-button">2026</button></td></tr>
                    <tr><td><button class="table-button">2027</button></td></tr>
                    <tr><td><button class="table-button">2028</button></td></tr>
                    <tr><td><button class="table-button">2029</button></td></tr>
                    <tr><td><button class="table-button">2030</button></td></tr>
                </tbody>
            </table>
        </div>
        `
    let table = document.getElementById('table');
    tbody = table.querySelector('tbody');

    tbody.addEventListener('click',function(event){
        if (event.target.classList.contains('table-button')) {
            const button = event.target;
            spredsheetid=years[button.textContent];
            header.innerHTML=button.textContent;
            populateMonths();
    }});
    }
    catch(err){
        alert("Dicka shkoj keq bej refresh!")
    }
}

function populateMonths(){
    try{
        container.innerHTML=`
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>MUAJI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><button class="table-button">JANAR</button></td></tr>
                    <tr><td><button class="table-button">SHKURT</button></td></tr>
                    <tr><td><button class="table-button">MARS</button></td></tr>
                    <tr><td><button class="table-button">PRILL</button></td></tr>
                    <tr><td><button class="table-button">MAJ</button></td></tr>
                    <tr><td><button class="table-button">QERSHOR</button></td></tr>
                    <tr><td><button class="table-button">KORRIK</button></td></tr>
                    <tr><td><button class="table-button">GUSHT</button></td></tr>
                    <tr><td><button class="table-button">SHTATOR</button></td></tr>
                    <tr><td><button class="table-button">TETOR</button></td></tr>
                    <tr><td><button class="table-button">NENTOR</button></td></tr>
                    <tr><td><button class="table-button">DHJETOR</button></td></tr>
                </tbody>
            </table>
        </div>
        `
    let table = document.getElementById('table');
    tbody = table.querySelector('tbody');

    tbody.addEventListener('click',async function(event){
        if (event.target.classList.contains('table-button')) {
            const button = event.target;
            month=button.textContent;
            try{
                await batchGetValues(spredsheetid,["Sheet1!A2:D1050", "Sheet2!A2:D1050","Sheet3!A2:E7550","Sheet4!A2:E7550","Sheet5!A2:D450","Sheet6!A2:E1050"],month)
                calculatePuntoret();
                for(i=1;i<=months[month];i++){monthstring+=`<option value=${i}>${i}</option>`};
                header.innerHTML+="/"+button.textContent;
                populateServices();
            }
            catch(err){
                alert("Dicka shkoj keq bej refresh!")
            }
    }});
    }
    catch(err){
        alert("Dicka shkoj keq bej refresh!")
    }
}

function populateServices(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
            <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="centered-buttons">
            <button id="1" class="stacked-button">XHIRO CASH</button>
            <button id="2" class="stacked-button">XHIRO KART</button>
            <button id="3" class="stacked-button">SHPENZIMET E RESTORANTIT</button>
            <button id="4" class="stacked-button">SHPENZIMET PERSONALE</button>
            <button id="5" class="stacked-button">RROGAT</button>
            <button id="6" class="stacked-button">PAGESAT E PUNTOREVE</button>
            <button id="7" class="stacked-button">MBYLLJA</button>
        </div>
        `
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(0);
        });
        document.getElementById("1").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"Xhiro Cash";
            populateCash();
        });
        document.getElementById("2").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"Xhiro Kart";
            populateKart();
        });
        document.getElementById("3").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"Shpenzimet e Restorantit";
            populateShpenzimetResto(); 
        });
        document.getElementById("4").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"Shpenzimet Personale";
            populateShpenzimetPersonale();
        });
        document.getElementById("5").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"RROGAT";
            populateRrogat();
        });
        document.getElementById("6").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"PAGESAT E PUNETORVE";
            populatePagesat();
        });
        document.getElementById("7").addEventListener("click",function(event){
            header.innerHTML=header.innerHTML+"/"+"MBYLLJA";
            populateMbulljet();
        });

    }    
    catch(err){
        console.error(err);
        alert("Dicka shkoj keq bej refresh!")   
    }
}

function ktheu(x){
    if(x==0){
        month=null;
        monthstring="";
        xhirocash=null;
        xhirokart=null;
        shpenzrest=null;
        shpenzpers=null;
        rrogat=null;
        pagesat=null;
        puntoret={};
        lenxhirocash=0;
        lenxhirokart=0;
        lenshpenzrest=0;
        lenshpenzpers=0;
        lenrrogat=0;
        lenpagesat=0;
        var temp=header.innerHTML.split("/");
        header.innerHTML=temp[0];
        populateMonths();
    }
    else{
        var temp=header.innerHTML.split("/");
        header.innerHTML=temp[0]+"/"+temp[1];
        populateServices();
    }
}

async function batchGetValues(spreadsheetId, _ranges, condition,type) {
    let ranges = _ranges;
    let result = await gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: spreadsheetId,
      ranges: ranges,
    });
  
    let rows = result.result.valueRanges.map(valueRange => valueRange.values);

    if(ranges.length==6){
        if(rows[0]){
            lenxhirocash=rows[0].length;
            xhirocash=rows[0].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3]])};
        if(rows[1]){
            lenxhirokart=rows[1].length;
            xhirokart=rows[1].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3]])};
        if(rows[2]){
            lenshpenzrest=rows[2].length;
            shpenzrest=rows[2].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3],cell[4]])};
        if(rows[3]){
            lenshpenzpers=rows[3].length;
            shpenzpers=rows[3].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3],cell[4]])};
        if(rows[4]){
            lenrrogat=rows[4].length;
            rrogat=rows[4].filter(cell => cell[0].includes(condition)).map(cell =>  [cell[1],cell[2],cell[3]])};
        if(rows[5]){
            lenpagesat=rows[5].length;
            pagesat=rows[5].filter(cell => cell[0].includes(condition)).map(cell =>  [cell[1],cell[2],cell[3],cell[4]])};
    }
    else if(type=="xhk"){
        if(rows[0]){
            lenxhirocash=rows[0].length;
            xhirocash=rows[0].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3]])};
    }
    else if (type=="xhc"){
        if(rows[0]){
            lenxhirokart=rows[0].length;
            xhirokart=rows[0].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3]])};
    }
    else if(type=="sr"){
        if(rows[0]){
            lenshpenzrest=rows[0].length;
            shpenzrest=rows[0].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3],cell[4]])};
    }
    else if(type=="sp"){
        if(rows[0]){
            lenshpenzpers=rows[0].length;
            shpenzpers=rows[0].filter(cell => cell[0].includes(condition)).map(cell => [cell[1],cell[2],cell[3],cell[4]])};
    }
    else if(type=="rr"){
        if(rows[0]){
            lenrrogat=rows[0].length;
            rrogat=rows[0].filter(cell => cell[0].includes(condition)).map(cell =>  [cell[1],cell[2],cell[3]])};
    }
    else if(type=="p"){
        if(rows[0]){
            lenpagesat=rows[0].length;
            pagesat=rows[0].filter(cell => cell[0].includes(condition)).map(cell =>  [cell[1],cell[2],cell[3],cell[4]])};
    }
}
async function appendValues(spreadsheetId, range, valueInputOption, _values) {
    let values = [[],];
    values = _values;
    const body = {
    values: values,
    };
    await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: valueInputOption,
    resource: body,
    });
}

async function batchUpdateValues(range, valueInputOption, values) {
    const data = [];
    data.push({
      range: range,
      values: values,
    });
  
    const body = {
      data: data,
      valueInputOption: valueInputOption,
    };

    await gapi.client.sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: spredsheetid,
    resource: body,
    })
  }

async function populateCash(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>DATA</th>
                        <th>XHIRO</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <select id="dropdown" class="form-element">
                <option value="0" disabled selected>Data</option>
                ${monthstring}
            </select>
            <input type="text" id="xhirocash" class="form-element" placeholder="Xhiro cash">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        var sum=0.0;
        if(xhirocash!=null){
            var newTableRow;
            for(i of xhirocash){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[2]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                sum+=parseFloat(i[1]);
            }
            if(sum!=0){newTableRow.insertCell(3).innerHTML = `Shuma: ${sum}`;}    

            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    var id=parseInt(button.id);
                    try{
                        var r=`Sheet1!A${id+1}:A${id+1}`
                        await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                        await batchGetValues(spredsheetid, ['Sheet1!A2:D1050'],month,"xhk");
                        alert("XHIRO U FSHI!");
                        populateCash();
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await xhkSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
           window.download(header.innerHTML,["DATA","XHIRO"],xhirocash);
        });
    }
    catch(err){
        alert("Ndodhi nje problem bej refresh!");
    }
}

async function xhkSubmit(){
    try{
        var dat=document.getElementById("dropdown").value
        var xhiro= document.getElementById("xhirocash").value;
        if(dat=="0" || xhiro==='' || Number.isNaN(parseFloat(xhiro))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet1', 'USER_ENTERED', [[month,dat,xhiro,lenxhirocash+1],]);
            alert("XHIRO U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet1!A2:D1050'],month,"xhk");
            populateCash();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}

async function populateKart(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>DATA</th>
                        <th>XHIRO</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <select id="dropdown" class="form-element">
                <option value="0" disabled selected>Data</option>
                ${monthstring}
            </select>
            <input type="text" id="xhirokart" class="form-element" placeholder="Xhiro kart">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        var sum=0.0;
        if(xhirokart!=null){
            var newTableRow;
            for(i of xhirokart){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[2]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                sum+=parseFloat(i[1]);
            }
            if(sum!=0){newTableRow.insertCell(3).innerHTML = `Shuma: ${sum}`;}    

            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    var id=parseInt(button.id);
                    try{
                        var r=`Sheet2!A${id+1}:A${id+1}`
                        await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                        await batchGetValues(spredsheetid, ['Sheet2!A2:D1050'],month,"xhc");
                        alert("XHIRO U FSHI!");
                        populateKart();
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await xhcSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["DATA","XHIRO"],xhirokart);
         });
    }
    catch(err){
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function xhcSubmit(){
    try{
        var dat=document.getElementById("dropdown").value
        var xhiro= document.getElementById("xhirokart").value;
        if(dat=="0" || xhiro==='' || Number.isNaN(parseFloat(xhiro))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet2', 'USER_ENTERED', [[month,dat,xhiro,lenxhirokart+1],]);
            alert("XHIRO U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet2!A2:D1050'],month,"xhc");
            populateKart();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function populateShpenzimetResto(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>DATA</th>
                        <th>SHPENZIMI</th>
                        <th>SASIA</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <select id="dropdown" class="form-element">
                <option value="0" disabled selected>Data</option>
                ${monthstring}
            </select>
            <input type="text" id="emri" class="form-element" placeholder="Shpenzimi">
            <input type="text" id="sasia" class="form-element" placeholder="Sasia">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        var sum=0.0;
        if(shpenzrest!=null){
            var newTableRow;
            for(i of shpenzrest){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[3]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                newTableRow.insertCell(3).innerHTML = i[2];
                sum+=parseFloat(i[2]);
            }
            if(sum!=0){newTableRow.insertCell(4).innerHTML = `Shuma: ${sum}`;}    

            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    var id=parseInt(button.id);
                    try{
                        var r=`Sheet3!A${id+1}:A${id+1}`
                        await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                        await batchGetValues(spredsheetid, ['Sheet3!A2:E7550'],month,"sr");
                        alert("SHPENZIMI U FSHI!");
                        populateShpenzimetResto();
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await srSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["DATA","SHPENZIMI","SASIA"],shpenzrest);
         });
    }
    catch(err){
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function srSubmit(){
    try{
        var dat=document.getElementById("dropdown").value
        var shpenzimi= document.getElementById("emri").value;
        var sasia= document.getElementById("sasia").value;
        if(dat == "0" || sasia === '' || shpenzimi === '' || Number.isNaN(parseFloat(sasia))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet3', 'USER_ENTERED', [[month,dat,shpenzimi,sasia,lenshpenzrest+1],]);
            alert("SHPENZIMI U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet3!A2:E7550'],month,"sr");
            populateShpenzimetResto();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}

async function populateShpenzimetPersonale(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>DATA</th>
                        <th>SHPENZIMI</th>
                        <th>SASIA</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <select id="dropdown" class="form-element">
                <option value="0" disabled selected>Data</option>
                ${monthstring}
            </select>
            <input type="text" id="emri" class="form-element" placeholder="Shpenzimi">
            <input type="text" id="sasia" class="form-element" placeholder="Sasia">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        var sum=0.0;
        if(shpenzpers!=null){
            var newTableRow;
            for(i of shpenzpers){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[3]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                newTableRow.insertCell(3).innerHTML = i[2];
                sum+=parseFloat(i[2]);
            }
            if(sum!=0){newTableRow.insertCell(4).innerHTML = `Shuma: ${sum}`;}    

            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    var id=parseInt(button.id);
                    try{
                        var r=`Sheet4!A${id+1}:A${id+1}`
                        await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                        await batchGetValues(spredsheetid, ['Sheet4!A2:E7550'],month,"sp");
                        alert("SHPENZIMI U FSHI!");
                        populateShpenzimetPersonale();
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await spSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["DATA","SHPENZIMI","SASIA"],shpenzpers);
         });
    }
    catch(err){
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function spSubmit(){
    try{
        var dat=document.getElementById("dropdown").value
        var shpenzimi= document.getElementById("emri").value;
        var sasia= document.getElementById("sasia").value;
        if(dat == "0" || sasia === '' || shpenzimi === '' || Number.isNaN(parseFloat(sasia))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet4', 'USER_ENTERED', [[month,dat,shpenzimi,sasia,lenshpenzpers+1],]);
            alert("SHPENZIMI U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet4!A2:E7550'],month,"sp");
            populateShpenzimetPersonale();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}

function calculatePuntoret(){
    puntoret={};
    if(rrogat){for(i of rrogat){puntoret[i[0]]=0.0;}}
    if(pagesat){for(i of pagesat){puntoret[i[1]]=puntoret[i[1]]+parseFloat(i[2])}}
}

async function populateRrogat(){
    try{
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>PUNTORI</th>
                        <th>RROGA</th>
                        <th>MBETUR</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <input type="text" id="emri" class="form-element" placeholder="Puntori">
            <input type="text" id="sasia" class="form-element" placeholder="Rroga">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        if(rrogat!=null){
            var newTableRow;
            var j;
            var cell;
            for(i of rrogat){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[2]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                j=parseFloat(i[1])-puntoret[i[0]]
                cell=newTableRow.insertCell(3);
                cell.innerHTML = j;
                if(j==0){cell.style.backgroundColor = "green";}
                else{cell.style.backgroundColor = "red";}
            }   

            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    const row = button.closest('tr');
                    const firstCell = row.cells[1]
                    var id=parseInt(button.id);
                    try{
                        if(puntoret[firstCell.innerHTML]==0){
                            var r=`Sheet5!A${id+1}:A${id+1}`
                            await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                            await batchGetValues(spredsheetid, ['Sheet5!A2:D450'],month,"rr");
                            calculatePuntoret();
                            alert("PUNTORI U FSHI!");
                            populateRrogat();
                        }
                        else{
                            alert("NUK MUND TA FSHIME SEPSE I KE DHENE PARADHENIE!")
                        }
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await rrSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["PUNTORI","RROGA"],rrogat);
         });
    }
    catch(err){
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function rrSubmit(){
    try{
        var puntori= document.getElementById("emri").value;
        var rroga= document.getElementById("sasia").value;
        if(rroga === '' || puntori === '' || Number.isNaN(parseFloat(rroga))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else if(puntoret.hasOwnProperty(puntori)){
            alert("PUNETORI EKSISTON!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet5', 'USER_ENTERED', [[month,puntori,rroga,lenrrogat+1],]);
            alert("PUNTORI U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet5!A2:D450'],month,"rr");
            calculatePuntoret();
            populateRrogat();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}

async function populatePagesat(){
    try{
        var puntoretstr='';
        for(i in puntoret){puntoretstr+=`<option value=${i}>${i}</option>`}
        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <thead>
                    <tr>
                        <th>VEPRIM</th>
                        <th>DATA</th>
                        <th>PUNTORI</th>
                        <th>PAGESA</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container">
            <select id="dropdown" class="form-element">
            <option value="0" disabled selected>Data</option>
            ${monthstring}
            </select>
            <select id="dropdown2" class="form-element">
            <option value="0" disabled selected>Puntoret</option>
            ${puntoretstr}
            </select>
            <input type="text" id="sasia" class="form-element" placeholder="Rroga">
            <button id="submit-button" class="form-element">Submit</button>
            <button id="download" class="form-element">Download</button>
        </div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        if(pagesat!=null){
            var newTableRow;
            for(i of pagesat){
                newTableRow = tbody.insertRow();
                newTableRow.insertCell(0).innerHTML = `<button id=${i[3]} class="table-button">DELETE</button>`;
                newTableRow.insertCell(1).innerHTML = i[0];
                newTableRow.insertCell(2).innerHTML = i[1];
                newTableRow.insertCell(3).innerHTML = i[2];
            }   
            tbody.addEventListener('click',async function(event){
                if (event.target.classList.contains('table-button')) {
                    const button = event.target;
                    var id=parseInt(button.id);
                    try{
                        var r=`Sheet6!A${id+1}:A${id+1}`
                        await batchUpdateValues(r,'USER_ENTERED',[[0,],])
                        await batchGetValues(spredsheetid, ['Sheet6!A2:E1050'],month,"p");
                        calculatePuntoret();
                        alert("PAGESA U FSHI!");
                        populatePagesat();
                    }
                    catch(err){
                        alert("Ndodhi nje problem bej refresh!");
                    }
            }});
        }
        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("submit-button").addEventListener("click",async function(event){
            await pSubmit();
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["DATA","PUNTORI","PAGESA"],pagesat);
         });
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}
async function pSubmit(){
    try{
        var dat=document.getElementById("dropdown").value
        var puntori= document.getElementById("dropdown2").value;
        var rroga= document.getElementById("sasia").value;
        if(dat=="0" || rroga === '' || puntori == "0" || Number.isNaN(parseFloat(rroga))){
            alert("PLOTESO TE DHENAT SIC DUHET!");
        }
        else{
            await appendValues(spredsheetid, 'Sheet6', 'USER_ENTERED', [[month,dat,puntori,rroga,lenpagesat+1],]);
            alert("PAGESA U SHTUA!");
            await batchGetValues(spredsheetid, ['Sheet6!A2:E1050'],month,"p");
            calculatePuntoret();
            populatePagesat();
        }
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}

async function populateMbulljet(){
    try{
        var cashsum=0.0,cartsum=0.0,shpers=0.0,shrest=0.0,shrrogat=0.0, shpagesat=0.0;
        if(xhirocash!=null){for(i of xhirocash){cashsum+=parseFloat(i[1])}}
        if(xhirokart!=null){for(i of xhirokart){cartsum+=parseFloat(i[1])}}
        if(shpenzrest!=null){for(i of shpenzrest){shrest+=parseFloat(i[2])}}
        if(shpenzpers!=null){for(i of shpenzpers){shpers+=parseFloat(i[2])}}
        if(rrogat!=null){for(i of rrogat){shrrogat+=parseFloat(i[1])}}
        if(pagesat!=null){for(i of pagesat){shpagesat+=parseFloat(i[2])}}

        container.innerHTML=`
        <div id="back-button-container">
        <button id="back-button" class="back-button">KTHEU MBRAPA</button>
        </div>
        <div id="table-container">
            <table id="table" class="button-table">
                <tbody></tbody>
            </table>
        </div>
        <div id="form-container"><button id="download" class="form-element">Download</button></div>
        `
        let table = document.getElementById('table');
        tbody = table.querySelector('tbody');
        tbody.innerHTML="";
        var newTableRow;
        newTableRow = tbody.insertRow();
        newTableRow.insertCell(0).innerHTML = `Xhiro kesh: ${cashsum}`;
        newTableRow.insertCell(1).innerHTML = `Xhiro kart: ${cartsum}`;
        newTableRow = tbody.insertRow();
        newTableRow.insertCell(0).innerHTML = `Shpenzimet e restorantit: ${shrest}`;
        newTableRow.insertCell(1).innerHTML = `Shpenzimet personale ${shpers}`;
        newTableRow = tbody.insertRow();
        newTableRow.insertCell(0).innerHTML = `Rrogat: ${shrrogat}`;
        newTableRow.insertCell(1).innerHTML = `Sasia paguar e rrogave: ${shpagesat}`;

        document.getElementById("back-button").addEventListener("click",function(event){
            ktheu(1);
        });
        document.getElementById("download").addEventListener("click",function(event){
            window.download(header.innerHTML,["",""],[[`Xhiro kesh: ${cashsum}`,`Xhiro kart: ${cartsum}`],[`Shpenzimet e restorantit: ${shrest}`,`Shpenzimet personale ${shpers}`],[`Rrogat: ${shrrogat}`,`Sasia paguar e rrogave: ${shpagesat}`]]);
         });
    }
    catch(err){
        console.error(err);
        alert("Ndodhi nje problem bej refresh!");
    }
}