import 'jquery';
import 'popper.js';
import 'bootstrap';
//日曆套件
import 'daterangepicker.css';
import 'daterangepicker.js';
import 'moment.min.js';

import 'style.scss';


// import 'index';


$().ready(function(){

  $( "#date" ).datepicker({
  changeMonth: true,     //可以限定是否需要月份的下拉是選單，預設是沒有
  changeYear: true, 　　//可以限定是否需要年份的下拉是選單，預設是沒有
  dateFormat: 'yy/mm/dd',　　//所顯示的default
  showOn: "button",            
  buttonImage: "./resources/images/icon/calendar.gif",
  buttonImageOnly: true
  });
});