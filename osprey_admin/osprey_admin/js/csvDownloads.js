function create_CSV_download() {
    
    var selectObject = document.getElementById("download_choice");
    var json_dict_name = selectObject.value;
    var object_name = json_dict_name + ".csv";
    var json_array = {{download_dictionary|safe}}[json_dict_name];
    
    try {
        var json_array_available = Object.keys(json_array).length > 10;
    }

    catch(err){
        console.log(err.toString());
    }

    finally {
            
        var array = typeof json_array != 'object' ? JSON.parse(json_array) : json_array;
        var csv = '';
        var headers = Object.keys(array);
        var row_length = Object.keys(array[headers[0]]).length
        var line = '';

        // Create CSV headers here
        for (var a = 0; a < headers.length; a++){
            if (line!= '') line += ",";
            line += '"' + headers[a] + '"';
        }
        csv += line + '\r\n'

        // Write for the entire content blocks 
        for (var i = 0; i < row_length; i++) {
            var line = '';
            for (var index_val = 0; index_val < headers.length; index_val++){
                if (line != '') line += ',';
                var itemvalue = array[headers[index_val]][i.toString()]
                // Check if the item is a string type or not, if it is, add quote marks to prevent commas from corrupting file
                if (typeof itemvalue === 'string'){
                    line += '"' + itemvalue + '"';
                }
                else {
                    line += itemvalue;
                }
            }
            csv += line + '\r\n';
        }
        // Download Link
        var a = document.createElement("a");
        a.style = "display: none";
        // Data URI
        var bom = decodeURIComponent("%EF%BB%BF");// "\uFEFF\n";
        var byteArray = [];
        csv = bom + csv;
        csvA = new Uint16Array(csv.split('').map( function(k, v){
        return k.charCodeAt(0);
        }));
        var blob = new Blob([csvA],{type:'text/csv;charset=UTF-16LE;'});
        var blobUrl=URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = object_name;
        document.body.appendChild(a);
        a.click();
        }
    }