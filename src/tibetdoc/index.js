var r = new FileReader();
function act() {
  var file = fileInput.files[0]
  r.onload = function() {
    var data = r.result
    data = TibetDoc.Parse(data.toString())
    data = TibetDoc.JSONToHTML(data)
    a.innerHTML = data
    data = '<meta charset=utf-8>\n' + data
    var b = new Blob([data], { encoding:'utf-8',type:'text/html' });
    console.log('blob', JSON.stringify(b))
    var url = URL.createObjectURL(b);
    downLink.href = url
    downLink.target = '_blank'
    downLink.innerHTML = 'Download'
    downLink.download = 'convertedDocument.txt'
    document.getElementById('reload').style.display = 'inline'
  }
  r.readAsBinaryString(file); 
}

reload.addEventListener('click', doReload);

function doReload(event) {
  location.reload();
}
