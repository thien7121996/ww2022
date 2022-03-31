<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('public/app_assets/plugins/images/favicon.png') }}">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Phần Mềm Quản Lý Nha Khoa - Dentist Hospital</title>
        <!-- Styles -->
        <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
        <script type="text/javascript">
            window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
        <link href="{{ asset('public/app_assets/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/bootstrap-extension/css/bootstrap-extension.css') }}" rel="stylesheet">
 
        <!-- Editable CSS -->
    <link type="text/css" rel="stylesheet" href="{{ asset('public/app_assets/plugins/bower_components/jsgrid/dist/jsgrid.min.css') }}" />
    <link type="text/css" rel="stylesheet" href="{{ asset('public/app_assets/plugins/bower_components/jsgrid/dist/jsgrid-theme.min.css') }}" />
        <!-- Menu CSS -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.css') }}" rel="stylesheet">
        <!-- morris CSS -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/morrisjs/morris.css') }}" rel="stylesheet">
        <!-- animation CSS -->
        <link href="{{ asset('public/app_assets/css/animate.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/icheck/skins/all.css') }}" rel="stylesheet">
        <!-- Custom CSS -->
        <link href="{{ asset('public/app_assets/css/style.min.css') }}" rel="stylesheet">
                                       <link href="{{ asset('public/app_assets/plugins/bower_components/icheck/skins/all.css') }}" rel="stylesheet">
        <!-- color CSS -->
        <link href="{{ asset('public/app_assets/css/colors/megna.css') }}" id="theme" rel="stylesheet">
        <!-- Date picker plugins css -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.css') }}" rel="stylesheet" type="text/css" />
        <!-- Daterange picker plugins css -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.css') }}" rel="stylesheet">
        <!-- Dropzone css -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/dropzone-master/dist/dropzone.css') }}" rel="stylesheet" type="text/css" />
        <!-- Calendar CSS -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/calendar/dist/fullcalendar.css') }}" rel="stylesheet" />
        <!-- Daterange picker plugins css -->
        <link href="{{ asset('public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets/plugins/bower_components/datatables/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="https://cdn.datatables.net/buttons/1.2.2/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
        <link href="{{ asset('public/app_assets/plugins/bower_components/gallery/css/animated-masonry-gallery.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('public/app_assets/plugins/bower_components/fancybox/ekko-lightbox.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('public/app_assets/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.css') }}" rel="stylesheet">
        <link href="{{ asset('public/app_assets//plugins/bower_components/jquery-asColorPicker-master/css/asColorPicker.css') }}" rel="stylesheet">
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.1.5/css/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.2.4/css/dx.light.css" />
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
        
    </head>
    <body class="fix-sidebar">
        <!-- Preloader -->
        <div class="preloader" id="loadingapp">
		<h3 class="textloading">Dữ liệu đang được tải....</h3>
            <div class="cssload-speeding-wheel"><img src="{{ ('public/loadingdentist.gif') }}" /></div>
        </div>
        <div id="wrapper">
         
            <!-- Left navbar-header end -->
            <!-- Page Content -->
           
                    <div id="root"></div>
                  
                    <div id="tagscripts">
                       
                       
                    </div>
        <script src="{{ ('public/js/app.js') }}"></script>
        
    </div>
       <!-- jQuery -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/jquery/dist/jquery.min.js') }}"></script>
       <!-- Bootstrap Core JavaScript -->
       <script src="{{ asset('public/app_assets/bootstrap/dist/js/tether.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/bootstrap/dist/js/bootstrap.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/plugins/bower_components/bootstrap-extension/js/bootstrap-extension.min.js') }}"></script>
       <!-- Menu Plugin JavaScript -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js') }}"></script>
       
       <!--slimscroll JavaScript -->
       <script src="{{ asset('public/app_assets/js/jquery.slimscroll.js') }}"></script>
       <!--Wave Effects -->
       <script src="{{ asset('public/app_assets/js/waves.js') }}"></script>
    

      
       <!-- Sparkline chart JavaScript -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/jquery-sparkline/jquery.sparkline.min.js') }}"></script>
       <!-- jQuery peity -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/peity/jquery.peity.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/plugins/bower_components/peity/jquery.peity.init.js') }}"></script>
           <script src="{{ asset('public/app_assets/plugins/bower_components/icheck/icheck.min.js') }}"></script>
    <script src="{{ asset('public/app_assets/plugins/bower_components/icheck/icheck.init.js') }}"></script>
       <!-- Custom Theme JavaScript -->
       <script src="{{ asset('public/app_assets/js/custom.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/js/datatable/menu.js') }}"></script>
       <!-- Plugin JavaScript -->
    <script src="{{ asset('public/app_assets/plugins/bower_components/moment/moment.js') }}"></script>
            <script src="{{ asset('public/app_assets/plugins/bower_components/icheck/icheck.min.js') }}"></script>
    <script src="{{ asset('public/app_assets/plugins/bower_components/icheck/icheck.init.js') }}"></script>
       <!--Style Switcher -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/styleswitcher/jQuery.style.switcher.js') }}"></script>
        <!-- Date Picker Plugin JavaScript -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js') }}"></script>
       <!-- Date range Plugin JavaScript -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.js') }}"></script>
        <!-- Dropzone Plugin JavaScript -->
         <!-- Clock Plugin JavaScript -->
       <script src="{{ asset('public/app_assets/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.js') }}"></script>
       <script src="{{ asset('public/app_assets/plugins/bower_components/dropzone-master/dist/dropzone.js') }}"></script>
        <!-- Date range Plugin JavaScript -->
        <script src="{{ asset('public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.js') }}"></script>
        <script src="{{ asset('public/app_assets/plugins/bower_components/bootstrap-daterangepicker/daterangepicker.js') }}"></script>
        <script src="{{ asset('public/app_assets/plugins/bower_components/datatables/jquery.dataTables.min.js') }}"></script>

        <!-- start - This is for export functionality only -->
       
   
        <!-- end - This is for export functionality only -->

 
   </body>
   
   </html>