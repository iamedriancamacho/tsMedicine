class Medicine {
  readonly id: number;
  readonly brandN: string;
  readonly genN: string;
  stock: number;
  p: number;

  constructor(id: number, b: string, g: string, s: number, p: number) {
    this.id = id;
    this.brandN = b;
    this.genN = g;
    this.stock = s;
    this.p = p;
  }
}
//my class
let invoice: Medicine[] = [];
let id: number = 0;
let idtoDelete: any;
var table = document.getElementById("table");

let t1 = new Medicine(1, "Coreg tablets", "carvedilol", 25, 65);
let t2 = new Medicine(2, "Buspar", "buspirone tablet", 63, 23.76);
let t3 = new Medicine(3, "Ziac", "bisoprolol/HCTZ", 72, 99);
let t4 = new Medicine(4, "Bentyl", "dicyclomine", 12, 80);
invoice.push(t1);
invoice.push(t2);
invoice.push(t3);
invoice.push(t4);
display();

//function: for submission
function submit(): void {
  let Bname: string = (<HTMLInputElement>document.getElementById("BN")).value;
  let Gname: string = (<HTMLInputElement>document.getElementById("GN")).value;
  let S: number = (<HTMLInputElement>document.getElementById("Stk"))
    .valueAsNumber;
  let P: number = (<HTMLInputElement>document.getElementById("Price"))
    .valueAsNumber;
  if (Bname == "" || Gname == "" || S.toString() == "" || P.toString() == "") {
    alert("NO INPUTS");
    return null;
  } else {
    id = invoice.length;
    id++;

    var verify: boolean = true;
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
      let invOne = new Medicine(id, Bname, Gname, S, P);
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
function restartRow(): void {
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
function display(): void {
  restartRow();

  console.log("this is display function");

  invoice.forEach((x) => {
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
  var rows = table?.getElementsByTagName("tr");
  var x = rows?.length;
  for (var i = 1; i < x!; i++) {
    console.log(i);
    var currentRow = table!.rows[i];
    var createClickHandler = function (row: any) {
      return function (): void {
        var cell = row.getElementsByTagName("td")[0];
        idtoDelete = cell.innerHTML;
        if (idtoDelete == undefined) {
          alert("choose a brand");
          return;
        } else alert("id:" + idtoDelete);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}
//function: captures the ID
function pickID(): number {
  if (idtoDelete == undefined) {
    alert("Error: Please choose a brand");
    return 1;
  } else {
    console.log("index: " + idtoDelete);
    return 0;
  }
}
//function: deletes a row
function onDelete(): void {
  if (!pickID()) {
    var index = invoice.findIndex(function (o: any) {
      return o.id == idtoDelete;
    });
    if (index !== -1) invoice.splice(index, 1);
    idtoDelete = null;
    alert('Deleted successfully! tap "Medicine Info" for an updated database');
    display();
  }
}
//function: updates the price
function updatePrice(): void {
  if (!pickID()) {
    invoice.map(function (element) {
      if (element.id == idtoDelete) {
        var p: string = prompt("Enter price for " + element.brandN + " :", "");
        element.p = parseFloat(p);
        alert(
          "Product " +
            "'" +
            element.brandN +
            "'" +
            "has been updated successfully!"
        );
        idtoDelete = null;
        display();
        return element;
      }
    });
  }
}
//function: sells medicine
function sellMed(): void {
  if (!pickID()) {
    invoice.map(function (element) {
      if (element.id == idtoDelete) {
        var p: string = prompt(
          "How many " + element.brandN + " do you want to sell?",
          ""
        );
        if (p > element.stock.toString()) {
          alert(
            "Error: your input exceeds to the available stocks. Please try again"
          );
        } else {
          element.stock -= parseFloat(p);
          alert(
            "Sold successfully! Please tap 'Medicine Info' for an updated database."
          );
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
