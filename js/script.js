
function w3_open() {
    document.getElementById("main").style.marginLeft = "10%";
    document.getElementById("mySidebar").style.width = "10%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("openNav").style.display = "inline-block";
}
var tabledata = [
    {id:1, name:"Anatolii Kasatkin", subject:"CS", grade:100},
    {id:2, name:"Volodymyr matus", subject:"PTZA", grade:110},

];

var chartData = [
    {id:1, grade:100},
    {id:2, grade:110}
]



var table = new Tabulator("#example-table", {
    data:tabledata,           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    //pagination:"local",       //paginate the data
    //paginationSize:7,         //allow 7 rows per page of data
    //paginationCounter:"rows", //display count of paginated rows in footer
    movableColumns:true,      //allow column order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"name", dir:"asc"},
    ],
    //columnDefaults:{
    //    tooltip:true,         //show tool tips on cells
    //},
    columns:[                 //define the table columns
        {title:"ID", field:"id",  width:50, editor:"input"},
        {title:"Name", field:"name", editor:"input"},
        {title:"Subject", field:"subject", editor:"input", headerSort:false},
        {title:"Grade", field:"grade", width:95, editor:"input"},

    ],
});
document.getElementById("add-row").addEventListener("click", function(){
    table.addRow({}, false);
});



var barColors = ["red", "green","blue","orange","brown"];
var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
new Chart("myChart",
    {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: "lightblue",
                data: yValues
            }]
        },
        options: {
            legend: {
                display: true,
                labels: xValues
            },
            title: {
                display: true,
                text: "Chart"
            }
        }
    });



