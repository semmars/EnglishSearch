document.getElementById("searchbutton").addEventListener("click", function () {
    searchinit()
});

document.getElementById("searchtxt").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        searchinit()
    }
});

function searchinit() {
    let searchtxt = document.getElementById("searchtxt").value;
    console.log(searchtxt)
    searchgo(searchtxt)
}


function searchgo(str) {
    let title = document.getElementById("searchword")
    title.innerText = str

    axios.post('/se/', {
        name: str
    })
        .then(function (response) {
            console.log(response.data);
            readjson(response.data)


        })
        .catch(function (error) {
            console.log(error);
        });


}

function readjson(data) {
    //var obj = JSON.parse(data);
    let se = data.results[0].lexicalEntries[0].entries[0].senses
    let k = se.length
    console.log("array has length:" + k)

    let text = "";
    for (let i = 0; i <= k; i++) {


        try {
            text += (i + 1) + ". " + se[i].definitions[0] + "<br>";

        } catch (error) {

            //console.error(error);
            continue;
        }


    }

    let re = document.getElementById("definition")
    //re.innerText = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    re.innerHTML = text

// Define recursive function to print nested values


// Printing all the values from the resulting object
//printValues(data);

}

function printValues(obj) {
    for (var k in obj) {
        if (obj[k] instanceof Object) {
            printValues(obj[k]);
        } else {
            document.write(obj[k] + "<br>");
        }
        ;
    }
};