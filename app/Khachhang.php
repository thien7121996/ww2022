<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Khachhang extends Model
{
    protected $table = 'khachhang';
    protected $fillable = ['hoten', 'gioitinh', 'ngaysinh', 'diachi', 'dienthoai', 'tiensubenh', 'gioithieu', 'khuvuc', 'dichvudieutri', 'nguongioithieu', 'anhdaidien', 'truocmatbefore', 'hamtrenbefore', 'hamduoibefore', 'truocmatafter', 'hamtrenafter', 'hamduoiafter', 'danhgia', 'sosao', 'bacsidieutri', 'trangthai', 'chinhanh', 'masale', 'nguoncongty', 'phonegioithieu', 'mahoso'];
    public function nguongioithieu()
    {
        return $this->hasOne('App\Nguongioithieu');
    }
    public function chinhanhs()
    {
        return $this->belongsTo('App\Chinhanh','chinhanh','id');
    }
	public function chiphis()
    {
        return $this->belongsTo('App\Chiphi','ID','idkhachhang');
    }
	public function thanhtoankhachhangs()
    {
        return $this->belongsTo('App\Thanhtoankhachhang','ID','idkhachhang');
    }
    public function nguoncongtys()
    {
        return $this->belongsTo('App\Nguongioithieu','nguoncongty','id');
    }
    public function filterchuoicantim($query, $value)
    {
    return $query->with('chinhanhs')->orwhere('mahoso', 'LIKE',"%".$value."%")->orWhere("dienthoai",$value)->orWhere("hoten", 'LIKE',"%".$value."%")->orderBy('ID', 'desc');
    }
    public function filtertrangthaikhachden($query, $value)
    {
    return $query->where('sosao',$value)->orderBy('ID', 'desc');
    }
    public function filtertrangthaidathen($query, $value)
    {
    return $query->where('trangthai',$value)->orderBy('ID', 'desc');
    }
    public function filterdichvucuakhach($query, $value)
    {
        $value = '"'.$value.'"';
    return $query->Where("dichvudieutri", 'LIKE',"%".$value."%")->orderBy('ID', 'desc');
    }
    public function filterngaytao($query, $value)
    {
       
        $date = explode("/", $value);
        $datefm= $date[2]."-".$date[1]."-".$date[0];
    return $query->with('chinhanhs')->where('created_at','LIKE',$datefm." %")->orderBy('ID', 'desc');
    }
    public function filterkhoangngaytao($query, $value)
    {
        $arr=array ();  
        $datestr = str_replace('/', '-',  $value );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
        return $query->with('chinhanhs')->where('created_at', '>', $date1)->where('created_at', '<', $date2);
    }
    public function filterthoigianhen($query, $value)
    {
        $value=date("Y-m-d", strtotime($value));  
        return $query->join('lichhen', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select([
        'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.truocmatbefore',
        'khachhang.hamtrenbefore',
        'khachhang.hamduoibefore',
        'khachhang.truocmatafter',
        'khachhang.hamtrenafter',
        'khachhang.hamduoiafter',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        'khachhang.created_at',
        'khachhang.updated_at',
        DB::raw('GROUP_CONCAT(DISTINCT lichhen.start, "") AS lichhenkh')    
         ])->where("lichhen.start","LIKE",$value."%")->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.truocmatbefore')
    ->groupBy('khachhang.hamtrenbefore')
    ->groupBy('khachhang.hamduoibefore')
    ->groupBy('khachhang.truocmatafter')
    ->groupBy('khachhang.hamtrenafter')
    ->groupBy('khachhang.hamduoiafter')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')
    ->groupBy('khachhang.created_at')
    ->groupBy('khachhang.updated_at')
    ->groupBy('khachhang.ID')->orderBy('ID', 'desc');
    }
    public function filterkhoangngayhen($query, $value)
    {
      $arr=array ();  
      $datestr = str_replace('/', '-',  $value );
      $myArray = explode(' ', $datestr);
      $date1=$myArray[0];
      $date2=$myArray[2];
      $date1=date("Y-m-d", strtotime($date1));  
      $date2=date("Y-m-d", strtotime($date2)); 
      return $query->join('lichhen', 'lichhen.idkhachhang', '=', 'khachhang.ID')
      ->select([
          'khachhang.ID',
          'khachhang.hoten',
          'khachhang.gioitinh',
          'khachhang.ngaysinh',
          'khachhang.diachi',
          'khachhang.dienthoai',
          'khachhang.tiensubenh',
          'khachhang.gioithieu',
          'khachhang.dichvudieutri',
          'khachhang.nguongioithieu',
          'khachhang.anhdaidien',
          'khachhang.truocmatbefore',
          'khachhang.hamtrenbefore',
          'khachhang.hamduoibefore',
          'khachhang.truocmatafter',
          'khachhang.hamtrenafter',
          'khachhang.hamduoiafter',
          'khachhang.danhgia',
          'khachhang.sosao',
          'khachhang.bacsidieutri',
          'khachhang.trangthai',
          'khachhang.created_at',
          'khachhang.updated_at',
          DB::raw('GROUP_CONCAT(DISTINCT lichhen.start, "") AS lichhenkh')
      ])->where(DB::raw("(DATE_FORMAT(lichhen.start,'%Y-%m-%d'))"), ">=", $date1)->where(DB::raw("(DATE_FORMAT(lichhen.start,'%Y-%m-%d'))"), "<=", $date2)
      ->groupBy('khachhang.hoten')
      ->groupBy('khachhang.gioitinh')
      ->groupBy('khachhang.ngaysinh')
      ->groupBy('khachhang.diachi')
      ->groupBy('khachhang.dienthoai')
      ->groupBy('khachhang.tiensubenh')
      ->groupBy('khachhang.gioithieu')
      ->groupBy('khachhang.dichvudieutri')
      ->groupBy('khachhang.nguongioithieu')
      ->groupBy('khachhang.anhdaidien')
      ->groupBy('khachhang.truocmatbefore')
      ->groupBy('khachhang.hamtrenbefore')
      ->groupBy('khachhang.hamduoibefore')
      ->groupBy('khachhang.truocmatafter')
      ->groupBy('khachhang.hamtrenafter')
      ->groupBy('khachhang.hamduoiafter')
      ->groupBy('khachhang.danhgia')
      ->groupBy('khachhang.sosao')
      ->groupBy('khachhang.bacsidieutri')
      ->groupBy('khachhang.trangthai')
      ->groupBy('khachhang.created_at')
      ->groupBy('khachhang.updated_at')
      ->groupBy('khachhang.ID')->orderBy('ID', 'desc');
    }
    public function scopeFilter($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'filter' . $field;

            if ($value != '') {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value);
                } else {
                    if (!empty($this->filterable) && is_array($this->filterable)) {
                        if (in_array($field, $this->filterable)) {
                            $query->join('doctor', 'khachhang.bacsidieutri', '=', 'doctor.id')->select('khachhang.*','doctor.ten AS tenbacsi')->groupBy('doctor.ten')->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.truocmatbefore')
                            ->groupBy('khachhang.hamtrenbefore')
                            ->groupBy('khachhang.hamduoibefore')
                            ->groupBy('khachhang.truocmatafter')
                            ->groupBy('khachhang.hamtrenafter')
                            ->groupBy('khachhang.hamduoiafter')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')
                            ->groupBy('khachhang.created_at')
                            ->groupBy('khachhang.updated_at')
                            ->groupBy('khachhang.ID')->where($this->table . '.' . $field, $value)->orderBy('ID', 'desc');
                        } elseif (key_exists($field, $this->filterable)) {
                            $query->join('doctor', 'khachhang.bacsidieutri', '=', 'doctor.id')->select('khachhang.*','doctor.ten AS tenbacsi')->groupBy('doctor.ten')->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.truocmatbefore')
                            ->groupBy('khachhang.hamtrenbefore')
                            ->groupBy('khachhang.hamduoibefore')
                            ->groupBy('khachhang.truocmatafter')
                            ->groupBy('khachhang.hamtrenafter')
                            ->groupBy('khachhang.hamduoiafter')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')
                            ->groupBy('khachhang.created_at')
                            ->groupBy('khachhang.updated_at')
                            ->groupBy('khachhang.ID')->where($this->table . '.' 
                                . $this->filterable[$field], $value)->orderBy('ID', 'desc');
                        }
                    }
                }
            }
        }
    
        return $query;
    }

    public function bolocchuoicantim($query, $value)
    {
    return $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')->
    join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->select([
        'khachhang.ID',
    'khachhang.hoten',
    'khachhang.gioitinh',
    'khachhang.ngaysinh',
    'khachhang.diachi',
    'khachhang.dienthoai',
    'khachhang.tiensubenh',
    'khachhang.gioithieu',
    'khachhang.dichvudieutri',
    'khachhang.nguongioithieu',
    'khachhang.anhdaidien',
    'khachhang.danhgia',
    'khachhang.sosao',
    'khachhang.bacsidieutri',
    'khachhang.trangthai',
    DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
    

  
         ])->Where("hoten", 'LIKE',"%".$value."%")
         ->groupBy('khachhang.ID')
    ->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
   
    public function bolocngaythanhtoan($query, $value)
    {
       
        $date = explode("/", $value);
        $datefm= $date[2]."-".$date[1]."-".$date[0];
        return $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
        ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->select([
            'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
             ])->where("thanhtoankhachhang.ngaythanhtoan","LIKE",$datefm." %")
             ->groupBy('khachhang.ID')
        ->groupBy('khachhang.hoten')
        ->groupBy('khachhang.gioitinh')
        ->groupBy('khachhang.ngaysinh')
        ->groupBy('khachhang.diachi')
        ->groupBy('khachhang.dienthoai')
        ->groupBy('khachhang.tiensubenh')
        ->groupBy('khachhang.gioithieu')
        ->groupBy('khachhang.dichvudieutri')
        ->groupBy('khachhang.nguongioithieu')
        ->groupBy('khachhang.anhdaidien')
        ->groupBy('khachhang.danhgia')
        ->groupBy('khachhang.sosao')
        ->groupBy('khachhang.bacsidieutri')
        ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
    public function bolockhoangngaythanhtoan($query, $value)
    {
        $arr=array ();  
      $datestr = str_replace('/', '-',  $value );
      $myArray = explode(' ', $datestr);
      $date1=$myArray[0];
      $date2=$myArray[2];
      $date1=date("Y-m-d", strtotime($date1));  
      $date2=date("Y-m-d", strtotime($date2)); 
      return $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
      ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
      ->select([
        'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
      ])->where(DB::raw("(DATE_FORMAT(thanhtoankhachhang.ngaythanhtoan,'%Y-%m-%d'))"), ">=", $date1)->where(DB::raw("(DATE_FORMAT(thanhtoankhachhang.ngaythanhtoan,'%Y-%m-%d'))"), "<=", $date2)
      ->groupBy('khachhang.ID')
      ->groupBy('khachhang.hoten')
      ->groupBy('khachhang.gioitinh')
      ->groupBy('khachhang.ngaysinh')
      ->groupBy('khachhang.diachi')
      ->groupBy('khachhang.dienthoai')
      ->groupBy('khachhang.tiensubenh')
      ->groupBy('khachhang.gioithieu')
      ->groupBy('khachhang.dichvudieutri')
      ->groupBy('khachhang.nguongioithieu')
      ->groupBy('khachhang.anhdaidien')
      ->groupBy('khachhang.danhgia')
      ->groupBy('khachhang.sosao')
      ->groupBy('khachhang.bacsidieutri')
      ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
  
    public function scopeBoloc($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'boloc' . $field;

            if ($value != '') {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value);
                } else {
                    if (!empty($this->bolocable) && is_array($this->bolocable)) {
                        if (in_array($field, $this->filterable)) {
                            $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
                            ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
                            ->select([
                              'khachhang.ID',
                              'khachhang.hoten',
                              'khachhang.gioitinh',
                              'khachhang.ngaysinh',
                              'khachhang.diachi',
                              'khachhang.dienthoai',
                              'khachhang.tiensubenh',
                              'khachhang.gioithieu',
                              'khachhang.dichvudieutri',
                              'khachhang.nguongioithieu',
                              'khachhang.anhdaidien',
                              'khachhang.danhgia',
                              'khachhang.sosao',
                              'khachhang.bacsidieutri',
                              'khachhang.trangthai',
                              DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
                            
                            
                            ])->where($this->table . '.' . $field, $value)
                            ->groupBy('khachhang.ID')
                            ->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
                        } elseif (key_exists($field, $this->bolocable)) {
                            $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
                            ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
                            ->select([
                              'khachhang.ID',
                              'khachhang.hoten',
                              'khachhang.gioitinh',
                              'khachhang.ngaysinh',
                              'khachhang.diachi',
                              'khachhang.dienthoai',
                              'khachhang.tiensubenh',
                              'khachhang.gioithieu',
                              'khachhang.dichvudieutri',
                              'khachhang.nguongioithieu',
                              'khachhang.anhdaidien',
                              'khachhang.danhgia',
                              'khachhang.sosao',
                              'khachhang.bacsidieutri',
                              'khachhang.trangthai',
                              DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
                            
                             
                          
                            ])->where($this->table . '.' 
                            . $this->bolocable[$field], $value)
                            ->groupBy('khachhang.ID')
                            ->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
                        }
                    }
                }
            }
        }
    
        return $query;
    }


    // bo loc theo thang

    public function boloctheothangchuoicantim($query, $value, $id)
    {
    return $query->with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs')->with(['khammoi' => function($r){
			$r->with('nguons');
		}]);
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')->
    join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->select([
        'khachhang.ID',
    'khachhang.hoten',
    'khachhang.gioitinh',
    'khachhang.ngaysinh',
    'khachhang.diachi',
    'khachhang.dienthoai',
    'khachhang.tiensubenh',
    'khachhang.gioithieu',
    'khachhang.dichvudieutri',
    'khachhang.nguongioithieu',
    'khachhang.anhdaidien',
    'khachhang.danhgia',
    'khachhang.sosao',
    'khachhang.bacsidieutri',
    'khachhang.trangthai',
    DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
    

  
         ])->whereMonth('khachhang.created_at', '=', $id)->Where("hoten", 'LIKE',"%".$value."%")
         ->groupBy('khachhang.ID')
    ->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
	
	public function boloctheothangchinhanhcantim($query, $value, $id)
    {
    return $query->with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs')->with(['khammoi' => function($r){
			$r->with('nguons');
		}]);
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')->
    join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->select([
        'khachhang.ID',
    'khachhang.hoten',
    'khachhang.gioitinh',
    'khachhang.ngaysinh',
    'khachhang.diachi',
    'khachhang.dienthoai',
    'khachhang.tiensubenh',
    'khachhang.gioithieu',
    'khachhang.dichvudieutri',
    'khachhang.nguongioithieu',
    'khachhang.anhdaidien',
    'khachhang.danhgia',
    'khachhang.sosao',
    'khachhang.bacsidieutri',
    'khachhang.trangthai',
    DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
    

  
         ])->whereMonth('thanhtoankhachhang.created_at', '=', $id)->Where("thanhtoankhachhang.chinhanh", '=', $value)
         ->groupBy('khachhang.ID')
    ->groupBy('khachhang.hoten')
    ->groupBy('khachhang.gioitinh')
    ->groupBy('khachhang.ngaysinh')
    ->groupBy('khachhang.diachi')
    ->groupBy('khachhang.dienthoai')
    ->groupBy('khachhang.tiensubenh')
    ->groupBy('khachhang.gioithieu')
    ->groupBy('khachhang.dichvudieutri')
    ->groupBy('khachhang.nguongioithieu')
    ->groupBy('khachhang.anhdaidien')
    ->groupBy('khachhang.danhgia')
    ->groupBy('khachhang.sosao')
    ->groupBy('khachhang.bacsidieutri')
    ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
    public function boloctheothangngaythanhtoan($query, $value, $id)
    {
       
        $date = explode("/", $value);
        $datefm= $date[2]."-".$date[1]."-".$date[0];
        return $query->with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs')->with(['khammoi' => function($r){
			$r->with('nguons');
		}]);
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
        ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->select([
            'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
             ])->where("thanhtoankhachhang.ngaythanhtoan","LIKE",$datefm."%")
             ->groupBy('khachhang.ID')
        ->groupBy('khachhang.hoten')
        ->groupBy('khachhang.gioitinh')
        ->groupBy('khachhang.ngaysinh')
        ->groupBy('khachhang.diachi')
        ->groupBy('khachhang.dienthoai')
        ->groupBy('khachhang.tiensubenh')
        ->groupBy('khachhang.gioithieu')
        ->groupBy('khachhang.dichvudieutri')
        ->groupBy('khachhang.nguongioithieu')
        ->groupBy('khachhang.anhdaidien')
        ->groupBy('khachhang.danhgia')
        ->groupBy('khachhang.sosao')
        ->groupBy('khachhang.bacsidieutri')
        ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
    public function boloctheothangkhoangngaythanhtoan($query, $value, $id)
    {
        $arr=array ();  
      $datestr = str_replace('/', '-',  $value );
      $myArray = explode(' ', $datestr);
      $date1=$myArray[0];
      $date2=$myArray[2];
      $date1=date("Y-m-d", strtotime($date1));  
      $date2=date("Y-m-d", strtotime($date2)); 
      return $query->with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs')->with(['khammoi' => function($r){
			$r->with('nguons');
		}]);
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
      ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
      ->select([
        'khachhang.ID',
        'khachhang.hoten',
        'khachhang.gioitinh',
        'khachhang.ngaysinh',
        'khachhang.diachi',
        'khachhang.dienthoai',
        'khachhang.tiensubenh',
        'khachhang.gioithieu',
        'khachhang.dichvudieutri',
        'khachhang.nguongioithieu',
        'khachhang.anhdaidien',
        'khachhang.danhgia',
        'khachhang.sosao',
        'khachhang.bacsidieutri',
        'khachhang.trangthai',
        DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
      ])->where(DB::raw("(DATE_FORMAT(thanhtoankhachhang.ngaythanhtoan,'%Y-%m-%d'))"), ">=", $date1)->where(DB::raw("(DATE_FORMAT(thanhtoankhachhang.ngaythanhtoan,'%Y-%m-%d'))"), "<=", $date2)
      ->groupBy('khachhang.ID')
      ->groupBy('khachhang.hoten')
      ->groupBy('khachhang.gioitinh')
      ->groupBy('khachhang.ngaysinh')
      ->groupBy('khachhang.diachi')
      ->groupBy('khachhang.dienthoai')
      ->groupBy('khachhang.tiensubenh')
      ->groupBy('khachhang.gioithieu')
      ->groupBy('khachhang.dichvudieutri')
      ->groupBy('khachhang.nguongioithieu')
      ->groupBy('khachhang.anhdaidien')
      ->groupBy('khachhang.danhgia')
      ->groupBy('khachhang.sosao')
      ->groupBy('khachhang.bacsidieutri')
      ->groupBy('khachhang.trangthai')->orderBy('ID', 'desc');
    }
  
    public function scopeBoloctheothang($query, $param, $id)
    {
        foreach ($param as $field => $value) {
            $method = 'boloctheothang' . $field;

            if ($value != '') {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value, $id);
                } else {
                    if (!empty($this->bolocable) && is_array($this->bolocable)) {
                        if (in_array($field, $this->filterable)) {
                            $query->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
                            ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
                            ->select([
                              'khachhang.ID',
                              'khachhang.hoten',
                              'khachhang.gioitinh',
                              'khachhang.ngaysinh',
                              'khachhang.diachi',
                              'khachhang.dienthoai',
                              'khachhang.tiensubenh',
                              'khachhang.gioithieu',
                              'khachhang.dichvudieutri',
                              'khachhang.nguongioithieu',
                              'khachhang.anhdaidien',
                              'khachhang.danhgia',
                              'khachhang.sosao',
                              'khachhang.bacsidieutri',
                              'khachhang.trangthai',
                              DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
                            
                            
                            ])->where($this->table . '.' . $field, $value)
                            ->groupBy('khachhang.ID')
                            ->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')->orderBy('ID', 'asc');
                        } elseif (key_exists($field, $this->bolocable)) {
                            $query->with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs')->with(['khammoi' => function($r){
			$r->with('nguons');
		}]);
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
                            ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')
                            ->select([
                              'khachhang.ID',
                              'khachhang.hoten',
                              'khachhang.gioitinh',
                              'khachhang.ngaysinh',
                              'khachhang.diachi',
                              'khachhang.dienthoai',
                              'khachhang.tiensubenh',
                              'khachhang.gioithieu',
                              'khachhang.dichvudieutri',
                              'khachhang.nguongioithieu',
                              'khachhang.anhdaidien',
                              'khachhang.danhgia',
                              'khachhang.sosao',
                              'khachhang.bacsidieutri',
                              'khachhang.trangthai',
                              DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'),
                            
                             
                          
                            ])->where($this->table . '.' 
                            . $this->bolocable[$field], $value)
                            ->groupBy('khachhang.ID')
                            ->groupBy('khachhang.hoten')
                            ->groupBy('khachhang.gioitinh')
                            ->groupBy('khachhang.ngaysinh')
                            ->groupBy('khachhang.diachi')
                            ->groupBy('khachhang.dienthoai')
                            ->groupBy('khachhang.tiensubenh')
                            ->groupBy('khachhang.gioithieu')
                            ->groupBy('khachhang.dichvudieutri')
                            ->groupBy('khachhang.nguongioithieu')
                            ->groupBy('khachhang.anhdaidien')
                            ->groupBy('khachhang.danhgia')
                            ->groupBy('khachhang.sosao')
                            ->groupBy('khachhang.bacsidieutri')
                            ->groupBy('khachhang.trangthai')->orderBy('ID', 'asc');
                        }
                    }
                }
            }
        }
    
        return $query;
    }
}
