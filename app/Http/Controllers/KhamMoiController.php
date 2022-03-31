<?php

namespace App\Http\Controllers;
use App\Khammoi;
use App\Chiphi;
use App\Thanhtoankhachhang;
use App\Thoigianbieu;
use App\Dieutritheolich;
use App\Lichsuchinhsua;
use App\Role;
use App\User;
use App\Nguongioithieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KhamMoiController extends Controller
{
  public function indextheochinhanh(Request $request,$id)
  {   
    if($request->chinhanh==0)
    {
      $khammoi = Khammoi::leftjoin('doctor', 'khammoi.bacsi', '=', 'doctor.id')->leftjoin('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->leftjoin('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->with('sales')->with('salesoffline')->with('chinhanhs')->where("khammoi.idkhachhang",'=',$id)->orderBy('khammoi.created_at', 'DESC')->get();
      for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
      return $khammoi->toJson();
    }
    else
    {
      $khammoi = Khammoi::leftjoin('doctor', 'khammoi.bacsi', '=', 'doctor.id')->leftjoin('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->leftjoin('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->with('sales')->with('salesoffline')->with('chinhanhs')->where("khammoi.idkhachhang",'=',$id)->where("khammoi.chinhanh",'=',$request->chinhanh)->orderBy('khammoi.created_at', 'DESC')->get();
      for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
      return $khammoi->toJson();
    }
  }
    public function index($id)
    {
      $khammoi = Khammoi::leftjoin('doctor', 'khammoi.bacsi', '=', 'doctor.id')->leftjoin('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->leftjoin('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->with('sales')->with('salesoffline')->with('chinhanhs')->where("khammoi.idkhachhang",'=',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
		  $tongdoanvandieutri=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          $paragraphsdieutri = explode("\n", $khammoi[$i]->ghichudieutri);
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
		  foreach($paragraphsdieutri as $pr)
          {
            $tongdoanvandieutri[]=$pr;
          }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
		  $khammoi[$i]["ghichutextdieutri"]=$tongdoanvandieutri;
        }
    

        return $khammoi->toJson();
    }
    public function khammoitatca()
    {
      $khammoi = Khammoi::leftjoin('doctor', 'khammoi.bacsi', '=', 'doctor.id')->leftjoin('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->leftjoin('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('chandoancacloai', 'khammoi.benhly', '=', 'chandoancacloai.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon','chandoancacloai.ten AS tenchandoan')->with('sales')->with('salesoffline')->with('khachhang')->with('nguons')->with('chinhanhs')->orderBy('khammoi.created_at', 'DESC')->get();
        
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
    

        return $khammoi->toJson();
    }
    public function indexallcskh(Request $request)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->with('khachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('trangthaidieutri',3)->whereMonth('khammoi.created_at', '=', date('m'))->orderBy('khammoi.created_at', 'DESC')->get();
        $km=[];
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
		  if($khammoi[$i]->ngayhoanthanh!=null){
			$thoigianhoanthanh = $khammoi[$i]->ngayhoanthanh;
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianhoanthanh); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime2 - $datetime1)/86400);
			$khammoi[$i]["thoigiantukhihoanthanh"]=$days;
		  }
		  else
		  {
			 $khammoi[$i]["thoigiantukhihoanthanh"]=-1; 
		  }
		  
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
    

        return $khammoi->toJson();
    }
	public function indexallcskhnhacnhohoanthanh(Request $request)
    {
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->with('khachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('trangthaidieutri',3)->orderBy('khammoi.created_at', 'DESC')->get();
        $km=[];
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
		  if($khammoi[$i]->ngayhoanthanh!=null){
			$thoigianhoanthanh = $khammoi[$i]->ngayhoanthanh;
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianhoanthanh); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime2 - $datetime1)/86400);
			$khammoi[$i]["thoigiantukhihoanthanh"]=$days;
			$km[]=$khammoi[$i];
		  }
		  else
		  {
			 $khammoi[$i]["thoigiantukhihoanthanh"]=-1; 
		  }
		  $khammoi[$i]["ghichutext"]=$tongdoanvan;
          
        }
    

        return $km;
    }
	public function indexallcskhlocngay(Request $request)
    {
		if($request->ngayloc!="")
		{
			$ngayloc = $request->ngayloc;
$ngaylocArray = explode('/', $ngayloc);
$chuoiLoc=$ngaylocArray[2]."-".$ngaylocArray[1]."-".$ngaylocArray[0];

        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->with('khachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.updated_at','like','%'.$chuoiLoc.'%')->where('trangthaidieutri',3)->orderBy('khammoi.created_at', 'DESC')->get();
		}
		else
		{
			$ngayloc = $request->khoangngaythanhtoan;
			$arr=array ();  
        $datestr = str_replace('/', '-',  $ngayloc );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
$ngaylocArray = explode('/', $ngayloc);


        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->with('khachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.updated_at', '>', $date1)->where('khammoi.updated_at', '<', $date2)->where('trangthaidieutri',3)->orderBy('khammoi.created_at', 'DESC')->get();
		}
        
        for($i=0;$i<count($khammoi);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $khammoi[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
		  if($khammoi[$i]->ngayhoanthanh!=null){
			$thoigianhoanthanh = $khammoi[$i]->ngayhoanthanh;
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianhoanthanh); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime2 - $datetime1)/86400);
			$khammoi[$i]["thoigiantukhihoanthanh"]=$days;
		  }
		  else
		  {
			 $khammoi[$i]["thoigiantukhihoanthanh"]=-1; 
		  }
          $khammoi[$i]["ghichutext"]=$tongdoanvan;
        }
    

        return $khammoi->toJson();
    }
    public function indexnosame($id)
    {
        $khammoi = Khammoi::leftjoin('doctor', 'khammoi.bacsi', '=', 'doctor.id')->leftjoin('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->with('chinhanhs')->where("khammoi.idkhachhang",'=',$id)->distinct()->orderBy('khammoi.created_at', 'DESC')->get();
        return $khammoi->toJson();
    }
    public function getallkhammoi()
    {
        $khammoitong=[];
        $khammoi = Khammoi::with('khachhang')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('chinhanhs')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->orderBy('khammoi.created_at', 'DESC')->get();
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.1;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
             
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoidirectsale()
    {
        $khammoitong=[];
        $khammoi = Khammoi::with('khachhang')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->where('khammoi.idsaleoff', '<>', '0')->orwhere('khammoi.idsaleoff', '<>', 'NULL')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->orderBy('khammoi.created_at', 'DESC')->get();
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.1;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
             
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoisaleonline()
    {
        $khammoitong=[];
        $khammoi = Khammoi::with('khachhang')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('sales')->with('salesoffline')->with('chinhanhs')->where('khammoi.idsale', '<>', '0')->orwhere('khammoi.idsale', '<>', 'NULL')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->orderBy('khammoi.created_at', 'DESC')->get();
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.1;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
             
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoitheonguoncongty($id)
    {
        $user = User::where('id',$id)->first();
        $jsonnguon=json_decode($user->nguon, true);
		$nguonlist=[];
		foreach($jsonnguon as $nguonitem)
		{
			$nguonlist[]=$nguonitem["value"];
		}
      
        $khammoi = Khammoi::with('khachhang')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('nguons')->with('chinhanhs')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->whereIn('khammoi.nguon',$nguonlist)->orderBy('khammoi.created_at', 'DESC')->get();
        $khammoitong=[];
        
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
				  $nguon = Nguongioithieu::where('id',$khammoi[$i]["nguon"])->first();
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*((int)$nguon["phantram"]/100);
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
              $khammoi[$i]["phantramhoahong"]=(int)$nguon["phantram"];
            }
            else{
				 $nguon = Nguongioithieu::where('id',$khammoi[$i]["nguon"])->first();
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
                $khammoi[$i]["phantramhoahong"]=(int)$nguon["phantram"];
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
    }
    public function getallkhammoitheobacsi($id)
    {
        $role = Role::where('id',3)->first();
       
        $khammoi = Khammoi::with('khachhang')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('chinhanhs')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.bacsi',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        $khammoitong=[];
        
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*((int)$role["phantram"]/100);
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
              $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
                $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
    }
    public function getallkhammoitheosale($id)
    {
      $role = Role::where('id',4)->first();
       
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('chinhanhs')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.idsale',$id)->orderBy('khammoi.created_at', 'DESC')->get();
      $khammoitong=[];
      
      $tonghoahong=0;
      for($i=0;$i<count($khammoi);$i++)
      {
        $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
        $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
        $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
        $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
        if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
        {
          if($chiphi[0]->tonggia!==null)
          {
            $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
          }
          else
          {
            $khammoi[$i]["tonggia"] = 0;
          }
          
          //soluongchiphi
          if($chiphi[0]->soluongchiphi!==null)
          {
            $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
          }
          else
          {
            $khammoi[$i]["soluongchiphi"] = 0;
          }
          //tongthanhtien
          if($chiphi[0]->tongthanhtien!==null)
          {
            $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
          }
          else
          {
            $khammoi[$i]["tongthanhtien"] = 0;
          }
          //tonggiamgia
          if($chiphi[0]->tonggiamgia!==null)
          {
            $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
          }
          else
          {
            $khammoi[$i]["tonggiamgia"] = 0;
          }
          //tongsaugiam
          if($chiphi[0]->tongsaugiam!==null)
          {
            $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
          }
          else
          {
            $khammoi[$i]["tongsaugiam"] = 0;
          }
          //tongdathanhtoan
          if($dathanhtoan[0]->dathanhtoan!==null)
          {
            $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
          }
          else
          {
            $khammoi[$i]["tongdathanhtoan"] = 0;
          }
          
         
          $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
          $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
          //tongdathanhtoan
          if($khammoi[$i]["tongconlai"]!==null)
          {
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
          }
          else
          {
            $khammoi[$i]["tongconlai"] = 0;
          }
          if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
            $khammoi[$i]["trangthaithanhtoan"]=1;
            $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*((int)$role["phantram"]/100);
            $tonghoahong=$tonghoahong+$hoahong;
            $khammoi[$i]["hoahong"]=$hoahong;
            $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
          }
          else{
            $khammoi[$i]["trangthaithanhtoan"]=0;  
              $hoahong=0;
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
              $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
         
          }
          if($khammoi[$i]["tongsaugiam"]!=0)
          {
            $khammoitong[]=$khammoi[$i];
          }
        
        }
        
        
      }
   
      return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
    }
    public function getallkhammoitheodirectsale($id)
    {
        $role = Role::where('id',5)->first();
       
        $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->leftjoin('khachhang','khachhang.ID','=','khammoi.idkhachhang')->with('chinhanhs')->select('khammoi.*','khachhang.anhdaidien AS anhdaidien','khachhang.hoten AS hotenkhachhang','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.idsaleoff',$id)->orderBy('khammoi.created_at', 'DESC')->get();
        $khammoitong=[];
        
        $tonghoahong=0;
        for($i=0;$i<count($khammoi);$i++)
        {
          $chiphi = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $ngaythanhtoan = Thanhtoankhachhang::select('ngaythanhtoan as ntt')->where("idkhammoi",'=',$khammoi[$i]->id)->latest('id')->first();
          $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$khammoi[$i]->id)->get();
          $khammoi[$i]["ngaythanhtoankh"]=$ngaythanhtoan["ntt"];
          if($chiphi[0]->tonggia!=null && $khammoi[$i]["ngaythanhtoankh"]!=null)
          {
            if($chiphi[0]->tonggia!==null)
            {
              $khammoi[$i]["tonggia"] = $chiphi[0]->tonggia;
            }
            else
            {
              $khammoi[$i]["tonggia"] = 0;
            }
            
            //soluongchiphi
            if($chiphi[0]->soluongchiphi!==null)
            {
              $khammoi[$i]["soluongchiphi"] = $chiphi[0]->soluongchiphi;
            }
            else
            {
              $khammoi[$i]["soluongchiphi"] = 0;
            }
            //tongthanhtien
            if($chiphi[0]->tongthanhtien!==null)
            {
              $khammoi[$i]["tongthanhtien"] = $chiphi[0]->tongthanhtien;
            }
            else
            {
              $khammoi[$i]["tongthanhtien"] = 0;
            }
            //tonggiamgia
            if($chiphi[0]->tonggiamgia!==null)
            {
              $khammoi[$i]["tonggiamgia"] = $chiphi[0]->tonggiamgia;
            }
            else
            {
              $khammoi[$i]["tonggiamgia"] = 0;
            }
            //tongsaugiam
            if($chiphi[0]->tongsaugiam!==null)
            {
              $khammoi[$i]["tongsaugiam"] = $chiphi[0]->tongsaugiam;
            }
            else
            {
              $khammoi[$i]["tongsaugiam"] = 0;
            }
            //tongdathanhtoan
            if($dathanhtoan[0]->dathanhtoan!==null)
            {
              $khammoi[$i]["tongdathanhtoan"] = $dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongdathanhtoan"] = 0;
            }
            
           
            $tongconlai = (int)$dathanhtoan[0]->dathanhtoan-(int)$phaithanhtoan[0]->phaithanhtoan;
            $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            //tongdathanhtoan
            if($khammoi[$i]["tongconlai"]!==null)
            {
              $khammoi[$i]["tongconlai"] = (int)$phaithanhtoan[0]->phaithanhtoan-(int)$dathanhtoan[0]->dathanhtoan;
            }
            else
            {
              $khammoi[$i]["tongconlai"] = 0;
            }
            if ($khammoi[$i]["tongconlai"]<=0 && $phaithanhtoan[0]->phaithanhtoan!=0) {
              $khammoi[$i]["trangthaithanhtoan"]=1;
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*((int)$role["phantram"]/100);
              $tonghoahong=$tonghoahong+$hoahong;
              $khammoi[$i]["hoahong"]=$hoahong;
              $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
            }
            else{
              $khammoi[$i]["trangthaithanhtoan"]=0;  
                $hoahong=0;
                $tonghoahong=$tonghoahong+$hoahong;
                $khammoi[$i]["hoahong"]=$hoahong;
                $khammoi[$i]["phantramhoahong"]=(int)$role["phantram"];
           
            }
            if($khammoi[$i]["tongsaugiam"]!=0)
            {
              $khammoitong[]=$khammoi[$i];
            }
          
          }
          
          
        }
     
        return json_encode([$khammoitong,$tonghoahong], JSON_UNESCAPED_UNICODE);
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngay' => 'required',
            'nguon' => 'required',
            'benhly' => 'required',
            'dichvu' => 'required',
            'ghichu' => 'required',
			'ghichudieutri' => 'required',
            'bacsi' => 'required',
            'chiphi' => 'required',
            'thanhtoan' => 'required',
            'chinhanh' => 'required',
            'trangthaidieutri' => 'required',
            'idkhachhang' => 'required',
            'phonegioithieu' => 'required'
          ]);
          if($request->idsale!=0)
          {
            $idsale=$request->idsale;
          }
          else
          {
            $idsale=0;
          }
          if($request->idsaleoff!=0)
          {
            $idsaleoff=$request->idsaleoff;
          }
          else
          {
            $idsaleoff=0;
          }
          $khammoi = Khammoi::create([
            'ngay' => $validatedData['ngay'],
            'nguon' => $validatedData['nguon'],
            'benhly' => json_encode($validatedData['benhly']),
            'dichvu' => $validatedData['dichvu'],
            'ghichu' => $validatedData['ghichu'],
			'ghichudieutri' => $validatedData['ghichudieutri'],
            'bacsi' => $validatedData['bacsi'],
            'chiphi' => $validatedData['chiphi'],
            'thanhtoan' => $validatedData['thanhtoan'],
            'chinhanh' => $validatedData['chinhanh'],
            'trangthaidieutri' => $validatedData['trangthaidieutri'],
            'idkhachhang' => $validatedData['idkhachhang'],
            'idsale' => $idsale,
            'idsaleoff' => $idsaleoff,
            'phonegioithieu' => $validatedData['phonegioithieu']
          ]);
          $lichsuchinhsua = Lichsuchinhsua::create([
            'noidungchinhsua' => "Tạo khám mới có ID là ".$khammoi->id,
            'idkhachhang' => $validatedData['idkhachhang'],
            'userchinhsua' => $request->cookie('userkhname')
          ]);      
      return response()->json($khammoi);
    }
    public function update(Request $request, $id)
    {
        $khammoi = Khammoi::find($id);
        $khammoi->ngay = $request->get('ngay');
        $khammoi->nguon = $request->get('nguon');
        $khammoi->benhly = json_encode($request->get('benhly'));
        $khammoi->dichvu = $request->get('dichvu');
        $khammoi->ghichu = $request->get('ghichu');
		$khammoi->ghichudieutri = $request->get('ghichudieutri');
        $khammoi->bacsi = $request->get('bacsi');
        $khammoi->chiphi = $request->get('chiphi');
        $khammoi->thanhtoan = $request->get('thanhtoan');
        $khammoi->chinhanh = $request->get('chinhanh');
        $khammoi->trangthaidieutri = $request->get('trangthaidieutri');
        $khammoi->idkhachhang = $request->get('idkhachhang');
        $khammoi->idsale = $request->get('idsale');
        $khammoi->idsaleoff = $request->get('idsaleoff');
        $khammoi->phonegioithieu = $request->get('phonegioithieu');
		if($request->get('trangthaidieutri')==3)
		{
			$khammoi->ngayhoanthanh = date('Y-m-d ');
		}
        $khammoi->save();
        $lichsuchinhsua = Lichsuchinhsua::create([
          'noidungchinhsua' => "Chỉnh sửa khám mới có ID là ".$id,
          'idkhachhang' => $request->get('idkhachhang'),
          'userchinhsua' => $request->cookie('userkhname')
        ]);  
        return response()->json('Successfully Updated');
    }
    public function destroy(Request $request,$id)
    {
      
      $khammoi = Khammoi::find($id);
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Xóa khám mới có ID là ".$id,
        'idkhachhang' => $khammoi->idkhachhang,
        'userchinhsua' => $request->cookie('userkhname')
      ]);  
      
      $thanhtoan = Thanhtoankhachhang::where('idkhammoi',$id)->delete();
      $chiphi = Chiphi::where('idkhammoi',$id)->delete();
      $dieutri = Dieutritheolich::where('idkhammoi',$id)->delete();
      $lichhen = Thoigianbieu::where('idkhammoi',$id)->delete();
      $khammoi->delete();
      return response()->json('Successfully Deleted');
    }
    public function chitietkhammoi($id)
    {
      $khammoi = Khammoi::with('chinhanhs')->join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.id',$id)->first();

      return $khammoi->toJson();
    }
    public function chitietkhammoikhachhang($id)
    {
      $khammoi = Khammoi::join('doctor', 'khammoi.bacsi', '=', 'doctor.id')->join('dichvu', 'khammoi.dichvu', '=', 'dichvu.id')->join('nguongioithieu', 'khammoi.nguon', '=', 'nguongioithieu.id')->select('khammoi.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu','nguongioithieu.nguon AS tennguon')->where('khammoi.idkhachhang',$id)->latest('created_at')->first();

      return $khammoi->toJson();
    }
    public function laysoanh($id)
    {
      $khammoi = DB::table('anhlichhen')->select( DB::raw(' count(idkhammoi) as soanh'))->where("idkhammoi",'=',$id)->get();
      return $khammoi->toJson();
    }
    public function getallkhammoitrongngay()
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->with(['khammoi' => function($query){
          $query->with('bacsis')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
	public function getallkhammoinguontheocongty($id)
    {
		$user=User::where('id',$id)->first();
        $usernguon=$user->nguon;
		
		$jsonnguon=json_decode($user->nguon, true);
		$nguonlist=[];
		foreach($jsonnguon as $nguonitem)
		{
			$nguonlist[]=$nguonitem["value"];
		}
        $customers = Khammoi::with('sales')->with('salesoffline')->with('dichvus')->with('chinhanhs')->with('nguons')->with('khachhang')->whereIn('nguon',$nguonlist)->orderBy('created_at', 'DESC')->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->get();
	 $thanhtoankhachhang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->get();
	  if($thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"]==null)
	  {
		  $ttdathanhtoan=0;
	  }
	  else
	  {
		  $ttdathanhtoan=$thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"];
	  }
	  $customers[$i]["tongtiendathanhtoan"]=$ttdathanhtoan;
		$customers[$i]["tongtienconno"]=$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
      $customers[$i]["tongsaugiam"]=$tongsaugiam;
	  if($customers[$i]["tongtienconno"]>0)
	  {
		 $customers[$i]["trangthaithanhtoan"]=1; 
	  }
	  elseif($customers[$i]["tongtienconno"]<0)
	  {
		  $customers[$i]["trangthaithanhtoan"]=2; 
	  }
	  else
	  {
		  $customers[$i]["trangthaithanhtoan"]=0; 
	  }
    }
     
        return json_encode($customers, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoinguontheocongtytest($id)
    {
        $user=User::where('id',$id)->first();
        $usernguon=$user->nguon;
		
		$jsonnguon=json_decode($user->nguon, true);
		$nguonlist=[];
		foreach($jsonnguon as $nguonitem)
		{
			$nguonlist[]=$nguonitem["value"];
		}
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->whereHas('khammoi', function($q) use ($nguonlist){
          $q->whereIn('nguon',$nguonlist);
      })->with(['khammoi' => function($query){
          $query->with('sales')->with('salesoffline')->with('dichvus')->with('nguons');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoinguoncongty()
    {
		
        $customers = Khammoi::with('sales')->with('salesoffline')->with('dichvus')->with('chinhanhs')->with('nguons')->with('khachhang')->where('nguon', '<>', '0')->where('nguon', '<>', 'chưa chọn')->orderBy('created_at', 'DESC')->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->get();
	 $thanhtoankhachhang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->get();
	  if($thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"]==null)
	  {
		  $ttdathanhtoan=0;
	  }
	  else
	  {
		  $ttdathanhtoan=$thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"];
	  }
	  $customers[$i]["tongtiendathanhtoan"]=$ttdathanhtoan;
		$customers[$i]["tongtienconno"]=$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
      $customers[$i]["tongsaugiam"]=$tongsaugiam;
	  if($customers[$i]["tongtienconno"]>0)
	  {
		 $customers[$i]["trangthaithanhtoan"]=1; 
	  }
	  elseif($customers[$i]["tongtienconno"]<0)
	  {
		  $customers[$i]["trangthaithanhtoan"]=2; 
	  }
	  else
	  {
		  $customers[$i]["trangthaithanhtoan"]=0; 
	  }
    }
        
        return json_encode($customers, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoitrongngaysaleonline()
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->whereHas('khammoi', function($q){
          $q->where('idsale', '<>', '0')->orwhere('idsale', '<>', 'NULL');
      })->with(['khammoi' => function($query){
          $query->with('sales')->with('salesoffline')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoitrongngaydirectsale()
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->whereHas('khammoi', function($q){
          $q->where('idsaleoff', '<>', '0')->orwhere('idsaleoff', '<>', 'NULL');
      })->with(['khammoi' => function($query){
          $query->with('sales')->with('salesoffline')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
    public function getallkhammoitrongngaybacsi($id)
    {
        $khammoitong=[];
        $thanhtoan = Thanhtoankhachhang::with('khachhang')->with('chinhanhs')->whereHas('khammoi', function($q) use ($id){
          $q->where('bacsi', $id);
      })->with(['khammoi' => function($query){
          $query->with('bacsis')->with('dichvus');
        }])->orderBy('created_at', 'DESC')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $khammoi=$thanhtoan[$i]->khammoi;
          $tongchiphitt = Thanhtoankhachhang::select(DB::raw("SUM(tongtien) as tongtiendtt"))->whereHas('khammoi', function($q) use ($id){
            $q->where('bacsi', $id);
        })->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $tongchiphi = Chiphi::select(DB::raw("SUM(saugiam) as tongtienchiphi"))->whereHas('khammoi', function($q) use ($id){
            $q->where('bacsi', $id);
        })->where('idkhammoi','=',$thanhtoan[$i]->idkhammoi)->get();
          $bacsi=$khammoi['bacsis'];
          if($thanhtoan[$i]->khachhang!=null && $bacsi!=null)
          {
            $thanhtoan[$i]["tongchiphidieutri"]=$tongchiphi[0]->tongtienchiphi;
            $thanhtoan[$i]["tienconnokhammoi"]=$tongchiphi[0]->tongtienchiphi-$tongchiphitt[0]->tongtiendtt;
            if($thanhtoan[$i]["tongchiphidieutri"]!=null)
            {
              $khammoitong[]=$thanhtoan[$i];
            }
            
          }
         
        }
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
        
    }
    public function capNhatSao(Request $request,$id)
    {
      $khammoi = Khammoi::find($id);
      $khammoi->sosao = $request->get('sosao');
      $khammoi->save();
      return response()->json('Successfully Updated');
    }
	public function capnhat7ngay(Request $request,$id)
    {
      $khammoi = Khammoi::find($id);
      $khammoi->trangthai7ngay = 1;
      $khammoi->save();
      return response()->json('Successfully Updated');
    }
	public function capnhat30ngay(Request $request,$id)
    {
      $khammoi = Khammoi::find($id);
      $khammoi->trangthai30ngay = 1;
      $khammoi->save();
      return response()->json('Successfully Updated');
    }
	public function capnhat90ngay(Request $request,$id)
    {
      $khammoi = Khammoi::find($id);
      $khammoi->trangthai90ngay = 1;
      $khammoi->save();
      return response()->json('Successfully Updated');
    }
    public function capNhatNote(Request $request,$id)
    {
      $khammoi = Khammoi::find($id);
      $khammoi->note = $request->get('note');
      $khammoi->save();
      return response()->json('Successfully Updated');
    }
}
