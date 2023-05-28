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
let acceptingGrades;



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
        'Authorization': 'Token '+getCookie("token"),
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
        'Authorization': 'Token '+getCookie("token"),
    },

    })
      .then(response => response.json())
      .then(data => {
        userID = data.id; // Assign the retrieved grades data to the grades variable
        document.cookie = "id="+userID;
      });
  }

function fetchAcceptingGrades(){
    return fetch('http://127.0.0.1:8000/subjects/acceptingGrades', {
    method: 'GET',
    headers: {

        'Content-Type': 'application/json',
        'Authorization': 'Token '+getCookie("token"),
    },

    })
      .then(response => response.json())
      .then(data => {
        acceptingGrades = data; // Assign the retrieved grades data to the grades variable
      });
}

function PostGrades(requestBody){
    return fetch('http://127.0.0.1:8000/grades/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+getCookie("token"),
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
            console.log('Post request successful:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}


Promise.all([fetchUserData(), fetchGradesData(), fetchSubjectsData(), fetchUserID(), fetchUserGrades(), fetchAcceptingGrades()])
  .then(() => {

    // Both fetch requests have completed, and the data is available
    // console.log(users);
    //console.log(subjects);
    // console.log(grades);
    // console.log(userID);
    // Find the grades for the user with ID 2
    console.log(getCookie("id"));
    console.log(getCookie("token"));
    console.log(acceptingGrades);

    const mergedTable = subjects.reduce((acc, subject) => {
        const grade = userGrad.find(userGrad => userGrad.subject === subject.id);
        if (grade) {
          acc.push({ subject: subject.subject_name, grade: grade.student_grades });
        }
        return acc;
      }, []);

      console.log(mergedTable);
    if (window.location.pathname.includes("table.html")) {
    TableCreate(mergedTable);
    }
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



function TableCreate(mergedTable) {

    var table = new Tabulator("#example-table", {
        data: mergedTable,
        layout: "fitColumns",
        responsiveLayout: "hide",
        addRowPos: "bottom",
        history: true,
        rowFormatter:function(row){
        row.getElement().style.backgroundColor = "#3B3486";
        },
      columns: [
        {title:"Subject", field:"subject", editor:"input", headerSort:false, formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
        }},
        {title:"Grade", field:"grade", width:95, editor:"input", formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return "<span style='color:#ffffff;'>" + value + "</span>";
        },
        mutator: function(value) {
            // Convert the grade value to an integer
            return parseInt(value);
        }},
      ],
    });
  
    // Create the "Add Row" button
    var dropdown = document.createElement("select");
    dropdown.style.padding = "6px 12px";
    dropdown.style.backgroundColor = "#ffc107";
    dropdown.style.color = "#3B3486";
    dropdown.style.fontSize = "1rem";
    dropdown.style.whiteSpace = "nowrap";
    dropdown.style.margin = "20px 20px 0 90vw";
    dropdown.style.borderRadius = "10px";
    dropdown.style.border = "1px solid #3B3486";
    dropdown.style.cursor = "pointer";
    dropdown.style.display = "block";
  
    // Add option for each subject
    acceptingGrades.forEach(function (acceptingGrades) {
      var option = document.createElement("option");
      option.value = acceptingGrades.id;
      option.textContent = acceptingGrades.subject_name;
      dropdown.appendChild(option);
    });
  
    // Add event listener to the dropdown
    dropdown.addEventListener("change", function () {
      var selectedSubjectId = dropdown.value;
      var selectedSubject = subjects.find(function (acceptingGrades) {
        return acceptingGrades.id === Number(selectedSubjectId);
      });
      if (selectedSubject) {
        table.addRow({ subject: selectedSubject.subject_name, grade:"0" });
      }
    });
  // Create the "Submit" button
    var addButton = document.createElement("button");
    addButton.textContent = "Submit";
    addButton.style.padding = "6px 12px";
    addButton.style.backgroundColor = "#ffc107";
    addButton.style.color = "#3B3486";
    addButton.style.fontSize = "1rem";
    addButton.style.whiteSpace = "nowrap";
    addButton.style.margin = "20px 20px 0 90vw";
    addButton.style.borderRadius = "10px";
    addButton.style.border = "1px solid #3B3486";
    addButton.style.cursor = "pointer";
    addButton.style.display = "block";
    addButton.addEventListener("click", function () {
        let datatable = table.getData();
        console.log(datatable);
        const SubmitTable = datatable.map(datatable => {
            const subject = subjects.find(sub => sub.subject_name === datatable.subject);
            return { student_grades: datatable.grade, subject: subject ? subject.id : '', student: getCookie("id") };
          });
        console.log(SubmitTable);
        SubmitTable.forEach(element => {
            PostGrades(element);
        });
    });

    // Add the button to the document
    document.body.appendChild(addButton);
    // Add the dropdown to the document
    document.body.appendChild(dropdown);
  
  }

  Promise.all([fetchUserData(), fetchGradesData(), fetchSubjectsData(), fetchUserID(), fetchUserGrades(), fetchAcceptingGrades()])
  .then(() => {
    if (window.location.pathname.includes("chart.html")) {
        document.getElementById("main1").innerHTML = `    
        <div id="chart_panel"> 
        <div class="dropdown"> 
        <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content" id="dropdown_list">
                <!--                script there-->
            </div>
        </div>
        <div id="norm_panel">
            <label class="container">Норм
                <input type="checkbox" id="norm_checkbox">
                <span class="checkmark"></span>
            </label>
            <label class="container">Медіана: </label>
            <label class="container" id="mediana"></label>
            <label class="container">Стандартне відхилення: </label>
            <label class="container" id="std"></label>
        </div>
        <label class="container">Загальне
            <input type="checkbox" id="chart_checkbox">
            <span class="checkmark"></span>
        </label>
    </div>
    <div>
        <div id="subject_name">
    
        </div>
        <div class="canvas_div">
            <canvas id="personalChart"></canvas>
            <canvas id="norm_line"></canvas>
    
        </div>
    
    </div>
    
    `;
        }
    
        
    function compareNumbers(a, b) {
        return a - b;
    }
    function getGradesFromData(obj) {
        var grades1 = [];
    
        for (const grade of grades) {
            grades1.push(grade.student_grades)
        }
        return grades1.sort(compareNumbers);
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

    Chart.defaults.color = '#FFE9B1';
    new Chart("myChart",
        {
            type: "bar",
            data: {
                labels: ["60-70", "71-80", "81-90", "91-100"],
                datasets: [{
                    label: 'Total grades',
                    backgroundColor: "#FFE9B1",
                    borderRadius: 15,
                    fontColor: "#FCFDF2",
                    borderWidth: 4,
                    data: getAmountOfGrades(getGradesFromData(grades)),
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

    document.getElementById('total_grades').innerHTML = `<p>Всього оцінок: ${getGradesFromData(grades).length}</p>`
    
    
    const ctx = document.getElementById('personalChart');
    let chartData = [];
    let chartData1 = [];
    let chartData2 = [];
    let grades_for_chart =[];
    let grades_for_chart1=[];
    let grades_for_chart2=[];
    Chart.defaults.color = '#FFE9B1';
    var graph = document.getElementById('norm_line');
    
    let norm_line = new Chart(graph, {
        type: 'bar',
        data: {
            labels: ["60-70", "71-80", "81-90", "91-100"],
            datasets: [{
                label: 'Amount of grades',
                data: chartData1,
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
    document.getElementById('norm_line').style.display = 'none';
    let char = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["60-70", "71-80", "81-90", "91-100"],
            datasets: [{
                label: 'Amount of grades',
                data: chartData1,
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
        let grades_amount1 = [];
        let grades_amount2 = [];
        for (const filteredGrade of filtered_grades) {
            grades_amount.push(filteredGrade.student_grades)
            for (const user of users) {
                    if(filteredGrade.student === user.id){
                        if (user.study_group === 3){
                            grades_amount1.push(filteredGrade.student_grades);
                        } else if (user.study_group === 4){
                            grades_amount2.push(filteredGrade.student_grades);
                        }
                    }
            }
    
        }
        let subject = subjects.filter(subject => subject_ID === subject.id)
        document.getElementById(`subject_name`).innerHTML = `<p>${subject[0].subject_name}</p>`;
        grades_for_chart1 = getAmountOfGrades(grades_amount1);
        grades_for_chart2 = getAmountOfGrades(grades_amount2);
        grades_for_chart = getAmountOfGrades(grades_amount)
        chartData = grades_for_chart;
        chartData1 = grades_for_chart1;
        chartData2 = grades_for_chart2;
        char.destroy()
    
        let checkbox = document.getElementById('chart_checkbox');
    
            if (checkbox.checked) {
                char = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["60-70", "71-80", "81-90", "91-100"],
                        datasets: [{
                            label: 'All groops',
                            data: chartData,
                            backgroundColor: "#FFE9B1",
                            borderWidth: 5,
                            borderRadius: 30,
                            borderColor: "#ebd6a2"
    
                        }
                        ]
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
            else {
                char = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ["60-70", "71-80", "81-90", "91-100"],
                            datasets: [{
                                label: 'Amount of grades',
                                data: chartData1,
                                backgroundColor: "#FFE9B1",
                                borderWidth: 5,
                                borderRadius: 30,
                                borderColor: "#ebd6a2"
    
                            },
                                {
                                    label: 'Amount of grades',
                                    data: chartData2,
                                    backgroundColor: "#b4ff85",
                                    borderWidth: 5,
                                    borderRadius: 30,
                                    borderColor: "#9cde73"
    
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
        var xValues = grades_amount.sort((a,b) => a-b);
    
    
        document.getElementById('norm_line').style.top = '-' + document.getElementById('personalChart').style.height;
        document.getElementById('norm_line').style.width = document.getElementById('personalChart').style.width;
        document.getElementById('norm_line').style.width = (parseInt(document.getElementById('norm_line').style.width) - 50) + "px";
        document.getElementById('norm_line').style.marginLeft = '22%';
    
        document.getElementById('norm_line').style.height = document.getElementById('personalChart').style.height;
        document.getElementById('norm_line').style.height = (parseInt(document.getElementById('norm_line').style.height) - 50) + "px";
    
    
    
        function calculateStandardDeviation(data) {
            // Вычисляем дисперсию
            const variance = calculateVariance(data);
    
            // Вычисляем квадратный корень из дисперсии
            const standardDeviation = Math.sqrt(variance);
    
            return standardDeviation;
        }
    
        function calculateVariance(data) {
            // Вычисляем среднее значение
            const mean = calculateMean(data);
    
            // Вычисляем квадрат разности для каждого значения
            const squaredDifferences = data.map((value) => Math.pow(value - mean, 2));
    
            // Вычисляем среднее значение квадратов разностей
            const variance = calculateMean(squaredDifferences);
    
            return variance;
        }
    
        function calculateMean(data) {
            const sum = data.reduce((acc, value) => acc + value, 0);
            const mean = sum / data.length;
            return mean;
        }
    
    
    // Пример использования
    
    
        var yValues = [];
        var mean = calculateMean(grades_amount.sort((a,b) => a-b))
        var stdDev = calculateStandardDeviation(grades_amount.sort((a,b) => a-b))
        for (var i = 0; i < xValues.length; i++) {
            var x = xValues[i];
            var y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
            yValues.push(y);
        }
    
        let data = {
            labels: xValues,
            datasets: [{
                data: yValues,
                fill: false,
                borderColor: '#f7b24a',
                tension: 0.1
            }]
        };
    
        var options = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false,
                    title: {
                        display: false,
                        text: 'Значение'
                    }
                },
                y: {
                    display: false,
                    title: {
                        display: false,
                        text: 'Плотность вероятности'
                    }
                }
            }
        };
    
        document.getElementById('mediana').innerHTML = calculateMean(grades_amount.sort((a,b) => a-b)).toFixed(2);
        document.getElementById('std').innerHTML = calculateStandardDeviation(grades_amount.sort((a,b) => a-b)).toFixed(2);
    
    
        let norm_checked = document.getElementById('norm_checkbox');
        if (norm_checked.checked) {
    
            document.getElementById('norm_line').style.display = 'true';
            norm_line.destroy();
            norm_line = new Chart(graph, {
                type: 'line',
                data: data,
                options: options
            });
       }
        else {
            document.getElementById('norm_line').style.display = 'none';
        }
    
    
    }
    // for (const subject of subjects) {
    //     document.getElementById('dropdown_list').innerHTML += `<a id="subject_name_in_list_${subject.id}">${subject.subject_name}</a>`;
    //     document.getElementById(`subject_name_in_list_${subject.id}`).addEventListener( "click", () => confirmSubject(subject.id));
    // }
    for (const subject of subjects) {
        const anchorElement = document.createElement('a');
        anchorElement.textContent = subject.subject_name;
        anchorElement.addEventListener('click', () => confirmSubject(subject.id));
        document.getElementById('dropdown_list').appendChild(anchorElement);
      }
  })
