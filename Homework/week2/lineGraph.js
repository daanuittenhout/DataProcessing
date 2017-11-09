var fileInput = document.getElementById("(C:\Users\daan_\Desktop\KNMI.csv)")

function makeTable (fileInput)
{

    var rows = KNMI.split('\n'),
    table = document.createElement('table'),
    tr = null, td = null,
    tds = null;

    for ( var i = 0; i < rows.length; i++ ) {
        tr = document.createElement('tr');
        tds = rows[i].split(',');
        for ( var j = 0; j < tds.length; j++ ) {
           td = document.createElement('td');
           td.innerHTML = tds[j];
           tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    document.appendChild(table);
}
x = makeTable(fileInput)
console.console.log(x);
