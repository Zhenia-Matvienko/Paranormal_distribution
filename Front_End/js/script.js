let subject_id;
function LogIn(){
    // Get the form input values
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
  
    // Create the request body
    var requestBody = {
      username: username,
      password: password
    };
  
    // Send the login request
    fetch('http://127.0.0.1:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response
        if (data && data.auth_token) {
          // Token exists, do something with it
          var token = data.auth_token;
          document.cookie = "token=" + token;
          let x = document.cookie;
          // Perform further actions with the token
          window.location.href = 'index.html'; // Redirect to index.html
        } else {
          // No token found or an error occurred
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }


    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }


let users;
let subjects;
let grades;
let userID;
let userGrad;
function fetchUserData() {
  return fetch('http://127.0.0.1:8000/users/')
    .then(response => response.json())
    .then(data => {
      users = data; // Assign the retrieved user data to the user variable
    });
}

function fetchSubjectsData() {
    return fetch('http://127.0.0.1:8000/subjects/')
      .then(response => response.json())
      .then(data => {
        subjects = data; // Assign the retrieved grades data to the grades variable
      });
  }

function fetchGradesData() {
  return fetch('http://127.0.0.1:8000/grades/')
    .then(response => response.json())
    .then(data => {
      grades = data; // Assign the retrieved grades data to the grades variable
    });
}
function fetchUserGrades(){

    return fetch('http://127.0.0.1:8000/grades/student/'+getCookie("id")+"/", {
    method: 'GET',
    headers: {
        
        'Content-Type': 'application/json',
        'Authorization': 'Token 3719cdebcd1e1429160b0fde26572b4b819fc78a'
    },

    })
      .then(response => response.json())
      .then(data => {
        userGrad = data; // Assign the retrieved grades data to the grades variable
      });
}
function fetchUserID() {
    return fetch('http://127.0.0.1:8000/auth/users/me/', {
    method: 'GET',
    headers: {
        
        'Content-Type': 'application/json',
        'Authorization': 'Token 3719cdebcd1e1429160b0fde26572b4b819fc78a'
    },

    })
      .then(response => response.json())
      .then(data => {
        userID = data.id; // Assign the retrieved grades data to the grades variable
        document.cookie = "id="+userID;
      });
  }
Promise.all([fetchUserData(), fetchGradesData(), fetchSubjectsData(), fetchUserID(), fetchUserGrades()])
  .then(() => {
    // Both fetch requests have completed, and the data is available
    // console.log(users);
    console.log(subjects);
    // console.log(grades);
    // console.log(userID);
    // Find the grades for the user with ID 2
    console.log(getCookie("id"));
    const userGrades = grades.filter(grade => grade.student === userID);
    console.log(userGrad);
    console.log(userGrades);
    const mergedTable = subjects.map(subject => {
        const grade = grades.find(grade => grade.subject === subject.id);
        return { subject: subject.subject_name, grade: grade ? grade.student_grades : "" };
    })
    //console.log(mergedTable)
    var table = new Tabulator("#example-table", {
        data:mergedTable,           //load row data from array
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
            {title:"Subject", field:"subject", editor:"input", headerSort:false, formatter:function(cell, formatterParams){
                    var value = cell.getValue();
                    return "<span style='color:#ffffff;'>" + value + "</span>";
                }},
            {title:"Grade", field:"grade", width:95, editor:"input", formatter:function(cell, formatterParams){
                    var value = cell.getValue();
                    return "<span style='color:#ffffff;'>" + value + "</span>";
                }},
    
        ],
    })
  .catch(error => {
    console.error('Error:', error);
  });
});

      

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



// var table = new Tabulator("#example-table", {
//     data:tabledata,           //load row data from array
//     layout:"fitColumns",      //fit columns to width of table
//     responsiveLayout:"hide",  //hide columns that dont fit on the table
//     addRowPos:"top",          //when adding a new row, add it to the top of the table
//     history:true,             //allow undo and redo actions on the table
//     //pagination:"local",       //paginate the data
//     //paginationSize:7,         //allow 7 rows per page of data
//     //paginationCounter:"rows", //display count of paginated rows in footer
//     movableColumns:true,      //allow column order to be changed
//     initialSort:[             //set the initial sort order of the data
//         {column:"name", dir:"asc"},
//     ],
//     //columnDefaults:{
//     //    tooltip:true,         //show tool tips on cells
//     //},
//     rowFormatter:function(row){
//         row.getElement().style.backgroundColor = "#3B3486";
//     },
//     columns:[                 //define the table columns
//         {title:"ID", field:"id",  width:50, editor:"input", formatter:function(cell, formatterParams){
//                 var value = cell.getValue();
//                 return "<span style='color:#ffffff;'>" + value + "</span>";
//             }},
//         {title:"Name", field:"name", width:150, formatter:function(cell, formatterParams){
//                 var value = cell.getValue();
//                 return "<span style='color:#ffffff;'>" + value + "</span>";
//             }},
//         {title:"Subject", field:"subject", editor:"input", headerSort:false, formatter:function(cell, formatterParams){
//                 var value = cell.getValue();
//                 return "<span style='color:#ffffff;'>" + value + "</span>";
//             }},
//         {title:"Grade", field:"grade", width:95, editor:"input", formatter:function(cell, formatterParams){
//                 var value = cell.getValue();
//                 return "<span style='color:#ffffff;'>" + value + "</span>";
//             }},

//     ],
// });
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
    let amount = [];
    let grade60 = 0;
    let grade70 = 0;
    let grade80 = 0;
    let grade90 = 0;

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



// document.getElementById('subject_name').innerHTML += `<p>${subjects[0].subject_name}</p>`;
for (const subject of subjects) {
    document.getElementById('dropdown_list').innerHTML += `<a href="#" onclick="confirmSubject(${subject.id})" id="subject_name_in_list_${subject.id}">${subject.subject_name}</a>`;
}


const data = {
    id: 1,
    email: "example1@gmail.com",
    username: "user1",
    study_group: {
        id: 1,
        study_group_name: "123"
    }
};

const studyGroupIds = [1, 2];

for (let i = 0; i < 15; i++) {
    let studyGroupId = studyGroupIds[(i % 2) ];
    let newData = { ...data };

    newData.id = i + 1;
    newData.email = `example${i + 1}@gmail.com`;
    newData.username = `user${i + 1}`;
    console.log(studyGroupId + '-')
    newData.study_group = {...data.study_group}
    newData.study_group.id = studyGroupId;
    users.push(newData);
}

console.log(users)

const ctx = document.getElementById('personalChart');
let chartData = []
let grades_for_chart=[];

let char = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["60-70", "71-80", "81-90", "91-100"],
        datasets: [{
            label: '# of Votes',
            data: chartData,
            backgroundColor: "#FFE9B1",
            borderWidth: 5,
            borderRadius: 30,
            borderColor: "#ebd6a2"

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
let confirmSubject = (subject_ID) => {
    subject_id = subject_ID;
    let filtered_grades = grades.filter(grade => subject_id === grade.subject);
    let grades_amount = [];
    for (const filteredGrade of filtered_grades) {
        grades_amount.push(filteredGrade.student_grades);
    }
    grades_for_chart = getAmountOfGrades(grades_amount);
    console.log(grades_for_chart)
    Chart.defaults.color = '#FFE9B1';
    chartData= grades_for_chart;
    char.destroy()
    char = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["60-70", "71-80", "81-90", "91-100"],
            datasets: [{
                label: '# of Votes',
                data: chartData,
                backgroundColor: "#FFE9B1",
                borderWidth: 5,
                borderRadius: 30,
                borderColor: "#ebd6a2"

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

}










