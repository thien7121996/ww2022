
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show').clockpicker('toggleView', 'minutes');
});

// Date Picker

jQuery('#datepicker').datepicker({
    format: 'dd/mm/yyyy'
});
jQuery('#datepicker-autoclose').datepicker({
    autoclose: true
    , todayHighlight: true
});
jQuery('#end, #start').datepicker({
    format: 'dd/mm/yyyy',
    value: new Date()
});
jQuery('#date-range').datepicker({
    
    format: 'dd/mm/yyyy'
});

jQuery('#datepicker-inline').datepicker({
    todayHighlight: true,
    format: 'DD/MM/YYYY'
});

// Daterange picker
$('.input-daterange-datepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , minDate: '06/10/2020'
    , maxDate: '08/10/2023',
    buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse',
    locale: {
        format: 'DD/MM/YYYY'
      }
});
$(".applyBtn").click(function(){
    setTimeout(function(){
        $("#buttimkiem").click();
    }, 500);
    
})
$('.input-daterange-timepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , timePickerIncrement: 30
    , timePicker12Hour: true
    , timePickerSeconds: false
    , buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse'
});
$('.input-limit-datepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , minDate: '06/10/2020'
    , maxDate: '08/10/2020'
    , buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse'
    , dateLimit: {
        days: 6
    }
});
$("#chonkhoangngaytao").change(function(){
    if($(this).is(':checked') === true)
    {
        $("#chonngaytao").prop('checked', false);
        $("#khoanngaydatao").removeClass("hidden");
        $("#inputngaytao").addClass("hidden");
        $("#khoanngaydatao input").val("");
        $("#inputngaytao input").val("");
    }
  
});
$("#chonngaytao").change(function(){
    if($(this).is(':checked') === true){
        $("#chonkhoangngaytao").prop('checked', false);
        $("#khoanngaydatao").addClass("hidden");
        $("#inputngaytao").removeClass("hidden");
        $("#khoanngaydatao input").val("");
        $("#inputngaytao input").val("");
    }
   
});
$("#chonthoigianhen").change(function(){
    if($(this).is(':checked') === true){
        $("#chonthoigianhenkhoang").prop('checked', false);
        $("#inputhenngay").removeClass("hidden");
        $("#inputkhoangngayhen").addClass("hidden");
        $("#inputhenngay input").val("");
        $("#inputkhoangngayhen input").val("");
    }
   
});
$("#chonthoigianhenkhoang").change(function(){
    if($(this).is(':checked') === true){
        $("#chonthoigianhen").prop('checked', false);
        $("#inputhenngay").addClass("hidden");
        $("#inputkhoangngayhen").removeClass("hidden");
        $("#inputhenngay input").val("");
        $("#inputkhoangngayhen input").val("");
    }
  
});
$(".react-photo-gallery--gallery img").click(function(){
    $(this).addClass("selectedimg");
});
$('#single-input').clockpicker({
    placement: 'bottom'
    , align: 'left'
    , autoclose: true
    , 'default': 'now'
});
$('.clockpicker').clockpicker({
    donetext: 'Done'
, }).find('input').change(function () {
    console.log(this.value);
});
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show').clockpicker('toggleView', 'minutes');
});
$("#btnopenj").click(function(){
    if($("#logomain").hasClass("logonmin"))
    {
        $("#logomain").removeClass("logonmin");
    }
    if(!$("#logomain").hasClass("logonmin")){
        $("#logomain").addClass("logonmin");
    }
    
})
// Colorpicker

$('.mydatepicker').datepicker({
    
    format: 'dd/mm/yyyy'
});
var date = new Date();

var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
$('.doanhthudatepicker').datepicker({
    
    format: 'dd/mm/yyyy'
});
  
$('.input-daterange-datepicker-month').daterangepicker({
    
    format: 'DD/MM/YYYY',
    buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse',
    locale: {
        format: 'DD/MM/YYYY'
      }
});
$("#themnhanhkhammoi").change(function(){
    if($(this).is(":checked"))
    {
        $("#formkhammoi").removeClass("anformmodal");
    }
    else
    {
        $("#formkhammoi").addClass("anformmodal");
    }
});
$("#themnhanhdieutri").change(function(){
    if($(this).is(":checked"))
    {
        $("#formmodaldieutri").removeClass("anformmodal");
    }
    else
    {
        $("#formmodaldieutri").addClass("anformmodal");
    }
});
    // build the locale selector's options
  
  
 