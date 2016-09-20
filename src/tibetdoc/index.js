var handleConvert = document.getElementById('fileInput');
handleConvert.addEventListener('change', converter);
var r = new FileReader();
function converter() {
  var file = document.getElementById('fileInput').files[0];
  r.onload = function() {
    var data = r.result;
    data = TibetDoc.Parse(data.toString());
    data = TibetDoc.JSONToHTML(data);
    document.getElementById('a').innerHTML = data;
    data = '<meta charset=utf-8>\n' + data;
    var b = new Blob([data], { encoding:'utf-8',type:'text/html' });
    console.log('blob', JSON.stringify(b));
    var url = URL.createObjectURL(b);
    var downLink = document.getElementById('downLink');
    downLink.href = url;
    downLink.target = '_blank';
    downLink.innerHTML = 'Download';
    downLink.download = 'convertedDocument.txt';
    document.getElementById('reload').style.display = 'inline';
  };
  r.readAsBinaryString(file);
}

document.getElementById('reload').addEventListener('click', doReload);

function doReload(event) {
  location.reload();
}
