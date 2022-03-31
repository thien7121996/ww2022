<?php

namespace App\Http\Controllers;
use App\Khachhang;
use App\Thanhtoankhachhang;
use App\Capdo;
use App\Lichsutichluy;
use App\Tientichluy;
use App\Chiphi;
use App\Lichsuchinhsua;
use App\Khammoi;
use App\Thoigianbieu;
use App\Dieutritheolich;
use App\Sanphamdichvu;
use App\Anhdieutri;
use App\Anhlichhen;
use App\Tiensubenh;
use App\Doctor;
use App\Dichvu;
use App\Nguongioithieu;
use App\User;
use App\Chinhanh;
use App\Quangcao;
use App\Chandoancacloai;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

use Session;
class KhachhangController extends Controller
{
    public function index(Request $request)
    {
     
     
	 
     if(isset($request->iduser))
		{
			$user=User::find($request->iduser);
		$chinhanh=json_decode($user->chinhanh);
		if($chinhanh!=0)
		{
			$mangcn=[];
			for($i=0;$i<count($chinhanh);$i++)
			{
				if($chinhanh[$i]->value!=0)
				{
						$mangcn[]=$chinhanh[$i]->value;
				}
			
			}
			if($user->chinhanh=="0" || $user->chinhanh=="null" || !isset($request->iduser) || count($mangcn)==0)
		{
			$customer = Khachhang::with('chinhanhs')->whereRaw('Date(created_at) = CURDATE()')->orderBy('ID', 'desc')->get();
		}
		else
		{
			
		
        $customer = Khachhang::with('chinhanhs')->whereIn('chinhanh', $mangcn)->whereRaw('Date(created_at) = CURDATE()')->orderBy('ID', 'desc')->get();
		}
		}
		else
		{
			$customer = Khachhang::with('chinhanhs')->whereRaw('Date(created_at) = CURDATE()')->orderBy('ID', 'desc')->get();
		}	
		}
		else
		{
			$customer = Khachhang::with('chinhanhs')->whereRaw('Date(created_at) = CURDATE()')->orderBy('ID', 'desc')->get();
		}
				
		
		
      
     
      return $customer->toJson();
    }
	public function demkh(Request $request)
	{
		if(isset($request->iduser))
		{
			$user=User::find($request->iduser);
		$chinhanh=json_decode($user->chinhanh);
		if($chinhanh!=0)
		{
			$mangcn=[];
			for($i=0;$i<count($chinhanh);$i++)
			{
				if($chinhanh[$i]->value!=0)
				{
						$mangcn[]=$chinhanh[$i]->value;
				}
			
			}
			if($user->chinhanh=="0" || $user->chinhanh=="null" || !isset($request->iduser) || count($mangcn)==0)
		{
			$customer = Khachhang::with('chinhanhs')->orderBy('ID', 'desc')->count();
		}
		else
		{
			
		
        $customer = Khachhang::with('chinhanhs')->whereIn('chinhanh', $mangcn)->orderBy('ID', 'desc')->count();
		}
		}
		else
		{
			$customer = Khachhang::with('chinhanhs')->orderBy('ID', 'desc')->count();
		}	
		}
		else
		{
			$customer = Khachhang::with('chinhanhs')->orderBy('ID', 'desc')->count();
		}
		
		return $customer;		
	}
    public function indexbyidbacsi($id)
    {
            
      $customer = DB::table('khachhang')->where("bacsidieutri",$id)->orderBy('ID', 'desc')->get();
     
      return $customer->toJson();
    }
    public function store(Request $request)
    {
      
      $path = 'uploads\customer';
      $imageName="";
      $imagetruocmatbefore="";      
      $imagehamduoibefore="";  
      $imagetruocmatafter="";  
      $imagehamtrenafter="";  
      $imagehamduoiafter="";  
      if ($request->anhdaidien){
        $image_64 =  $request->anhdaidien;
        
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $image = str_replace($replace, '', $image_64); 
      
       $image = str_replace(' ', '+', $image); 
      
       $imageName = "anhdaidien-".str_random(10).'.'.$extension;
        \File::put(public_path(). '/uploads/customer/' .$imageName, base64_decode($image));        
      }
      else
      {
        $imageName="nonuser.jpg";
      }
      if ($request->hamduoi){
        $image_64hd =  $request->hamduoi;
        
        $extensionhd = explode('/', explode(':', substr($image_64hd, 0, strpos($image_64hd, ';')))[1])[1];   // .jpg .png .pdf

        $replacehd = substr($image_64hd, 0, strpos($image_64hd, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehd = str_replace($replacehd, '', $image_64hd); 
      
       $imagehd = str_replace(' ', '+', $imagehd); 
      
       $imageNamehd ="hamduoi-".str_random(10).'.'.$extensionhd;
        \File::put(public_path(). '/uploads/customer/' . $imageNamehd, base64_decode($imagehd));        
      }
      else
      {
        $imageNamehd="nonuser.jpg";
      }
        // UP ẢNH TRƯỚC MẶT BEFORE
        if ($request->truocmatbefore){
          $image_64tmbf =  $request->truocmatbefore;
          
          $extensiontmbf = explode('/', explode(':', substr($image_64tmbf, 0, strpos($image_64tmbf, ';')))[1])[1];   // .jpg .png .pdf
  
          $replacetmbf = substr($image_64tmbf, 0, strpos($image_64tmbf, ',')+1); 
        
        // find substring fro replace here eg: data:image/png;base64,
        
         $imagetmbf = str_replace($replacetmbf, '', $image_64tmbf); 
        
         $imagetmbf = str_replace(' ', '+', $imagetmbf); 
        
         $imagetruocmatbefore ="hamtren-".str_random(10).'.'.$extensiontmbf;
          \File::put(public_path(). '/uploads/customer/' .$imagetruocmatbefore , base64_decode($imagetmbf));        
        }
        else
        {
          $imagetruocmatbefore ="nonuser.jpg";
        }
      // UP ẢNH HÀM TRÊN BEFORE
      if ($request->hamtrenbefore){
        $image_64htbf =  $request->hamtrenbefore;
        
        $extensionhtbf = explode('/', explode(':', substr($image_64htbf, 0, strpos($image_64htbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtbf = substr($image_64htbf, 0, strpos($image_64htbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtbf = str_replace($replacehtbf, '', $image_64htbf); 
      
       $imagehtbf = str_replace(' ', '+', $imagehtbf); 
      
       $imagehamtrenbefore ="hamtren-".str_random(10).'.'.$extensionhtbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenbefore, base64_decode($imagehtbf));        
      }
      else
      {
        $imagehamtrenbefore="nonuser.jpg";
      }
      // UP ẢNH HÀM DƯỚI BEFORE
      if ($request->hamduoibefore){
        $image_64hdbf =  $request->hamduoibefore;
        
        $extensionhdbf = explode('/', explode(':', substr($image_64hdbf, 0, strpos($image_64hdbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdbf = substr($image_64htbf, 0, strpos($image_64hdbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdbf = str_replace($replacehdbf, '', $image_64hdbf); 
      
       $imagehdbf = str_replace(' ', '+', $imagehdbf); 
      
       $imagehamduoibefore ="hamtren-".str_random(10).'.'.$extensionhdbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoibefore , base64_decode($imagehdbf));        
      }
      else
      {
        $imagehamduoibefore ="nonuser.jpg";
      }
      // UP ẢNH TRƯỚC MẶT AFTER
      if ($request->truocmatafter){
        $image_64tmat =  $request->truocmatafter;
        
        $extensiontmat = explode('/', explode(':', substr($image_64tmat, 0, strpos($image_64tmat, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmat = substr($image_64tmat, 0, strpos($image_64tmat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmat = str_replace($replacetmat, '', $image_64tmat); 
      
       $imagetmat = str_replace(' ', '+', $imagetmat); 
      
       $imagetruocmatafter ="hamtren-".str_random(10).'.'.$extensiontmat;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatafter , base64_decode($imagetmat));        
      }
      else
      {
        $imagetruocmatafter ="nonuser.jpg";
      }
      // UP ẢNH HÀM TRÊN AFTER
      if ($request->hamtrenafter){
        $image_64htat =  $request->hamtrenafter;
        
        $extensionhtat = explode('/', explode(':', substr($image_64htat, 0, strpos($image_64htat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtat = substr($image_64htat, 0, strpos($image_64htat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtat = str_replace($replacehtat, '', $image_64htat); 
      
       $imagehtat = str_replace(' ', '+', $imagehtat); 
      
       $imagehamtrenafter ="hamtren-".str_random(10).'.'.$extensionhtat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenafter , base64_decode($imagehtat));        
      }
      else
      {
        $imagehamtrenafter ="nonuser.jpg";
      }
      // UP ẢNH HÀM DƯỚI AFTER
      if ($request->hamduoiafter){
        $image_64hdat =  $request->hamduoiafter;
        
        $extensionhdat = explode('/', explode(':', substr($image_64hdat, 0, strpos($image_64hdat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdat = substr($image_64hdat, 0, strpos($image_64hdat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdat = str_replace($replacehdat, '', $image_64hdat); 
      
       $imagehdat = str_replace(' ', '+', $imagehdat); 
      
       $imagehamduoiafter ="hamtren-".str_random(10).'.'.$extensionhdat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoiafter , base64_decode($imagehdat));        
      }
      else
      {
        $imagehamduoiafter ="nonuser.jpg";
      }
      $hoten = $request->hoten;
      $gioitinh = $request->gioitinh;
      $ngaysinh = $request->ngaysinh;
      $diachi = $request->diachi;
      $dienthoai = $request->dienthoai;
      $tiensubenh = $request->tiensubenh;
      $gioithieu = $request->gioithieu;
      $dichvudieutri = $request->dichvudieutri;
      $nguongioithieu = $request->nguongioithieu;
      $danhgia = $request->danhgia;
      $sosao = $request->sosao;
      $bacsidieutri = $request->bacsidieutri;
      $trangthai = $request->trangthai;
      $khuvuc = $request->khuvuc;
      $chinhanh = $request->chinhanhkh;
      $masale = $request->masale;
      $nguoncongty = $request->nguoncongty;
      $phonegioithieu = $request->phonegioithieu;
      $customer =  DB::table('khachhang')->insertGetId([
        'hoten' => $hoten,
        'gioitinh' => $gioitinh,
        'ngaysinh' => $ngaysinh,
        'diachi' => $diachi,
        'dienthoai' => $dienthoai,
        'tiensubenh' => json_encode($tiensubenh),
        'gioithieu' => $gioithieu,
        'khuvuc' => $khuvuc,
        'dichvudieutri' => json_encode($dichvudieutri),
        'nguongioithieu' => json_encode($nguongioithieu),
        'anhdaidien' => $imageName,
        'truocmatbefore' => $imagetruocmatbefore,
        'hamtrenbefore' => $imagehamtrenbefore,
        'hamduoibefore' =>$imagehamduoibefore,
        'truocmatafter' => $imagetruocmatafter,
        'hamtrenafter' => $imagehamtrenafter,
        'hamduoiafter' =>$imagehamduoiafter,
        'danhgia' => $danhgia,
        'sosao' => $sosao,
        'bacsidieutri' => $bacsidieutri,
        'trangthai' => $trangthai,
        'chinhanh' => $chinhanh,
        'masale' => $masale,
        'nguoncongty' => $nguoncongty,
        'mahoso' => $request->mahoso
      ]);
      
    
      
      $thanhtoan = Tientichluy::create([
        'tientichluy' => 0,
        'idkhachhang' => $customer
      ]);
     
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Tạo khách hàng mới có ID ".$customer,
        'idkhachhang' => $customer,
        'userchinhsua' => $request->cookie('userkhname')
      ]);    
    return response()->json($customer);
    }
    public function update(Request $request, $id)
    {
      $path = 'uploads\customer';
      
      $imageNameNew= $request->get('anhdaidien');
      if(strpos($imageNameNew, 'anhdaidien-') !== false || strpos($imageNameNew, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64 =  $request->get('anhdaidien');
        
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',')+1); 
      
       $image = str_replace($replace, '', $image_64); 
      
       $image = str_replace(' ', '+', $image); 
      
       $imageNameNew = "anhdaidien-".str_random(10).'.'.$extension;
        \File::put(public_path(). '/uploads/customer/' .$imageNameNew, base64_decode($image));  
      }
      
      $imagetruocmatbefore= $request->get('truocmatbefore');      
      if(strpos($imagetruocmatbefore, 'hamtren-') !== false || strpos($imagetruocmatbefore, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64tmbf =  $request->get('truocmatbefore');
          
        $extensiontmbf = explode('/', explode(':', substr($image_64tmbf, 0, strpos($image_64tmbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmbf = substr($image_64tmbf, 0, strpos($image_64tmbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmbf = str_replace($replacetmbf, '', $image_64tmbf); 
      
       $imagetmbf = str_replace(' ', '+', $imagetmbf); 
      
       $imagetruocmatbefore ="hamtren-".str_random(10).'.'.$extensiontmbf;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatbefore , base64_decode($imagetmbf));  
      }
      
      $imagehamduoibefore = $request->get('hamduoibefore');
      if(strpos($imagehamduoibefore, 'hamduoi-') !== false || strpos($imagehamduoibefore, 'hamtren-') !== false  || strpos($imagehamduoibefore, 'nonuser') !== false) { 
        
      }
      else
      {
         $image_64hd =  $request->get('hamduoibefore');
            
         $extensionhd = explode('/', explode(':', substr($image_64hd, 0, strpos($image_64hd, ';')))[1])[1];   // .jpg .png .pdf

         $replacehd = substr($image_64hd, 0, strpos($image_64hd, ',')+1); 
          
          // find substring fro replace here eg: data:image/png;base64,
          
          $imagehd = str_replace($replacehd, '', $image_64hd); 
          
          $imagehd = str_replace(' ', '+', $imagehd); 
          
          $imagehamduoibefore ="hamduoi-".str_random(10).'.'.$extensionhd;
            \File::put(public_path(). '/uploads/customer/' . $imagehamduoibefore, base64_decode($imagehd));  
      }

      $imagehamtrenbefore = $request->get('hamtrenbefore');
      if(strpos($imagehamtrenbefore, 'hamtren-') !== false || strpos($imagehamtrenbefore, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64htbf =  $request->get('hamtrenbefore');
        
        $extensionhtbf = explode('/', explode(':', substr($image_64htbf, 0, strpos($image_64htbf, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtbf = substr($image_64htbf, 0, strpos($image_64htbf, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtbf = str_replace($replacehtbf, '', $image_64htbf); 
      
       $imagehtbf = str_replace(' ', '+', $imagehtbf); 
      
       $imagehamtrenbefore ="hamtren-".str_random(10).'.'.$extensionhtbf;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenbefore, base64_decode($imagehtbf)); 
      }
      $imagetruocmatafter= $request->get('truocmatafter'); 
      if(strpos($imagetruocmatafter, 'hamtren-') !== false || strpos($imagetruocmatafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64tmat = $request->get('truocmatafter'); 
        
        $extensiontmat = explode('/', explode(':', substr($image_64tmat, 0, strpos($image_64tmat, ';')))[1])[1];   // .jpg .png .pdf

        $replacetmat = substr($image_64tmat, 0, strpos($image_64tmat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagetmat = str_replace($replacetmat, '', $image_64tmat); 
      
       $imagetmat = str_replace(' ', '+', $imagetmat); 
      
       $imagetruocmatafter ="hamtren-".str_random(10).'.'.$extensiontmat;
        \File::put(public_path(). '/uploads/customer/' .$imagetruocmatafter , base64_decode($imagetmat));
      }
      $imagehamtrenafter= $request->get('hamtrenafter');
      if(strpos($imagehamtrenafter, 'hamtren-') !== false || strpos($imagehamtrenafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64htat =  $request->get('hamtrenafter');
        
        $extensionhtat = explode('/', explode(':', substr($image_64htat, 0, strpos($image_64htat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehtat = substr($image_64htat, 0, strpos($image_64htat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehtat = str_replace($replacehtat, '', $image_64htat); 
      
       $imagehtat = str_replace(' ', '+', $imagehtat); 
      
       $imagehamtrenafter ="hamtren-".str_random(10).'.'.$extensionhtat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamtrenafter , base64_decode($imagehtat));    
      }
      $imagehamduoiafter= $request->get('hamduoiafter');  
      if(strpos($imagehamduoiafter, 'hamtren-') !== false || strpos($imagehamduoiafter, 'nonuser') !== false) { 
        
      }
      else
      {
        $image_64hdat =  $request->get('hamduoiafter');
        
        $extensionhdat = explode('/', explode(':', substr($image_64hdat, 0, strpos($image_64hdat, ';')))[1])[1];   // .jpg .png .pdf

        $replacehdat = substr($image_64hdat, 0, strpos($image_64hdat, ',')+1); 
      
      // find substring fro replace here eg: data:image/png;base64,
      
       $imagehdat = str_replace($replacehdat, '', $image_64hdat); 
      
       $imagehdat = str_replace(' ', '+', $imagehdat); 
      
       $imagehamduoiafter ="hamtren-".str_random(10).'.'.$extensionhdat;
        \File::put(public_path(). '/uploads/customer/' .$imagehamduoiafter , base64_decode($imagehdat));    
      }
      $imageName = $imageNameNew;
      $phonegioithieu = $request->phonegioithieu;
      if($phonegioithieu=='')
      {
        $phonegioithieu=0;
      }
      $customer = Khachhang::find($id);
      DB::table('khachhang')
            ->where('ID', $id)
            ->update([
             'hoten' => $request->get('hoten'),
             'gioitinh' => $request->get('gioitinh'),
             'ngaysinh' => $request->get('ngaysinh'),
             'diachi' => $request->get('diachi'),
             'dienthoai' => $request->get('dienthoai'),
             'tiensubenh' => json_encode($request->get('tiensubenh')),
             'gioithieu' => $request->get('gioithieu'),
             'khuvuc' => $request->get('khuvuc'),
             'dichvudieutri' => json_encode($request->get('dichvudieutri')),
             'nguongioithieu' => json_encode($request->get('nguongioithieu')),
             'anhdaidien' => $imageName,
             'truocmatbefore' => $imagetruocmatbefore,
             'hamtrenbefore' => $imagehamtrenbefore,
             'hamduoibefore' => $imagehamduoibefore,
             'truocmatafter' => $imagetruocmatafter,
             'hamtrenafter' => $imagehamtrenafter,
             'hamduoiafter' => $imagehamduoiafter,
             'danhgia' => $request->get('danhgia'),
             'sosao' => $request->get('sosao'),
             'bacsidieutri' => $request->get('bacsidieutri'),
             'trangthai' => $request->get('trangthai'),
             'chinhanh' => $request->get('chinhanh'),
             'masale' => $request->get('masale'),
             'nguoncongty' => $request->get('nguoncongty'),
             'phonegioithieu' => $phonegioithieu,
             'mahoso' => $request->get('mahoso'),
             'chinhanh' => $request->get('chinhanh')
             ]);
     
     
             $lichsuchinhsua = Lichsuchinhsua::create([
              'noidungchinhsua' => "Cập nhật khách hàng mới có ID ".$id,
              'idkhachhang' => $id,
              'userchinhsua' => $request->cookie('userkhname')
            ]); 
      return response()->json($customer);
      
    }
    public function xoakhachhang(Request $request,$id)
    {
      $customer = Khachhang::where('ID',$id);
      $customertim = Khachhang::where('ID',$id)->first();
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Xóa khách hàng có tên là ".$customertim->hoten,
        'idkhachhang' => $id,
        'userchinhsua' => $request->cookie('userkhname')
      ]); 
      $customer->delete();
      $khammoi = Khammoi::where('idkhachhang',$id);
      $khammoi->delete();
      $thoigianbieu = Thoigianbieu::where('idkhachhang',$id);
      $thoigianbieu->delete(); 
      $dieutrithieulich = Dieutritheolich::where('idkhachhang',$id);
      $dieutrithieulich->delete();
      $anhdieutri = Anhdieutri::where('idkhachhang',$id);
      $anhdieutri->delete();
      $anhlichhen = Anhlichhen::where('idkhachhang',$id);
      $anhlichhen->delete();
      $thanhtoan = Thanhtoankhachhang::where('idkhachhang',$id);
      $thanhtoan->delete(); 
      return response()->json('Xóa thành công');
    }
    public function xoatatcakhachhang()
    {
     
     
      $thanhtoan = Quangcao::truncate();
     
      return response()->json('Xóa thành công');
    }
    public function chitietkhachhang($id)
    {
      $customer = Khachhang::with('chinhanhs')->with('nguoncongtys')->where('ID',$id)->first();
     
          $tongdoanvan=[];
          $paragraphs = explode("\n", $customer->gioithieu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $customer["ghichutext"]=$tongdoanvan;
          $customer["thoigianhethong"]=date('Y-m-d H:i:s');
    
      return $customer->toJson();
    }
    public static function bolockhachhangs(Request $request)
    {
      $param = $request->all();
    
      $customers = Khachhang::join('lichhen', 'lichhen.idkhachhang', '=', 'khachhang.ID')
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
          DB::raw('GROUP_CONCAT(DISTINCT lichhen.start, "") AS lichhenkh')
          
      ])

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
      ->groupBy('khachhang.trangthai')
      ->groupBy('khachhang.ID');
       return $customers->get()->toJson();
        
    }
       
    public static function bolockhachhang(Request $request)
    {
      $param = $request->all();
      $khachhang = Khachhang::filter($param)->get();
      if($request->chinhanhkh==0 || $request->chinhanhkh==null)
      {
        return $khachhang->toJson();
      }
      else
      {
        $kh=[];
        for($i=0;$i<count($khachhang);$i++)
        {
          if($khachhang[$i]["chinhanh"]==$request->chinhanhkh)
          {
            $kh[]=$khachhang[$i];
          }
        }
        return $kh;
      }
       
        
    }
    public static function bolocdoanhthukh(Request $request)
    {
      $param = $request->all();
      $khachhang = Khachhang::boloc($param);
  
    
       return $khachhang->get()->toJson();
        
    }
    public static function bolocdoanhthukhtheothang(Request $request,$id)
    {
      $param = $request->all();
      $customers = Khachhang::boloctheothang($param,$id);
	  $customers=$customers->get();
   for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhachhang', $customers[$i]->ID)->whereHas('khammoi', function($q) use ($id){
    $q->whereMonth('created_at', '=', $id);
})->sum('saugiam');
 $chiphikh = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $laytongsaugiamkh = Chiphi::select(DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $laytongthanhtoankh = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $thanhtoankhachhang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhachhang",'=',$customers[$i]->ID)->whereMonth('created_at', '=', $id)->get();
	  $customers[$i]["tongtiendathanhtoan"]=$thanhtoankhachhang[0]["tongtiendathanhtoan"];
		$customers[$i]["tongtienconno"]=$laytongsaugiamkh[0]["tongsaugiam"]-$laytongthanhtoankh[0]["tongtiendathanhtoan"];
      $customers[$i]["tongsaugiam"]=$tongsaugiam;
    }
    
       return $customers->toJson();
        
    }
    public function tongkhachhang()
    {
        $sokhachhang = Khachhang::select(DB::raw('count(id) AS soluongkhachhang'))->get();
       
        $sokhachhang = $sokhachhang[0]["soluongkhachhang"];
        return $sokhachhang;
        
    }
    public function laytienkhtongSoDienThoai(){
      $khammoitong=[];
        $khammoi = Khammoi::where('phonegioithieu','<>','0')->with('dichvus')->with('khachhang')->with('chinhanhs')->orderBy('khammoi.created_at', 'DESC')->get();
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
              $hoahong=(int)$phaithanhtoan[0]->phaithanhtoan*0.05;
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
     
        return json_encode($khammoitong, JSON_UNESCAPED_UNICODE);
      
  }
  
    public function laytienkhtong(){
        $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
        ->join('chiphi', 'chiphi.idkhachhang', '=', 'khachhang.ID')->leftjoin("doctor","doctor.id","=","khachhang.bacsidieutri")
  
        ->select([
            'khachhang.ID',
            'khachhang.mahoso',
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
            'doctor.ten as tenbacsi',
           
          
         
            
            
        ])
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
        ->groupBy('khachhang.trangthai')
        ->groupBy('khachhang.mahoso')
        ->groupBy('doctor.ten')
        ->orderBy('khachhang.ID', 'desc')->get();
        for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhachhang', $customers[$i]->ID)->sum('saugiam');
      $customers[$i]["tongsaugiam"]=$tongsaugiam;
    }
         return $customers->toJson();
    }
    public function laytienkhdatt(){
      $customers = Khachhang::join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')


      ->select([
          'khachhang.ID',
          'khachhang.mahoso',
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
        
          DB::raw('SUM(thanhtoankhachhang.tongtien) as tongtiendatra'),
        
       
          
          
      ])
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
      ->groupBy('khachhang.trangthai')
      ->groupBy('khachhang.mahoso')
      ->orderBy('khachhang.ID', 'desc');
       return $customers->get()->toJson();
  }
  public function laytienkhtongtheothangtest($id){
	  
    $customers = Khachhang::with(['thanhtoankhachhangs' => function ($q) {
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
        'khachhang.mahoso',
       
      
     
        
        
    ])
    ->whereMonth('thanhtoankhachhang.created_at', '=', $id)
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
    ->groupBy('khachhang.trangthai')
    ->groupBy('khachhang.mahoso')
    ->orderBy('khachhang.ID', 'desc')->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhachhang', $customers[$i]->ID)->whereHas('khammoi', function($q) use ($id){
    $q->whereMonth('created_at', '=', $id);
})->sum('saugiam');
 $chiphikh = Chiphi::select(DB::raw('SUM(gia) AS tonggia'),DB::raw('SUM(soluong) AS soluongchiphi'),DB::raw('SUM(thanhtien) AS tongthanhtien'),DB::raw('SUM(giamgia) AS tonggiamgia'),DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $laytongsaugiamkh = Chiphi::select(DB::raw('SUM(saugiam) AS tongsaugiam'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $laytongthanhtoankh = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhachhang",'=',$customers[$i]->ID)->get();
 $thanhtoankhachhang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhachhang",'=',$customers[$i]->ID)->whereMonth('created_at', '=', $id)->get();
	  $customers[$i]["tongtiendathanhtoan"]=$thanhtoankhachhang[0]["tongtiendathanhtoan"];
		$customers[$i]["tongtienconno"]=$laytongsaugiamkh[0]["tongsaugiam"]-$laytongthanhtoankh[0]["tongtiendathanhtoan"];
      $customers[$i]["tongsaugiam"]=$tongsaugiam;
    }
     return $customers->toJson();
}
  public function laytienkhtongtheothang(Request $request,$id){
    $customers = Khammoi::with('chinhanhs')->with('dichvus')->with('nguons')->with('khachhang')->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
	 $thanhtoankhachhang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->get();
	  if($thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"]==null)
	  {
		  $ttdathanhtoan=0;
	  }
	  else
	  {
		  $ttdathanhtoan=$thanhtoankhachhangtrongthang[0]["tongtiendathanhtoan"];
	  }
	  $customers[$i]["stt"]=$i+1;
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
     return $customers->toJson();
}
public function layBieuDoChiNhanhTongTheoThang(Request $request,$id){
	$chinhanh=Chinhanh::get();
	$tongDTCN=[];
	for($j=0;$j<count($chinhanh);$j++)
	{
		$tongtiendathanhtoanChiNhanh=0;
		$tongtienconnoChiNhanh=0;
		$tongsaugiamChiNhanh=0;
		
		$customers = Khammoi::with('chinhanhs')->with('dichvus')->with('nguons')->with('khachhang')->where('chinhanh',$chinhanh[$j]["id"])->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
		for($i=0;$i<count($customers);$i++)
		{
		  $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
		
		 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
		  $tongtiendathanhtoanChiNhanh=$tongtiendathanhtoanChiNhanh+$ttdathanhtoan;
			$customers[$i]["tongtienconno"]=$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
			$tongtienconnoChiNhanh=$tongtienconnoChiNhanh+$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
		  $customers[$i]["tongsaugiam"]=$tongsaugiam;
		  $tongsaugiamChiNhanh=$tongsaugiamChiNhanh+$tongsaugiam;
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
	$chinhanh[$j]["tongtiendathanhtoan"]=$tongtiendathanhtoanChiNhanh;
	  $chinhanh[$j]["tongtienconno"]=$tongtienconnoChiNhanh;
	  $chinhanh[$j]["tongsaugiam"]=$tongsaugiamChiNhanh;
	}
    
     return $chinhanh->toJson();
}
public function layBieuDoTongTheoNam(Request $request){
	$chinhanh=Chinhanh::get();
	$tongDTCN=[];
	
	$thang=[1,2,3,4,5,6,7,8,9,10,11,12];
	
	
		$z=0;
		for($q=0;$q<count($thang);$q++)
		{
			
			$tongtiendathanhtoanChiNhanh=0;
		$tongtienconnoChiNhanh=0;
		$tongsaugiamChiNhanh=0;
		
		$customers = Khammoi::with('chinhanhs')->with('dichvus')->with('nguons')->with('khachhang')->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $thang[$q])->get();
		for($i=0;$i<count($customers);$i++)
		{
		  $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
		
		 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $thang[$q])->get();
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
		  $tongtiendathanhtoanChiNhanh=$tongtiendathanhtoanChiNhanh+$ttdathanhtoan;
			$customers[$i]["tongtienconno"]=$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
			$tongtienconnoChiNhanh=$tongtienconnoChiNhanh+$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
		  $customers[$i]["tongsaugiam"]=$tongsaugiam;
		  $tongsaugiamChiNhanh=$tongsaugiamChiNhanh+$tongsaugiam;
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
		if($tongtiendathanhtoanChiNhanh>0)
		{
				$tongDTCN[$z]["sothang"]=(string) $thang[$q];
			$tongDTCN[$z]["tongtiendathanhtoan"]=$tongtiendathanhtoanChiNhanh;
			  $tongDTCN[$z]["tongtienconno"]=$tongtienconnoChiNhanh;
			  $tongDTCN[$z]["tongsaugiam"]=$tongsaugiamChiNhanh;
			  $z++;
		}
	
		}
		
	
    
     return $tongDTCN;
}
public function layBieuDoChiNhanhTongTheoNam(Request $request){
	$chinhanh=Chinhanh::get();
	$tongDTCN=[];
	
	
	
	
	
		for($q=0;$q<count($chinhanh);$q++)
		{
			
			$tongtiendathanhtoanChiNhanh=0;
		$tongtienconnoChiNhanh=0;
		$tongsaugiamChiNhanh=0;
		
		$customers = Khammoi::with('chinhanhs')->with('dichvus')->with('nguons')->with('khachhang')->where('chinhanh',$chinhanh[$q]["id"])->whereYear('created_at', '=', $request->nam)->get();
		for($i=0;$i<count($customers);$i++)
		{
		  $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
		
		 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->get();
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
		  $tongtiendathanhtoanChiNhanh=$tongtiendathanhtoanChiNhanh+$ttdathanhtoan;
			$customers[$i]["tongtienconno"]=$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
			$tongtienconnoChiNhanh=$tongtienconnoChiNhanh+$tongsaugiam-$thanhtoankhachhang[0]["tongtiendathanhtoan"];
		  $customers[$i]["tongsaugiam"]=$tongsaugiam;
		  $tongsaugiamChiNhanh=$tongsaugiamChiNhanh+$tongsaugiam;
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
		
				
			$chinhanh[$q]["tongtiendathanhtoan"]=$tongtiendathanhtoanChiNhanh;
			  $chinhanh[$q]["tongtienconno"]=$tongtienconnoChiNhanh;
			  $chinhanh[$q]["tongsaugiam"]=$tongsaugiamChiNhanh;
			 
		
	
		}
		
	
    
     return $chinhanh;
}
public function baocaokhachhangkhongden(Request $request,$id){
    $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Dieutritheolich::with('dichvus')->where('chinhanh',$chinhanh[$z]->id)->where('trangthai',2)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
   
		$listngay=[];
		$dem=0;
		$tongkhach=0;
		$sanphamdichvu = Sanphamdichvu::all();
		for($j=0;$j<count($sanphamdichvu);$j++)
		{
			
			
			$tong=0;
			$listngay[$j]["sanphamdichvu"]=$sanphamdichvu[$j]->id;
			$listngay[$j]["tensanphamdichvu"]=$sanphamdichvu[$j]->ten;
			$listngay[$j]["tongkhach"]=$tong;		
			for($i=0;$i<count($customers);$i++)
			{
				if($customers[$i]->dieutri==$sanphamdichvu[$j]->id)
				{
					
					$tong=$tong+1;
					$listngay[$j]["sanphamdichvu"]=$customers[$i]->dieutri;
					$listngay[$j]["tensanphamdichvu"]=$customers[$i]->dichvus->ten;
					$listngay[$j]["tongkhach"]=$tong;
				}
			}
			$tongkhach=$tongkhach+$listngay[$j]["tongkhach"];
		}
		usort($listngay, function ($a, $b) {
    return $a['sanphamdichvu'] <=> $b['sanphamdichvu'];
});
$doanhthu[$z]["tongkhach"]=$tongkhach;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["listdieutri"]=$listngay;

		
	}
	$dt=[];
	for($i=0;$i<count($doanhthu);$i++)
			{
				if($doanhthu[$i]["tongkhach"]>0)
				{
					$dt[]=$doanhthu[$i];
				}
			}
     return $dt;
}
public function baocaokhachhangchot(Request $request,$id){
    $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Dieutritheolich::with('dichvus')->where('chinhanh',$chinhanh[$z]->id)->where('trangthai',1)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
   
		$listngay=[];
		$dem=0;
		$tongkhach=0;
		$sanphamdichvu = Sanphamdichvu::all();
		for($j=0;$j<count($sanphamdichvu);$j++)
		{
			
			
			$tong=0;
			$listngay[$j]["sanphamdichvu"]=$sanphamdichvu[$j]->id;
			$listngay[$j]["tensanphamdichvu"]=$sanphamdichvu[$j]->ten;
			$listngay[$j]["tongkhach"]=$tong;		
			for($i=0;$i<count($customers);$i++)
			{
				if($customers[$i]->dieutri==$sanphamdichvu[$j]->id)
				{
					
					$tong=$tong+1;
					$listngay[$j]["sanphamdichvu"]=$customers[$i]->dieutri;
					$listngay[$j]["tensanphamdichvu"]=$customers[$i]->dichvus->ten;
					$listngay[$j]["tongkhach"]=$tong;
				}
			}
			$tongkhach=$tongkhach+$listngay[$j]["tongkhach"];
		}
		usort($listngay, function ($a, $b) {
    return $a['sanphamdichvu'] <=> $b['sanphamdichvu'];
});
$doanhthu[$z]["tongkhach"]=$tongkhach;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["listdieutri"]=$listngay;

		
	}
     $dt=[];
	for($i=0;$i<count($doanhthu);$i++)
			{
				if($doanhthu[$i]["tongkhach"]>0)
				{
					$dt[]=$doanhthu[$i];
				}
			}
     return $dt;
}
public function baocaokhachhangden(Request $request,$id){
    $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Dieutritheolich::with('dichvus')->where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
   
		$listngay=[];
		$dem=0;
		$tongkhach=0;
		$tongkhachden=0;
		$tongkhachchot=0;
		$tongkhachkhongchot=0;
		$sanphamdichvu = Sanphamdichvu::all();
		for($i=0;$i<count($customers);$i++)
		{
			$tongkhach=$tongkhach+1;
				if($customers[$i]->trangthai==3)
				{
					
					$tongkhachden=$tongkhachden+1;
					
					
				}
				if($customers[$i]->trangthai==1)
				{
					
					$tongkhachchot=$tongkhachchot+1;
					
					
				}
				if($customers[$i]->trangthai==2)
				{
					
					$tongkhachkhongchot=$tongkhachkhongchot+1;
					
					
				}
		}
		
		
$doanhthu[$z]["tongkhach"]=$tongkhach;
$doanhthu[$z]["tongkhachden"]=$tongkhachden;
$doanhthu[$z]["tongkhachchot"]=$tongkhachchot;
$doanhthu[$z]["tongkhachkhongchot"]=$tongkhachkhongchot;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["id"]=$chinhanh[$z]->id;

		
	}
     $dt=[];
	for($i=0;$i<count($doanhthu);$i++)
			{
				if($doanhthu[$i]["tongkhach"]>0)
				{
					$dt[]=$doanhthu[$i];
				}
			}
     return $dt;
}
public function laytienkhtongtheotungdichvutrongthang(Request $request,$id){
    $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
	  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
    }
	$listngay=[];
	$dem=0;
	$tongtienchinhanh=0;
	$dichvu = Dichvu::all();
	for($j=0;$j<count($dichvu);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["dichvu"]=$dichvu[$j]->id;
				$listngay[$j]["tendichvu"]=$dichvu[$j]->ten;
				$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->dichvu==$dichvu[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["dichvu"]=$customers[$i]->dichvu;
				$listngay[$j]["tendichvu"]=$customers[$i]->dichvus->ten;
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
	}
	
	usort($listngay, function ($a, $b) {
    return $a['dichvu'] <=> $b['dichvu'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungsaletrongthangleader(Request $request,$id){
	$usertim = User::find($request->iduser);
   $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
	  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
    }
	$listngay=[];
	$dem=0;
	$tongtienchinhanh=0;
	if($usertim->leadersale==1)
	{
		if($usertim->danhsachsale=="null")
		{
			$user = User::with('roles')->with('chinhanhs')->where('role',4)->orWhere('role',5)->get();
		}
		else
		{
			$mangidsale=[];
			$manguser=json_decode($usertim->danhsachsale);
			for($p=0;$p<count($manguser);$p++)
			{
				$mangidsale[]=$manguser[$p]->value;
			}
			$user = User::with('roles')->with('chinhanhs')->whereIn('id',$mangidsale)->get();
		}
		
	}
	else
	{
		$user = User::with('roles')->with('chinhanhs')->where('role',4)->get();
	}
	
	for($j=0;$j<count($user);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["sale"]=$user[$j]->id;
		$listngay[$j]["tensale"]=$user[$j]->name;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->idsale==$user[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["sale"]=$customers[$i]->idsale;
				$listngay[$j]["tensale"]=$user[$j]->name;
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
	}
	
	usort($listngay, function ($a, $b) {
    return $a['sale'] <=> $b['sale'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
	if($usertim->leadersale==0)
	{
		$doanhthu=[];
		return $doanhthu;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungsaletrongthang(Request $request,$id){
   $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
	  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
    }
	$listngay=[];
	$dem=0;
	$tongtienchinhanh=0;
	$user = User::with('roles')->with('chinhanhs')->where('role',4)->get();
	for($j=0;$j<count($user);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["sale"]=$user[$j]->id;
		$listngay[$j]["tensale"]=$user[$j]->name;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->idsale==$user[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["sale"]=$customers[$i]->idsale;
				$listngay[$j]["tensale"]=$user[$j]->name;
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
	}
	
	usort($listngay, function ($a, $b) {
    return $a['sale'] <=> $b['sale'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungdirectsaletrongthang(Request $request,$id){
    $chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
	  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
    }
	$listngay=[];
	$dem=0;
	$tongtienchinhanh=0;
	$user = User::with('roles')->with('chinhanhs')->where('role',5)->get();
	for($j=0;$j<count($user);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["idsaleoff"]=$user[$j]->id;
		$listngay[$j]["tensale"]=$user[$j]->name;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->idsaleoff==$user[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["idsaleoff"]=$customers[$i]->idsaleoff;
				$listngay[$j]["tensale"]=$user[$j]->name;
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
	}
	
	usort($listngay, function ($a, $b) {
    return $a['idsaleoff'] <=> $b['idsaleoff'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungbacsitrongthang(Request $request,$id){
	$chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
 
		for($i=0;$i<count($customers);$i++)
		{
		  $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
		
		 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
		  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
		}
		$listngay=[];
		$dem=0;
		$tongtienchinhanh=0;
		 $doctors = Doctor::all();
	for($j=0;$j<count($doctors);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["bacsi"]=$doctors[$j]->id;
		$listngay[$j]["tenbacsi"]=$doctors[$j]->ten;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->bacsi==$doctors[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["bacsi"]=$customers[$i]->bacsi;
				$listngay[$j]["tenbacsi"]=$doctors[$j]->ten;
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
	}
	
	usort($listngay, function ($a, $b) {
    return $a['bacsi'] <=> $b['bacsi'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungnguontrongthang(Request $request,$id){
	$chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::with('nguons')->where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
		for($i=0;$i<count($customers);$i++)
		{
		  $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
		
		 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
		  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
		}
	$listngay=[];
	$dem=0;
	$tongtienchinhanh=0;
	$nguongioithieu = Nguongioithieu::all();
	for($j=0;$j<count($nguongioithieu);$j++)
	{
		
		
		$tong=0;
		$listngay[$j]["nguon"]=$nguongioithieu[$j]->id;
		$listngay[$j]["tnguon"]=(string) $nguongioithieu[$j]->nguon;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->nguon==$nguongioithieu[$j]->id)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				$listngay[$j]["nguon"]=(string) $customers[$i]->nguon;
				
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
			
		}
		$tongtienchinhanh=$tongtienchinhanh+$tong;
	}
	
	usort($listngay, function ($a, $b) {
    return $a['nguon'] <=> $b['nguon'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
     return $doanhthu;
}
public function laytienkhtongtheotungngaytrongthang(Request $request,$id){
	$chinhanh = Chinhanh::all();
	$doanhthu=[];
	for($z=0;$z<count($chinhanh);$z++)
	{
		$customers = Khammoi::where('chinhanh',$chinhanh[$z]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
    for($i=0;$i<count($customers);$i++)
    {
      $tongsaugiam=Chiphi::where('idkhammoi', $customers[$i]->id)->sum('saugiam');
	
	 $thanhtoankhachhangtrongthang = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS tongtiendathanhtoan'))->where("idkhammoi",'=',$customers[$i]->id)->whereYear('created_at', '=', $request->nam)->whereMonth('created_at', '=', $id)->get();
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
	  $customers[$i]["thanhtoanvaongay"]=date('d/m/Y',strtotime($customers[$i]->ngay)); 
    }
	
	$dem=0;
	$listngay=[];
	$tongtienchinhanh=0;
	for($j=1;$j<32;$j++)
	{
		
		if($j<10)
		{
			$j="0".$j;
		}
		$ngay=$j."/".$id."/".$request->nam;
		$tong=0;
		$listngay[$j]["ngaythanhtoan"]=$ngay;
		$listngay[$j]["songay"]=(string) $j;
		$listngay[$j]["tongthanhtien"]=$tong;
		for($i=0;$i<count($customers);$i++)
		{
			if($customers[$i]->thanhtoanvaongay==$ngay)
			{
				
				$tong=$tong+$customers[$i]["tongtiendathanhtoan"];
				
				$listngay[$j]["tongthanhtien"]=$tong;
				
			}
		}
		$tongtienchinhanh=$tongtienchinhanh+$listngay[$j]["tongthanhtien"];
		
	}
	
	usort($listngay, function ($a, $b) {
    return $a['ngaythanhtoan'] <=> $b['ngaythanhtoan'];
});
$doanhthu[$z]["tongtienchinhanh"]=$tongtienchinhanh;
$doanhthu[$z]["tenchinhanh"]=$chinhanh[$z]->tenchinhanh;
$doanhthu[$z]["doanhthu"]=$listngay;
	}
    
     return $doanhthu;
}
  public function laytienkhdatttheothang(Request $request,$id){
	  
    $customers = Khachhang::with(['thanhtoankhachhangs' => function ($q) {
        $q->with('chinhanhs');
    }])->join('thanhtoankhachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')


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
      
        DB::raw('SUM(thanhtoankhachhang.tongtien) as tongtiendatra'),
      
     
        
        
    ])
    ->whereMonth('thanhtoankhachhang.created_at', '=', $id)
	->whereYear('thanhtoankhachhang.created_at', '=', $request->nam)
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
    ->groupBy('khachhang.trangthai')
    ->orderBy('khachhang.ID', 'desc');
     return $customers->get()->toJson();
}
public function tongkhachhangtheothang($id)
{
    $sokhachhang = Khachhang::select(DB::raw('count(ID) AS soluongkhachhang'))->whereMonth('created_at', '=', $id)->get();
   
    $sokhachhang = $sokhachhang[0]["soluongkhachhang"];
    return $sokhachhang;
    
}
public function doanhthutheokhachhang($id)
{
  $tichluy = Lichsutichluy::where('khachhanggioithieu',$id)->sum('tienthanhtoan');
  $doanhthu = Thanhtoankhachhang::where('idkhachhang',$id)->sum('tongtien');
  $tientichluy = Tientichluy::where('idkhachhang',$id)->first();
  $capdo = Capdo::orderBy('sotiencapdo', 'asc')->get();
  
  $dd=count($capdo);
  $i=0;
  $sotientichluy=0;
  $sotienhoahong=0;
 $capdothanhvien=[];
 $capdothanhvien[0]['sotientichluy']=0;
        $capdothanhvien[0]['tencapdo']= "Khách hàng lần đầu";
        $capdothanhvien[0]['doanhthukhachhang']=0;
        $capdothanhvien[0]['sotienhoahong']=0;
        $capdothanhvien[0]['phantram']=0;
  foreach ($capdo as $cd) {
    if($doanhthu>=$cd->sotiencapdo)
    {
        $tencapdo=$cd->tencapdo;
        $sotientichluy=$doanhthu*(($cd->phantram)/100);
        $sotienhoahong=$tichluy*(($cd->phantram)/100);
        $capdothanhvien=[];

        $capdothanhvien[0]['sotientichluy']=number_format($sotientichluy,0,",",".");
        $capdothanhvien[0]['tencapdo']= $cd->tencapdo;
        $capdothanhvien[0]['doanhthukhachhang']=number_format($doanhthu,0,",",".");
        $capdothanhvien[0]['sotienhoahong']=number_format($sotienhoahong,0,",",".");
        $capdothanhvien[0]['phantram']=$cd->phantram;
      }
    
  }
 
    return  $capdothanhvien;
  

}
public function lichsutichluy($id)
{

  $lichsutichluy = Lichsutichluy::with('khachhangs')->where('khachhanggioithieu',$id)->get();
  return $lichsutichluy->toJson();
}
public function timcapdo($tien)
{
  $capdo = Capdo::orderBy('sotiencapdo', 'asc')->get();
  $phantram = 5;
  foreach ($capdo as $cd) {
    if($tien>=$cd->sotiencapdo)
    {
        $phantram=$cd->phantram;
        
    }
    
  }
  return $phantram;
}
public function tientichluykhachhang(Request $request,$id)
{
  $tientichluy = Tientichluy::where('idkhachhang',$id)->get();
  
  return $tientichluy->toJson();
}
public function taotientichluy(Request $request)
{
  $customer = DB::table('khachhang')->get();
  foreach($customer as $ct)
  {
    $tichluy = Lichsutichluy::where('khachhanggioithieu',$ct->ID)->sum('tienthanhtoan');
    $doanhthu = Thanhtoankhachhang::where('idkhachhang',$ct->ID)->sum('tongtien');
    $sotientichluy=$doanhthu*($this->timcapdo($doanhthu)/100);
    $sotienhoahong=$tichluy*($this->timcapdo($doanhthu)/100);
    $thanhtoan = Tientichluy::create([
      'tientichluy' => $sotientichluy+$sotienhoahong,
      'idkhachhang' => $ct->ID
    ]);
  }
 
  return response()->json('Tạo thành công');
  

}

   
public function timtiensubenh($tentiensubenh)
{
  $tiensubenh=Tiensubenh::where('ten',$tentiensubenh)->first();
  if($tiensubenh)
  {
    return $tiensubenh->id;
  }
  else
  {
    return 0;
  }
  
}
public function timnguon($tennguon)
{
  $nguongioithieu=Nguongioithieu::where('nguon',$tennguon)->first();
  if($nguongioithieu)
  {
    return $nguongioithieu->id;
  }
  else
  {
    return "21";
  }
  
}
public function timdichvu($tendichvu)
{
  $dichvu=Dichvu::where('ten',$tendichvu)->first();
  if($dichvu)
  {
    return $dichvu->id;
  }
  else
  {
    return "24";
  }
  
}
public function timdieutri($tendieutri)
{
  $dieutri=Sanphamdichvu::where('ten',$tendieutri)->first();
  if($dieutri)
  {
    return $dieutri->id;
  }
  else
  {
    return "94";
  }
  
}
public function timuser($tenuser)
{
  $user=User::where('name',$tenuser)->first();
  if($user)
  {
    return $user->id;
  }
  else
  {
    return 0;
  }
  
}
public function timbacsi($tenbacsi)
{
  $doctor=Doctor::where('ten',$tenbacsi)->first();
  if($doctor)
  {
    return $doctor->id;
  }
  else
  {
    return 47;
  }
  
}
public function timbenhly($tenbenhly)
{
  $benhly=Chandoancacloai::where('ten',$tenbenhly)->first();
  if($benhly)
  {
    $benhly=["value" => $benhly->id,"label" => $benhly->ten];
    return $benhly;
  }
  else
  {
	  $benhly=["value" => "34","label" => "Khác"];
    return $benhly;
  }
}
public function timchinhanh($tenchinhanh)
{
  $chinhanh=Chinhanh::where('tenchinhanh',$tenchinhanh)->first();
  if($chinhanh)
  {
    return $chinhanh->id;
  }
  else
  {
    return 0;
  }
  
}
    public function importexcelkhachhang(Request $request) 
    {
     
      $hoten=$request->hoten;
      if($hoten==null)
      {
        $hoten="Chưa nhập họ tên";
      } 
      $gioitinh=$request->gioitinh;
      if($gioitinh==null)
      {
        $gioitinh=1;
      }
      $ngaysinh=$request->ngaysinh;
      if($ngaysinh==null)
      {
        
        
        $ngaysinh="01/01/1995";
      }
      $diachi=$request->diachi;
      if($diachi==null)
      {
        $diachi="Chưa nhập địa chỉ";
      }
      $dienthoai=$request->dienthoai;
      if($dienthoai==null)
      {
        $dienthoai="Chưa nhập điện thoại";
      }
      $tiensubenh=$request->tiensubenh;
      $tiensubenhArray = explode(';', $tiensubenh);
      $arrayTienSuBenh=[];
      for($i=0;$i<count($tiensubenhArray);$i++)
      {
        $idtiensubenh=$this->timtiensubenh($tiensubenhArray[$i]);
        if($idtiensubenh!=0)
        {
          $arrayTienSuBenh[]=$idtiensubenh;
        }
      }
      $gioithieu=$request->gioithieu;
      if($gioithieu==null)
      {
        $gioithieu="Không có giới thiệu";
      }
      $khuvuc=$request->khuvuc;
      if($khuvuc==null)
      {
        $khuvuc="Tỉnh khác";
      }
      $dichvudieutri=$request->dichvudieutri;
      $nguongioithieu=$request->nguoigioithieu;
      if($nguongioithieu==null)
      {
        $nguongioithieu="0";
      }
      $imageName="nonuser.jpg"; 
      $imagetruocmatbefore="nonuser.jpg";
      $imagehamtrenbefore="nonuser.jpg";
      $imagehamduoibefore="nonuser.jpg";
      $imagetruocmatafter="nonuser.jpg";
      $imagehamtrenafter="nonuser.jpg";
      $imagehamduoiafter="nonuser.jpg";
      $bacsidieutri=$request->bacsidieutri;
      if($bacsidieutri==null)
      {
        $bacsidieutri="0";
      }
      $trangthai=$request->trangthai;
      $chinhanh=$request->cosokham;
     if($this->timchinhanh($chinhanh)!=0)
     {
      $chinhanh=$this->timchinhanh($chinhanh);
     }
     else
     {
       $chinhanh=1;
     }
      $masale=$request->masale;
      $nguoncongty=$request->nguoncongty;
      $mahoso=$request->mahoso;
      $danhgia=$request->danhgia;
      $sosao=$request->sosao;
      if($hoten!=null && $gioitinh!=null && $ngaysinh!=null && $diachi!=null && $dienthoai!=null && $khuvuc!=null)
      {
        $customer =  DB::table('khachhang')->insertGetId([
          'hoten' => $hoten,
          'gioitinh' => $gioitinh,
          'ngaysinh' => $ngaysinh,
          'diachi' => $diachi,
          'dienthoai' => $dienthoai,
          'tiensubenh' => json_encode($arrayTienSuBenh),
          'gioithieu' => $gioithieu,
          'khuvuc' => $khuvuc,
          'dichvudieutri' => json_encode($dichvudieutri),
          'nguongioithieu' => json_encode($nguongioithieu),
          'anhdaidien' => $imageName,
          'truocmatbefore' => $imagetruocmatbefore,
          'hamtrenbefore' => $imagehamtrenbefore,
          'hamduoibefore' =>$imagehamduoibefore,
          'truocmatafter' => $imagetruocmatafter,
          'hamtrenafter' => $imagehamtrenafter,
          'hamduoiafter' =>$imagehamduoiafter,
          'danhgia' => $danhgia,
          'sosao' => $sosao,
          'bacsidieutri' => $bacsidieutri,
          'trangthai' => $trangthai,
          'chinhanh' => $chinhanh,
          'masale' => $masale,
          'nguoncongty' => $nguoncongty,
          'mahoso' => $mahoso
        ]);
      }
     //khammoi
     $ngay=$request->ngaykham;
     if($ngay==null)
     {
       $ngay="1/1/2022";
     }
     
     $nguon=$request->nguonkham;
     if($this->timnguon($nguon)!=0)
     {
      $nguon=$this->timnguon($nguon);
     }
     else
     {
       $nguon="21";
     }
     $benhly=$request->benhly;
     if($benhly==null)
     {
       $benhly=0;
     }
     $benhlyArray = explode(';', $benhly);
     $arrayBenhly=[];
      for($i=0;$i<count($benhlyArray);$i++)
      {
        $benhly=$this->timbenhly($benhlyArray[$i]);
        if($benhly!=0)
        {
          $arrayBenhly[]=$benhly;
        }
      }
     $dichvu=$request->dichvukham;
     if($this->timdichvu($dichvu)!=0)
     {
      $dichvu=$this->timdichvu($dichvu);
     }
     else
     {
       $dichvu="24";
     }
     $ghichu=$request->ghichubenhly;
     if($ghichu==null)
     {
       $ghichu="Không có ghi chú";
     }
     $bacsi=$request->bacsikham;
     if($this->timbacsi($bacsi)!=0)
     {
      $bacsi=$this->timbacsi($bacsi);
     }
     else
     {
       $bacsi="47";
     }
    
     $chinhanh=$request->cosokham;
     if($this->timchinhanh($chinhanh)!=0)
     {
      $chinhanh=$this->timchinhanh($chinhanh);
     }
     else
     {
       $chinhanh=1;
     }
     $idsale=$request->saleonline;
     if($this->timuser($idsale)!=0)
     {
      $idsale=$this->timuser($idsale);
     }
     else
     {
       $idsale=0;
     }
     $idsaleoff=$request->directsale;
     if($this->timuser($idsaleoff)!=0)
     {
      $idsaleoff=$this->timuser($idsaleoff);
     }
     else
     {
       $idsaleoff=0;
     }
     $nguoikhamgioithieu=$request->nguoikhamgioithieu;
     if($nguoikhamgioithieu==null)
     {
       $nguoikhamgioithieu=0;
     }
     if($customer>0)
     {
      if($ngay!=null && $nguon!=null && $benhly!=null && $dichvu!=null && $bacsi!=null)
     {
       $trangthaidieutri=$request->trangthaikhammoi;
       if($trangthaidieutri=="Đang tư vấn")
       {
          $trangthaikm=0;
       }
       elseif($trangthaidieutri=="Chờ khám")
       {
        $trangthaikm=4;
       }
       elseif($trangthaidieutri=="Khách không làm")
       {
        $trangthaikm=1;
       }
       elseif($trangthaidieutri=="Đang điều trị")
       {
        $trangthaikm=2;
       }
       else
       {
         $trangthaikm=3;
       }
      $khammoi = Khammoi::create([
        'ngay' => date('Y-m-d H:i:s', strtotime(str_replace('/', '-', $request->ngaykham))),
        'nguon' => $nguon,
        'benhly' => json_encode($arrayBenhly),
        'dichvu' => $dichvu,
        'ghichu' => $ghichu,
        'bacsi' => $bacsi,
        'chiphi' => 0,
        'thanhtoan' => 0,
        'chinhanh' => $chinhanh,
        'trangthaidieutri' => $trangthaikm,
        'idkhachhang' => $customer,
        'idsale' => $idsale,
        'idsaleoff' => $idsaleoff,
        'phonegioithieu' => $nguoikhamgioithieu,
      ]);
      if($khammoi->id>0 && $request->ngayhendieutri!=null && $request->dichvudieutri!=null && $request->bacsidieutri!=null)
      {
         
          $dichvudieutri=$request->dichvudieutri;
          if($this->timdieutri($dichvudieutri)!=0)
          {
            $dichvudieutri=$this->timdieutri($dichvudieutri);
          }
          else
          {
            $dichvudieutri=0;
          }
          $bacsidieutri=$request->bacsidieutri;
          if($this->timbacsi($bacsidieutri)!=0)
          {
            $bacsidieutri=$this->timbacsi($bacsidieutri);
          }
          else
          {
            $bacsidieutri=0;
          }
          $chinhanhdieutri=$request->chinhanhdieutri;
          if($this->timchinhanh($chinhanhdieutri)!=0)
          {
            $chinhanhdieutri=$this->timchinhanh($chinhanhdieutri);
          }
          else
          {
            $chinhanhdieutri=0;
          }
          $trangthaidieutri=$request->trangthaidieutri;
          if($trangthaidieutri=="Đặt hẹn")
          {
              $trangthaidt=1;
          }
          elseif($trangthaidieutri=="Không đến")
          {
            $trangthaidt=2;
          }
          elseif($trangthaidieutri=="Đã đến")
          {
            $trangthaidt=3;
          }
          else
          {
            $trangthaidt=4;
          }
          $ghichudieutri=$request->ghichudieutri;
          if($ghichudieutri==null)
          {
            $ghichudieutri="Không có ghi chú";
          }
          
          $ngayhendieutri = str_replace('/', '-', $request->ngayhendieutri);
          $ngayhendieutri = strtotime($ngayhendieutri);
          $thoigianbieu = Thoigianbieu::insertGetId([
            'idkhachhang' => $customer,
            'dichvu' => $dichvu,
            'trangthai' => $trangthaidt,
            'ghichu' => $ghichudieutri,
            'loai' => "1",
            'dieutri' => $dichvudieutri,
            'benhly' => json_encode($arrayBenhly),
            'idkhammoi' => $khammoi->id,
            'start' => date('Y-m-d h:i:s', $ngayhendieutri),
            'end' => date('Y-m-d h:i:s', $ngayhendieutri),
            'giohen' => "12:00",
            'idbacsi' => $bacsidieutri,
          ]);
          if($thoigianbieu>0)
          {
            $dieutritheolich = Dieutritheolich::create([
              'ngay' => date($ngayhendieutri),
              'idlich' => $thoigianbieu,
              'dieutri' => $dichvudieutri,
              'bacsi' => $bacsidieutri,
              'trangthai' => $trangthaidt,
              'luuy' => $ghichudieutri,
              'idkhammoi' => $khammoi->id,
              'idkhachhang' => $customer,
              'chinhanh' => $chinhanhdieutri
            ]);
          }
      }
     }
     }
     
     $thanhtoan = Tientichluy::create([
      'tientichluy' => 0,
      'idkhachhang' => $customer
    ]);
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Tạo khách hàng bằng excel mới có ID ".$customer,
        'idkhachhang' => $customer,
        'userchinhsua' => $request->cookie('userkhname')
      ]);    
    return "Import thành công";
    }
}
