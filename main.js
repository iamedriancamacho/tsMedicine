var Medicine = /** @class */ (function () {
    function Medicine(id, b, g, s, p) {
        this.id = id;
        this.brandN = b;
        this.genN = g;
        this.stock = s;
        this.p = p;
    }
    return Medicine;
}());
//my class
var invoice = [];
var id = 0;
var idtoDelete;
var table = document.getElementById("table");
var t1 = new Medicine(1, "Coreg tablets", "carvedilol", 25, 65);
var t2 = new Medicine(2, "Buspar", "buspirone tablet", 63, 23.76);
var t3 = new Medicine(3, "Ziac", "bisoprolol/HCTZ", 72, 99);
var t4 = new Medicine(4, "Bentyl", "dicyclomine", 12, 80);
invoice.push(t1);
invoice.push(t2);
invoice.push(t3);
invoice.push(t4);
display();
//function: for submission
function submit() {
    var Bname = document.getElementById("BN").value;
    var Gname = document.getElementById("GN").value;
    var S = document.getElementById("Stk")
        .valueAsNumber;
    var P = document.getElementById("Price")
        .valueAsNumber;
    if (Bname == "" || Gname == "" || S.toString() == "" || P.toString() == "") {
        alert("NO INPUTS");
        return null;
    }
    else {
        id = invoice.length;
        id++;
        var verify = true;
        //this checks for duplicates
        invoice.map(function (element) {
            if (element.genN == Gname || element.brandN == Bname) {
                alert("Error. Medicine already exists.");
                idtoDelete = null;
                document.getElementById("BN").innerText = "";
                verify = false;
                return;
            }
        });
        if (verify) {
            var invOne = new Medicine(id, Bname, Gname, S, P);
            invoice.push(invOne);
            alert("Input successfully");
            var table = document.getElementById("table");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var row = document.createElement("tr");
            td1.innerHTML = id.toString();
            td2.innerHTML = Bname;
            td3.innerHTML = Gname;
            td4.innerHTML = S.toString();
            td5.innerHTML = P.toString();
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
            if (table != null) {
                table.children[0].appendChild(row);
                addRowHandlers();
            }
        }
    }
}
//function: udpate the table row
function restartRow() {
    //idtoDelete = undefined;
    var table2 = document.getElementById("table");
    console.log("table2.length: " + table2.rows.length);
    var rowCount = table2.rows.length;
    console.log("rowCount: " + rowCount);
    for (var i = 1; i < rowCount; i++) {
        table2.deleteRow(i);
        console.log("restartRow: " + i);
    }
}
//function: display table
function display() {
    restartRow();
    console.log("this is display function");
    invoice.forEach(function (x) {
        console.log(x);
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var row = document.createElement("tr");
        td1.innerHTML = x.id.toString();
        td2.innerHTML = x.brandN;
        td3.innerHTML = x.genN;
        td4.innerHTML = x.stock.toString();
        td5.innerHTML = x.p.toString();
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        if (table != null) {
            table.children[0].appendChild(row);
        }
    });
    addRowHandlers();
}
//function: addKeyListener for table
function addRowHandlers() {
    var table = document.getElementById("table");
    var rows = table === null || table === void 0 ? void 0 : table.getElementsByTagName("tr");
    var x = rows === null || rows === void 0 ? void 0 : rows.length;
    for (var i = 1; i < x; i++) {
        console.log(i);
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                var cell = row.getElementsByTagName("td")[0];
                idtoDelete = cell.innerHTML;
                if (idtoDelete == undefined) {
                    alert("choose a brand");
                    return;
                }
                else
                    alert("id:" + idtoDelete);
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}
//function: captures the ID
function pickID() {
    if (idtoDelete == undefined) {
        alert("Error: Please choose a brand");
        return 1;
    }
    else {
        console.log("index: " + idtoDelete);
        return 0;
    }
}
//function: deletes a row
function onDelete() {
    if (!pickID()) {
        var index = invoice.findIndex(function (o) {
            return o.id == idtoDelete;
        });
        if (index !== -1)
            invoice.splice(index, 1);
        idtoDelete = null;
        alert('Deleted successfully! tap "Medicine Info" for an updated database');
        display();
    }
}
//function: updates the price
function updatePrice() {
    if (!pickID()) {
        invoice.map(function (element) {
            if (element.id == idtoDelete) {
                var p = prompt("Enter price for " + element.brandN + " :", "");
                element.p = parseFloat(p);
                alert("Product " +
                    "'" +
                    element.brandN +
                    "'" +
                    "has been updated successfully!");
                idtoDelete = null;
                display();
                return element;
            }
        });
    }
}
//function: sells medicine
function sellMed() {
    if (!pickID()) {
        invoice.map(function (element) {
            if (element.id == idtoDelete) {
                var p = prompt("How many " + element.brandN + " do you want to sell?", "");
                if (p > element.stock.toString()) {
                    alert("Error: your input exceeds to the available stocks. Please try again");
                }
                else {
                    element.stock -= parseFloat(p);
                    alert("Sold successfully! Please tap 'Medicine Info' for an updated database.");
                    idtoDelete = null;
                    display();
                }
            }
        });
    }
}
// function tryDel(): void {
//   var table2 = document.getElementById("table");
//   var i = 0;
//   if (!pickID()) {
//     invoice.map(function (element) {
//       console.log("tryDel traversing: " + ++i);
//       if (element.id == idtoDelete) {
//         <HTMLTableElement>table2.deleteRow(i);
//         idtoDelete = null;
//       }
//     });
//     display();
//   }
//   i = 0;
// }
