

function w3_open() {
    document.getElementById("main").style.marginLeft = "10%";
    document.getElementById("main").style.width = "90%";
    document.getElementById("main1").style.width = "90%";
    document.getElementById("main1").style.marginLeft = "10%";
    document.getElementById("mySidebar").style.width = "10%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
      document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("main1").style.marginLeft = "0%";
      document.getElementById("main1").style.width = "100%";
        document.getElementById("main").style.width = "100%";
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("openNav").style.display = "inline-block";
}
var tabledata = [
    {id:1, name:"Kasatkin Anatolii", subject:"CS", grade:97},
    {id:2, name:"Volodymyr Matus", subject:"PTZA", grade:92},
    {id:3, name:"Pylypchuk Anton", subject:"SPZ", grade:73},
    {id:4, name:"Evgeniy Matvienko", subject:"OPD", grade:88},
    {id:5, name:"Kosyak Andrii", subject:"PTZA", grade:80},

];






function respoonseOpen(){
    document.getElementById("blur").style.display = "block";
    document.getElementById("responseOpen").style.display = "none";
    document.getElementById("overlay").style.display = "block";
    window.scrollTo(0, -200);
}
function respoonseClose(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("blur").style.display = "none";
    document.getElementById("responseOpen").style.display = "block";
}



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
    rowFormatter:function(row){
            row.getElement().style.backgroundColor = "#3B3486";
    },
    columns:[                 //define the table columns
        {title:"ID", field:"id",  width:50, editor:"input", formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
         }},
        {title:"Name", field:"name", width:150, formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
         }},
        {title:"Subject", field:"subject", editor:"input", headerSort:false, formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
         }},
        {title:"Grade", field:"grade", width:95, editor:"input", formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
         }},

    ],
});
// document.getElementById("add-row").addEventListener("click", function(){
//     table.addRow({}, false);
// });




function compareNumbers(a, b) {
    return a - b;
}
function getGradesFromData(obj) {
    var grades = [];

    for (let i = 0; i < obj.length; i++) {
        grades.push(Object.values(obj[i])[3]);
    }
    return grades.sort(compareNumbers);
}


function getIdFromData(obj) {
    var id = [];

    for (let i = 0; i < obj.length; i++) {
        id.push(Object.values(obj[i])[0]);
    }
    return id.sort(compareNumbers);
}

function getAmountOfGrades(grades) {
    var amount = [];
    var grade60 = 0;
    var grade70 = 0;
    var grade80 = 0;
    var grade90 = 0;

    for (let i = 0; i < grades.length; i++) {
        if (grades[i] >= 60 & grades[i] <= 70) {
            grade60 += 1;
        }
        else if (grades[i] >= 71 & grades[i] <= 80) {
            grade70 += 1;
        }
        else if (grades[i] >= 81 & grades[i] <= 90) {
            grade80 += 1;
        }
        else if (grades[i] >= 91 & grades[i] <= 100) {
            grade90 += 1;
        }
    }

    amount.push(grade60,grade70,grade80, grade90);
    return amount;
}

new Chart("myChart",
    {
        type: "bar",
        data: {
            labels: ["60-70", "71-80", "81-90", "91-100"],
            datasets: [{
                label: 'Amount of students',
                backgroundColor: "#FFE9B1",
                borderRadius: 15,
                fontColor: "#FCFDF2",
                borderWidth: 4,
                data: getAmountOfGrades(getGradesFromData(tabledata)),
            }]
        },
        options: {
            title: {
                display: true,
                text: "Distribution",
                fontColor: "#FCFDF2"
            },
            legend: {
                labels: {
                    fontColor: "#FCFDF2"
                },
            },
            scales: {
                yAxes: [{

                    ticks: {

                        fontColor: "#FCFDF2"
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#FCFDF2"
                    },
                }]
            }
        }
    });

let subjects = [
        {
            id: 1,
            "subject_name": "Math",
            "is_private": false,
            "accept_grades": true
        },
        {
            "id": 2,
            "subject_name": "KS",
            "is_private": false,
            "accept_grades": false
        },
        {
            "id": 3,
            "subject_name": "PTZA",
            "is_private": false,
            "accept_grades": true
        },
        {
            "id": 4,
            "subject_name": "SPZ",
            "is_private": false,
            "accept_grades": true
        }
    ]
let users = [
    {
        "id": 2,
        "email": "skete2002@gmail.com",
        "username": "pilcher",
        "study_group": {
            "id": 1,
            "study_group_name": "123"
        }
    },
    {
        "id": 3,
        "email": "example1@example.com",
        "username": "user1",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 4,
        "email": "example2@example.com",
        "username": "user2",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 5,
        "email": "example3@example.com",
        "username": "user3",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 6,
        "email": "example4@example.com",
        "username": "user4",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 7,
        "email": "example5@example.com",
        "username": "user5",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 8,
        "email": "example6@example.com",
        "username": "user6",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 9,
        "email": "example7@example.com",
        "username": "user7",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 10,
        "email": "example8@example.com",
        "username": "user8",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 11,
        "email": "example9@example.com",
        "username": "user9",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 12,
        "email": "example10@example.com",
        "username": "user10",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 13,
        "email": "example11@example.com",
        "username": "user11",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    },
    {
        "id": 14,
        "email": "example12@example.com",
        "username": "user12",
        "study_group": {
            "id": 1,
            "study_group_name": ""
        }
    },
    {
        "id": 15,
        "email": "example13@example.com",
        "username": "user13",
        "study_group": {
            "id": 2,
            "study_group_name": ""
        }
    }
]

const ctx = document.getElementById('personalChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

