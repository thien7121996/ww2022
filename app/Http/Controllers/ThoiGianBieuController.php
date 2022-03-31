<?php

namespace App\Http\Controllers;
use App\Thoigianbieu;
use App\Role;
use App\User;
use App\Nguongioithieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ThoiGianBieuController extends Controller
{
    public function index()
    {
      $thoigianbieu = DB::table('lichhen')->distinct()->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
      ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
      ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')
      ->orderBy('lichhen.start', 'desc')->get();
                                 

        return $thoigianbieu->toJson();
    }
    public function indextheothang(Request $request,$month)
    {
      $idchinhanh=$request->chinhanhkh;
      if($request->chinhanhkh==0 || $request->chinhanhkh==null)
      {
        $thoigianbieu = Thoigianbieu::distinct()->with('khachhangs')
        ->with('bacsis')
        ->with('dichvus')
        ->with('dieutris')
        ->with(['dieutritheolich' => function ($query) {
          $query->with('chinhanhs');
      }])
        ->with('benhlys')
        ->with('khammois')
        ->with('chinhanhs')
        ->where('start','LIKE','2022-'.$month.'%')
        
        ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      }
      else
      {
        $thoigianbieu = Thoigianbieu::distinct()->with('khachhangs')
        ->with('bacsis')
        ->with('dichvus')
        ->with('dieutris')
        ->with(['dieutritheolich' => function ($query) {
          $query->with('chinhanhs');
      }])
        ->with('benhlys')
        ->with('khammois')
        ->with('chinhanhs')
        ->where('start','LIKE','2022-'.$month.'%')
        ->whereHas('khachhangs', function($q) use ($idchinhanh){
          $q->where('chinhanh', $idchinhanh);
      })
        ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      }
     
      $tongthoigianbieu=[];
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
      } 
        return $tongthoigianbieu;
    }
	public function indextheothangcongty($iduser)
    {
		$user = User::where('id',$iduser)->first();
        $jsonnguon=json_decode($user->nguon, true);
		$nguonlist=[];
		foreach($jsonnguon as $nguonitem)
		{
			$nguonlist[]=$nguonitem["value"];
		}
      $thoigianbieu = Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function ($query) {
        $query->with('chinhanhs');
    }])
      ->with('benhlys')
      ->with('khammois')
      ->with('chinhanhs')
	  ->whereHas('khammois',function ($query) use ($nguonlist) {
    $query->whereIn('nguon',$nguonlist);
          
})
      ->where('start','LIKE','2022-'.now()->month.'%')
      
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      $tongthoigianbieu=[];
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
      } 
        return $tongthoigianbieu;
    }
    public function laytenkhtheobacsi($id)
    {
      
      $thoigianbieu = Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('khammois')
      ->where('idbacsi',$id)
      
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
      $tongthoigianbieu=[];
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
      } 
        return $tongthoigianbieu;
    }
    public function store(Request $request)
    {
      $date = strtotime($request->start);
     
          $thoigianbieu = Thoigianbieu::create([
            'idkhachhang' => $request->idkhachhang,
            'dichvu' => $request->dichvu,
            'trangthai' => $request->trangthai,
            'ghichu' => $request->ghichu,
            'loai' => $request->loai,
            'dieutri' => $request->dieutri,
            'benhly' => $request->benhly,
            'idkhammoi' => $request->idkhammoi,
            'start' => date('Y-m-d h:i:s', $date),
            'end' => date('Y-m-d h:i:s', $date),
            'giohen' => $request->giohen,
			'gioketthuc' => $request->gioketthuc,
            'idbacsi' => $request->idbacsi,
          ]);
      return $thoigianbieu->id;
    }
    public function lichlamviecchitiet($id)
    {
      $thoigianbieu = Thoigianbieu::find($id);
      return $thoigianbieu->toJson();
    }
    public function lichlamvieckhachhang($id)
    {
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->select('lichhen.*','doctor.ten AS tenbacsi','dichvu.ten AS tendichvu')->where("lichhen.idkhachhang",'=',$id)->get();
     
      return $tongthoigianbieu->toJson();
    }
    public function update(Request $request, $id)
    {
      $date = strtotime($request->get('start'));
      
        $thoigianbieu = Thoigianbieu::find($id);
        $thoigianbieu->idkhachhang = $request->get('idkhachhang');
        $thoigianbieu->dichvu = $request->get('dichvu');
        $thoigianbieu->trangthai = $request->get('trangthai');
        $thoigianbieu->ghichu = $request->get('ghichu');
        $thoigianbieu->loai = $request->get('loai');
        $thoigianbieu->dieutri = $request->get('dieutri');
        $thoigianbieu->benhly = $request->get('benhly');
        $thoigianbieu->idkhammoi = $request->get('idkhammoi');
        $thoigianbieu->start =  date('Y-m-d h:i:s', $date);
        $thoigianbieu->end = date('Y-m-d h:i:s', $date);
        $thoigianbieu->giohen = $request->get('giohen');
		$thoigianbieu->gioketthuc = $request->get('gioketthuc');
        $thoigianbieu->idbacsi = $request->get('idbacsi');
        $thoigianbieu->save();

        return response()->json('Successfully Updated');
    }
	public function capnhatthoigianlichhen(Request $request, $id)
    {
      
		$mangStart=explode(',', $request->startDate);
		$mangEnd=explode(',', $request->endDate);
		$mangGioHen=explode(':', $mangStart[1]);
		$mangGioKetThuc=explode(':', $mangEnd[1]);
        $thoigianbieu = Thoigianbieu::find($id);
        
         $mangngaybd=explode('/', $mangStart[0]);
		$ngaybd=$mangngaybd[1]."/".$mangngaybd[0]."/".$mangngaybd[2];
		$mangngaykt=explode('/', $mangEnd[0]);
		$ngaykt=$mangngaykt[1]."/".$mangngaykt[0]."/".$mangngaykt[2];
        $thoigianbieu->start =  date('Y-m-d h:i:s', strtotime($ngaybd));
        $thoigianbieu->end = date('Y-m-d h:i:s', strtotime($ngaykt));
        $thoigianbieu->giohen = $mangGioHen[0].":".$mangGioHen[1];
		$thoigianbieu->gioketthuc = $mangGioKetThuc[0].":".$mangGioKetThuc[1];
        $thoigianbieu->save();
       

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $thoigianbieu = Thoigianbieu::find($id);
      $thoigianbieu->delete();

      return response()->json('Successfully Deleted');
    }
    public function lichtheokh($id)
    {
      
     
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')->select('lichhen.*','doctor.ten AS tenbacsi')->where("idkhachhang",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
    public function lichhendieutri($id)
    {
      
      $thoigianbieu = DB::table('lichhen')->join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
      ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')
      ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','chandoancacloai.ten AS tenbenhly')->where("dieutri",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
    
    public function lichhendieutritheoid($id)
    {
      
      $thoigianbieu = DB::table('lichhen')->where("id",'=',$id)->get();
      return $thoigianbieu->toJson();
    }
	public function lichhenallbacsitrongthang()
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('chinhanhs')
      ->with('khammois')
      ->where('start','LIKE','2022-'.date('m').'%')
	  ->whereDay('start', '>=', date('d'))
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		$giokt = date('h:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
		$thoigianbieu[$i]["text"]=$thoigianbieu[$i]->khachhangs->hoten." - Điều trị: ".$thoigianbieu[$i]->dieutris->ten;
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!=null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		
      } 
        return $tongthoigianbieu;
        
    }
	public function lichhentheobacsitrongthang()
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('chinhanhs')
      ->with('khammois')
      ->where('start','LIKE','2022-'.date('m').'%')
	  ->whereDay('start', '>=', date('d'))
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		$giokt = date('H:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
		$thoigianbieu[$i]["text"]=$thoigianbieu[$i]->khachhangs->hoten." - Điều trị: ".$thoigianbieu[$i]->dieutris->ten;
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!=null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		$thoigianbieu[$i]["gioketthuc"]=$gioketthuc;
      } 
        return $tongthoigianbieu;
        
    }
	public function lichhentheobacsitrongthangtoi($id)
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('chinhanhs')
      ->with('khammois')
      ->where('start','LIKE','2022-'.date('m').'%')
	  ->whereDay('start', '>=', date('d'))
      ->where('idbacsi',$id)
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		$giokt = date('h:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
		$thoigianbieu[$i]["text"]=$thoigianbieu[$i]->khachhangs->hoten." - Điều trị: ".$thoigianbieu[$i]->dieutris->ten;
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!=null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		
      } 
        return $tongthoigianbieu;
        
    }
	 public function chitietlichhentheobacsi($id)
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('chinhanhs')
      ->with('khammois')
      ->where('start','LIKE','2022-'.date('m').'%')
      ->where('id',$id)
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		$giokt = date('h:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
		$thoigianbieu[$i]["text"]=$thoigianbieu[$i]->khachhangs->hoten." - Điều trị: ".$thoigianbieu[$i]->dieutris->ten;
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!=null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["gioketthuc"]=$gioketthuc;
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		$mangngaybdlh=explode("-", $stardayArray[0]);
		$thoigianbieu[$i]["ngaybatdaulichhen"]=$mangngaybdlh[2]."/".$mangngaybdlh[1]."/".$mangngaybdlh[0];
      } 
        return $tongthoigianbieu[0];
        
    }
    public function lichhentheobacsi($id)
    {
      $thoigianbieu =Thoigianbieu::distinct()->with('khachhangs')
      ->with('bacsis')
      ->with('dichvus')
      ->with('dieutris')
      ->with(['dieutritheolich' => function($query){
        $query->with('chinhanhs');
      }])
      ->with('benhlys')
      ->with('chinhanhs')
      ->with('khammois')
      ->where('start','LIKE','2022-'.date('m').'%')
      ->where('idbacsi',$id)
      ->orderBy('start', 'desc')->orderBy('giohen', 'desc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
            $tongdoanvan=[];
			$paragraphs = explode("\n", $thoigianbieu[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thoigianbieu[$i]["ghichutext"]=$tongdoanvan;
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		$giokt = date('h:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
		$thoigianbieu[$i]["text"]=$thoigianbieu[$i]->khachhangs->hoten." - Điều trị: ".$thoigianbieu[$i]->dieutris->ten;
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!=null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		
      } 
        return $tongthoigianbieu;
        
    }
	public function lichhentheobacsitheongay(Request $request,$id)
    {
		
		
     
    
		$arrayNgay = explode("/", $request->ngay);
      $thoigianbieu =Thoigianbieu::distinct()->where('start','LIKE','2022-'.$arrayNgay[1].'-'.$arrayNgay[0].'%')
      ->where('idbacsi',$id)
      ->orderBy('start', 'asc')->orderBy('giohen', 'asc')->get();
                                 
      $tongthoigianbieu=[];
	  
      for($i=0;$i<count($thoigianbieu);$i++)
      {
        if($thoigianbieu[$i]->khachhangs!=null && $thoigianbieu[$i]->bacsis!=null)
        {
            
          
          $tongthoigianbieu[]=$thoigianbieu[$i];
        }
		$stardayArray = explode(" ", $thoigianbieu[$i]->start);
		
		
		$thoigianbieu[$i]["startDate"]=$stardayArray[0]."T".$thoigianbieu[$i]->giohen.":00.000Z";
		if($thoigianbieu[$i]->gioketthuc!==null)
		{
			$gioketthuc=$thoigianbieu[$i]->gioketthuc;
		}
		else
		{
			$giokt = date('H:i', strtotime($thoigianbieu[$i]->giohen . ' + 1 hours'));
			$gioketthuc=$giokt;
		}
		$thoigianbieu[$i]["endDate"]=$stardayArray[0]."T".$gioketthuc.":00.000Z";
		$thoigianbieu[$i]["gioketthuc"]=$gioketthuc;
      } 
        return $tongthoigianbieu;
        
    }
    public static function boloclichhen(Request $request)
    {
      $param = $request->all();
      $lichhen = Thoigianbieu::boloc($param);
       return $lichhen->get()->toJson();
        
    }
    public static function testlichhen()
    {
      $startTime = date("Y-m-d H:i:s","01/01/2022");
    
      $lichhen = Thoigianbieu::join('doctor', 'lichhen.idbacsi', '=', 'doctor.id')
        ->join('dichvu', 'lichhen.dichvu', '=', 'dichvu.id')->join('dieutri', 'lichhen.dieutri', '=', 'dieutri.id')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')
    ->join('chandoancacloai', 'lichhen.benhly', '=', 'chandoancacloai.id')->join('khachhang', 'lichhen.idkhachhang', '=', 'khachhang.ID')
    ->select('lichhen.*','doctor.ten AS tenbacsi','khachhang.hoten AS tenkhachhang','dichvu.ten AS tendichvu','dieutri.ten AS tendieutri','dieutritheolich.trangthai AS trangthailichhen','dieutritheolich.luuy AS luuylichhen','chandoancacloai.ten AS tenbenhly')->where(DB::raw("(DATE_FORMAT(start,'%Y-%m-%d'))"), '>', $startTime)->where(DB::raw("(DATE_FORMAT(start,'%Y-%m-%d'))"), '<', $startTime);
  return $lichhen->toJson(); 
  }
}
