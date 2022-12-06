//Get the field to validate the view to display
let option = $("#optionView").val();

document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (option == "symbols") {
      loadSymbols();
    } else {
      loadHistorical();
    }
  },
  false
);

//methods for list and filter all symbol.json
function loadSymbols() {
  $.ajax({
    type: "GET",
    url: "http://localhost:9090/api/symbols",
    success: function (data) {
      //console.log(JSON.parse(JSON.stringify(data.symbolsList)));
      //We get the data from the json symbols and parse it to be able to paint it in a table
      let symbols = JSON.parse(JSON.stringify(data.symbolsList));

      let html = "";
      for (let i = 0; i < symbols.length; i++) {
        html +=
          "<tr><td>" +
          symbols[i].symbol +
          "</td><td>" +
          symbols[i].name +
          "</td><td>" +
          symbols[i].price +
          "</td></tr>";
      }
      $("#bodySymbols").append(html);
      $("#tableSymbols").DataTable({
        searching: false,
        lengthChange: false,
      });
    },
  });
}

function searchSymbol() {
  Swal.fire({
    title: "Enter the name of the symbol",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Search",
    showLoaderOnConfirm: true,
    preConfirm: (symbol) => {
      if (symbol) {
        return fetch(`http://localhost:9090/api/symbols/${symbol}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Message error: ${error}`);
          });
      } else {
        Swal.showValidationMessage(`You must enter a Symbol to search for it`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(JSON.parse(JSON.stringify(result)));
      let symbol = JSON.parse(JSON.stringify(result.value));

      //question if symbol.message exists
      if (symbol.message) {
        Swal.fire({
          title: ` Error !! : ${symbol.message}`,
        });
      } else {
        Swal.fire({
          title: `Symbol : ${symbol.symbol} 
         </br> Name: ${symbol.name} 
         </br> Price: ${symbol.price}`,
        });
      }
    }
  });
}

//methods for list and filter all historical.json
function loadHistorical() {
  $.ajax({
    type: "GET",
    url: "http://localhost:9090/api/historical",
    success: function (data) {
      //console.log(JSON.parse(JSON.stringify(data.symbolsList)));
      let historicals = JSON.parse(JSON.stringify(data.historicalStockList));

      //console.log(historicals);

      let html = "";
      for (let i = 0; i < historicals.length; i++) {
        for (let j = 0; j < historicals.length; j++) {
          html +=
            "<tr><td>" +
            historicals[i].symbol +
            "</td><td>" +
            [j + 1] +
            "</td><td>" +
            historicals[i].historical[j].date +
            "</td><td>" +
            historicals[i].historical[j].close +
            "</td></tr>";
        }
      }
      $("#bodyHistoricals").append(html);
      $("#tableHistoricals").DataTable({
        searching: false,
        lengthChange: false,
      });
    },
  });
}

function searchHistorical() {
  Swal.fire({
    title: "Enter the name of the symbol and N°",
    html:
      '<input id="swal-input1-symbol" class="swal2-input">' +
      '<input id="swal-input2-nro" class="swal2-input">',
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Search",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      symbol = $("#swal-input1-symbol").val();
      nro = $("#swal-input2-nro").val();
      if (symbol && nro) {
        return fetch(`http://localhost:9090/api/historical/${symbol}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Message error: ${error}`);
          });
      } else {
        Swal.showValidationMessage(
          `You must enter a symbol and Historical Number to search for it`
        );
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(JSON.parse(JSON.stringify(result)));
      let symbol = JSON.parse(JSON.stringify(result.value));

      //question if symbol.message exists and we subtract a position to obtain the position of the historical
      if (symbol.message) {
        Swal.fire({
          title: ` Error !! : ${symbol.message}`,
        });
      } else {
        Swal.fire({
          title: `Symbol : ${symbol.symbol} 
         </br> Date: ${symbol.historical[nro - 1].date} 
         </br> Close: ${symbol.historical[nro - 1].close}`,
        });
      }
    }
  });
}
