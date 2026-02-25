
# DELUGE INTRODUCTION 

## why deluge:
* scripting language by Zoho
* cloudbased hence  no complitaion required, 
        bcs it runs in its online server and gets executed there
* very lowcode, almost like plain english 
* used extensively , is a onestop to perform diff tasks
* highly supported
* no need for code frontend intergration, only business logic
* has AI powered abilities

## rules of creating a variable:
use a ; to show end of a line, its executed line by line

* names must begin with a letter or underscore_: 
    *total or Total or _total = 343  is ok        
    *1total = 343 is wrong, 
    *(total) = 343 is wrong, &total = 343  is wrong,

* cant use a name using keyword eg function ??*
* variable names must be meaningful/descriptive eg totalSalary = 1000;
* variable names cant contain spaces or special chars
* use  _ instead of spaces eg: starting_date = '12/02/1999'
* use coments to explain a variable  
    eg : distance_left = 1.3 /*distance left in miles*/

## Datatypes include : text, numbers, date, date/time, boolean, decimals, list, map

### string methods: length(), concat(), contains(), matches()
* to use str inside a str : total = "love \"you"\ ";

###  number methods:
*       isNumber(), 
*       tolong() converts str of nums  to  number,
*       randomnNumber() generates random nums
* number must be whole numbers wthout decials, can have -ve and +ve nums

### decimal nums: can have -ve nums, 
*   default is 0 ie 129 is 129.0
*   decimal methods: round(), ceil(), sin() , cos()
*   floor() rounds the val to lowest val eg:
                        info x = 100.99;
                        info x.tofloor();// 101

### boolean reps true/fasle based on condition. 
*    default is false

### datetime uses single quotes to rep value ie 
*    appoinment = '23-02-2024 10:30:00' 0r '23/02/2024 10:30:00' :
*    datetimes accepts formats like birthdates, entrytime, exit time etc
*    default time is 00:00:00
*    supports 12hr/24hr formats
*    cant comparevariables with datetime only. no datetime vs str/date/time
*    methods: toDate(), addBsinessDay(), day360, hoursBetwwen();
    *    businessDa() : appoinment = '23-02-2024 10:30:00'; 
    *                   appointment.addBsinessDay(2);//25-02-2024 10:30:00 adds two days
    


### list contains collection of single items arranged in orderly fashion
* items are marked by index whose default is 0. ie stars counting frm 0
    * eg fruits = ["apples", "mangoes", "kiwi", "grapes", "oranges"] ;
    * fruits.get(1); // mangoes
    * fruits = collection() ;
    * info fruits; will show empty collection
    *fruits.insert("bananas", 222, '22/03/2024');
    *info fruits; // shows bananas, 222, '22/03/2024'
    * info fruits.get(2); the date



### map conatins key value pairs. 
*  items are marked by keys NOT INDEX like in lists

    *  eg employees = collection();
    *  info employees; //shows empty []
    *  info emploees.insert("name": "Damah", "age": 80);
    *  info employees; // {"name": "Damah", "age": 80}
    *  info employees.get(name); // Damah

*  if you provide a similar key with diff values, it replaces the original eg:
    *  info emploees.insert("name": "Damah", "age": 80, "name": "Hosea");
    *  info employees.get("name"); // Hosea

*  to add data to more than 1 collection:
    *  employees1 = collection();
    *  employees2 = collection();
    *  employees3 = collection();

    * info emploees1.insert("name": "Damah", "age": 80); 
    * info emploees1.insert("name": "Lydia", "age": 28); 
    * info emploees3.insert(employyes1,employees2); 
    * info employees3; //{"name": "Damah", "age": 80}, {"name": "Lydia", "age": 28}

* to get a value from a collection of maps, use indexing then acess the key eg:
    *  info employees3.get(1).get(name);  // Lydia
