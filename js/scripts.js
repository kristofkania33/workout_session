//assign dom objects to variables

var addWorkout = document.getElementById('addWorkout'),
    workout_name = document.getElementById('workout_name'),
    workout_time = document.getElementById('workout_time'),
    first_workout = document.getElementById('first_workout'),
    show_time = document.getElementById('show_time'),
    excercises = document.getElementById('excercises'),
    create_workout_set = document.getElementById('create_workout_set'),
    set_workout = document.getElementById('set_workout');

//create empty set of exercises
    var excercises_set = [];

//function responsible for creating single workout
function Workout(name,time) {
   this.name = name;
   this.time = time;
}
var train = new Workout(workout_name.value, workout_time.value);
console.log(train);


//function responsible for creating workout session
function Session () {

  //funtion for generating workout list from exercises array

    function generateSet() {
  
      //empty excersises DOM container
      excercises.innerHTML = "";
  
      //add single workouts to DOM table
      excercises_set.map(function(item) {
    
      var excercise1 = document.createElement("tr"); //create row
      var column = document.createElement("td"); //create one column
    
      column.innerText = 'Trening: ' + item.name + ' - czas trwania: ' + item.time + '';
    
      excercise1.appendChild(column);
      excercises.appendChild(excercise1);

    
      });
    }

    //function for running a workout session
  function startTimer() {
      
   //count time needed for completing whole session 
     var time = excercises_set.reduce(function(sum, item) {
        return sum + Number(item.time);
     }, 0);

   //set present workout to the first workout from the array
     var present_workout = 0;
   
   //get time needed for completing the first workout
     var time_left = excercises_set[present_workout].time;
     
   //update counter 
    function update() {
     
      if(time === 0) { //if time has runned out
      
       clearInterval(timer); //stop interval

       workout_name.value = "";
       workout_time.value = "";
       
       //set html elements
       set_workout.style.display = 'block';
       addWorkout.style.display = 'block';
       workout_name.style.display = 'block';
       workout_time.style.display = 'block';
       create_workout_set.style.display = 'block';
           show_time.innerText = 'Gratulacje. Trening zakończony. Twoja forma rośnie!';
           first_workout.innerText = 'Stworzysz nowy zestaw ćwiczeń?'
       
       //empty exercises array
       excercises_set = [];
       generateSet(); //regenerate HTML view

      }
       else if(time_left === 0) { //workout time has ended
    
      present_workout++; //pointer for new workout from the list
          if(excercises_set[present_workout]) {
       time_left = excercises_set[present_workout].time; //calculate time for new workout
         }
        else {
        clearInterval(timer); //stop interval
        alert('Error!');
        return false;
        }
     }
      
      else {
       
        //update workut info
          first_workout.innerText = 'Twoje cwiczenie: >>' + excercises_set[present_workout].name + '<<';
          show_time.innerText = 'Czas start: >> ' + time_left-- + ' !   <<  Odliczamy!';
       
        //update time needed for completing workout 
          
         time--;
      }
    }
   

      var timer = setInterval(update,1000); //set interval (update status every second)
  }
  //addWorkout click event -> click to add workout
   
    addWorkout.click(function(){
           add_Workout();
    });

   function add_Workout(train) {
   
  //check typeof workout_time hier, if it's not a number convert it to number , if you can't do it show Error
  
  var is_number = workout_time.value;

  if(is_number < 0) {

            alert('Error. Czas trwania cwiczenia nie moze byc liczbą ujemną.');
            //return false;

  } else if (typeof is_number === "number" && isNaN(is_number) === false) {
    
    //push new workout to array
        excercises_set.push({name: workout_name.value, time: workout_time.value});
  
      //regenerate HTML view
        generateSet();
       
  } else if (typeof is_number !== "number") {
       // convert to number
       var new_value = parseInt(is_number);
       if (typeof new_value === "number" && isNaN(new_value) === false) {

            //push new workout to array
              excercises_set.push({name: workout_name.value, time: new_value});
  
            //regenerate HTML view
             generateSet();
        } 
        else  {
            alert('Error! To nie liczba!');
          return false;
        }
  }
}

/* EVENT LISTENERS */

//createWorkoutSet click event -> click to start session
create_workout_set.click (function(){
           create_set();
    });
var length = excercises.length;

function create_set(length) {
  
  if (length == 0) { //if there are no exercises
    set_workout.style.display = 'block';
    addWorkout.style.display = 'block';
    workout_name.style.display = 'block';
    workout_time.style.display = 'block';
    create_workout_set.style.display = 'block';
    
  }
  else { 
    set_workout.style.display = 'none';
    create_workout_set.style.display ='none';
    startTimer(); 
  }
  
}

}

