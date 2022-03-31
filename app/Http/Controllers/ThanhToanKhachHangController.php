<?php

namespace App\Http\Controllers;
use App\Thanhtoankhachhang;
use App\Thanhtoandaxoa;
use App\Khachhang;
use App\Lichsutichluy;
use App\Tientichluy;
use App\Capdo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Lichsuchinhsua;
class ThanhToanKhachHangController extends Controller
{
    public function index($id)
    {
        $thanhtoan = Thanhtoankhachhang::where("idkhammoi",'=',$id)->with('chinhanhs')->get();
        for($i=0;$i<count($thanhtoan);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $thanhtoan[$i]->ghichu);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $thanhtoan[$i]["ghichutext"]=$tongdoanvan;
        }  
        return $thanhtoan->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngaythanhtoan' => 'required',
            'chitietthanhtoan' => 'required',
            'tongtien' => 'required',
            'tongtienphaitra' => 'required',
            'hinhthucthanhtoan' => 'required',
            'ghichu' => 'required',
            'nguoithutien' => 'required',
            'chinhanh' => 'required',
            'idkhammoi' => 'required',
            'idkhachhang' => 'required'
          ]);
  
          $thanhtoan = Thanhtoankhachhang::create([
            'ngaythanhtoan' => $validatedData['ngaythanhtoan'],
            'chitietthanhtoan' => json_encode($validatedData['chitietthanhtoan']),
            'tongtien' => $validatedData['tongtien'],
            'tongtienphaitra' => $validatedData['tongtienphaitra'],
            'hinhthucthanhtoan' => $validatedData['hinhthucthanhtoan'],
            'ghichu' => $validatedData['ghichu'],
            'nguoithutien' => $validatedData['nguoithutien'],
            'chinhanh' => $validatedData['chinhanh'],
            'idkhammoi' => $validatedData['idkhammoi'],
            'idkhachhang' => $validatedData['idkhachhang']
          ]);
          $khachhang=Khachhang::where('id',$validatedData['idkhachhang'])->get();
          $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$validatedData['idkhammoi'])->first();
         $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$validatedData['idkhammoi'])->first();
          $magioithieu=$khachhang[0]->sosao;
          if($dathanhtoan->dathanhtoan==$phaithanhtoan->phaithanhtoan)
          {
            if($magioithieu!=0)
            { 
              $lichsutichluy = Lichsutichluy::create([
                'khachhangdichvu' => $validatedData['idkhachhang'],
                'chitiettichdiem' => json_encode($validatedData['chitietthanhtoan']),
                'tienthanhtoan' => $validatedData['tongtienphaitra'],
                'khachhanggioithieu' => $magioithieu,
                'idthanhtoan' => $thanhtoan->id
              ]);
              $tientichluy = Tientichluy::where('idkhachhang',$magioithieu)->first();
              
              $doanhthu = Thanhtoankhachhang::where('idkhachhang',$magioithieu)->sum('tongtien');
             
              $congtientichluy=$tientichluy->tientichluy+($this->timcapdo($doanhthu)*0.01*$validatedData['tongtien']);
              
           Tientichluy::where('idkhachhang', $magioithieu)
         ->update([
             'tientichluy' => $congtientichluy
          ]);
          $tientichluykhdv = Tientichluy::where('idkhachhang',$validatedData['idkhachhang'])->first();
          $doanhthukhdv = Thanhtoankhachhang::where('idkhachhang',$validatedData['idkhachhang'])->sum('tongtien');
          $congtientichluykhdv=$tientichluykhdv->tientichluy+($this->timcapdo($doanhthukhdv)*0.01*$validatedData['tongtien']);
          Tientichluy::where('idkhachhang', $validatedData['idkhachhang'])
         ->update([
             'tientichluy' => $congtientichluykhdv
          ]);
            }
            else
            {
              $tientichluykhdv = Tientichluy::where('idkhachhang',$validatedData['idkhachhang'])->first();
              $doanhthukhdv = Thanhtoankhachhang::where('idkhachhang',$validatedData['idkhachhang'])->sum('tongtien');
              $congtientichluykhdv=$tientichluykhdv->tientichluy+($this->timcapdo($doanhthukhdv)*0.01*$validatedData['tongtien']);
              Tientichluy::where('idkhachhang', $validatedData['idkhachhang'])
              ->update([
                  'tientichluy' => $congtientichluykhdv
               ]);
            }
          }
          $lichsuchinhsua = Lichsuchinhsua::create([
            'noidungchinhsua' => "Tạo thanh toán cho khách hàng",
            'idkhachhang' => $request->get('idkhachhang'),
            'userchinhsua' => $request->cookie('userkhname')
          ]);
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $thanhtoan = Thanhtoankhachhang::find($id);
        $thanhtoan->ngaythanhtoan = $request->get('ngaythanhtoan');
        $thanhtoan->chitietthanhtoan = json_encode($request->get('chitietthanhtoan'));
        $thanhtoan->tongtien = $request->get('tongtien');
        $thanhtoan->hinhthucthanhtoan = $request->get('hinhthucthanhtoan');
        $thanhtoan->ghichu = $request->get('ghichu');
        $thanhtoan->nguoithutien = $request->get('nguoithutien');
        $thanhtoan->chinhanh = $request->get('chinhanh');
        $thanhtoan->idkhammoi = $request->get('idkhammoi');
        $thanhtoan->idkhachhang = $request->get('idkhachhang');
        $thanhtoan->save();

        return response()->json('Successfully Updated');
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
    public function destroy(Request $request,$id)
    {
      $thanhtoan = Thanhtoankhachhang::find($id);
      $khachhang=Khachhang::where('id',$thanhtoan["idkhachhang"])->get();
          $magioithieu=$khachhang[0]->sosao;
          $lichsutichluy = Lichsutichluy::where('idthanhtoan',$id)->first();
          if($lichsutichluy)
          {
            if($magioithieu!=0)
            {
             
              
              Lichsutichluy::where('idthanhtoan',$id)->delete();
              $tientichluy = Tientichluy::where('idkhachhang',$lichsutichluy->khachhanggioithieu)->first();
              $tientichluykhdv = Tientichluy::where('idkhachhang',$thanhtoan["idkhachhang"])->first();
              $doanhthu = Thanhtoankhachhang::where('idkhachhang',$lichsutichluy->khachhanggioithieu)->sum('tongtien');
              $doanhthukhdv = Thanhtoankhachhang::where('idkhachhang',$thanhtoan["idkhachhang"])->sum('tongtien');
              $trutientichluy=$tientichluy->tientichluy-($this->timcapdo($doanhthu)*0.01*$thanhtoan["tongtien"]);
              $trutientichluykhdv=$tientichluykhdv->tientichluy-($this->timcapdo($doanhthukhdv)*0.01*$thanhtoan["tongtien"]);
              Tientichluy::where('idkhachhang', $lichsutichluy->khachhanggioithieu)
              ->update([
                  'tientichluy' => $trutientichluy
               ]);
               Tientichluy::where('idkhachhang', $thanhtoan["idkhachhang"])
              ->update([
                  'tientichluy' => $trutientichluykhdv
               ]);
            }
            else
            {
              $tientichluykhdv = Tientichluy::where('idkhachhang',$thanhtoan["idkhachhang"])->first();
              $doanhthukhdv = Thanhtoankhachhang::where('idkhachhang',$thanhtoan["idkhachhang"])->sum('tongtien');
              $trutientichluykhdv=$tientichluykhdv->tientichluy-($this->timcapdo($doanhthukhdv)*0.01*$thanhtoan["tongtien"]);
              Tientichluy::where('idkhachhang', $thanhtoan["idkhachhang"])
              ->update([
                  'tientichluy' => $trutientichluykhdv
               ]);
            }
          }
          
      
      $thanhtoandaxoa = Thanhtoandaxoa::create([
        'ngaythanhtoan' => $thanhtoan["ngaythanhtoan"],
        'chitietthanhtoan' => $thanhtoan["chitietthanhtoan"],
        'tongtien' => $thanhtoan["tongtien"],
        'hinhthucthanhtoan' => $thanhtoan["hinhthucthanhtoan"],
        'ghichu' => $thanhtoan["ghichu"],
        'nguoithutien' => $thanhtoan["nguoithutien"],
        'chinhanh' => $thanhtoan["chinhanh"],
        'idkhammoi' => $thanhtoan["idkhammoi"],
        'idkhachhang' => $thanhtoan["idkhachhang"]
      ]);
      $lichsuchinhsua = Lichsuchinhsua::create([
        'noidungchinhsua' => "Xóa thanh toán",
        'idkhachhang' => $thanhtoan["idkhachhang"],
        'userchinhsua' => $request->cookie('userkhname')
      ]);
        $thanhtoan->delete();
      return response()->json('Successfully Deleted');
    }
    public function chitietthanhtoan($id)
    {
      $thanhtoan = Thanhtoankhachhang::with('chinhanhs')->where('id',$id)->first();

      return $thanhtoan->toJson();
    }
    public function chitietthanhtoantheokhammoi($id)
    {
      $thanhtoan = Thanhtoankhachhang::where('idkhammoi',$id)->select("chitietthanhtoan")->latest()->first();
   
     return $thanhtoan["chitietthanhtoan"];
     
    }
    public function thanhtoanthongke($id)
    {
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhammoi",'=',$id)->get();
        $phaithanhtoan= DB::table('chiphi')->select(DB::raw('SUM(saugiam) AS phaithanhtoan'))->where("idkhammoi",'=',$id)->get();
        
        $merged = $phaithanhtoan->merge($dathanhtoan);
        $result = $merged->all();
        return $result;
    }
    public function thanhtoanthongkekhachhang($id)
    {
        $dathanhtoan = Thanhtoankhachhang::select(DB::raw('SUM(tongtien) AS dathanhtoan'))->where("idkhachhang",'=',$id)->get();
 
        return $dathanhtoan->toJSon();
    }
    public function laytienkh(){
        $customers = Thanhtoankhachhang::select( 'thanhtoankhachhang.idkhachhang',DB::raw('SUM(tongtien) as tongtiendatra'))->leftjoin('khachhang', 'thanhtoankhachhang.idkhachhang', '=', 'khachhang.ID')
        
  
       
        ->groupBy('thanhtoankhachhang.idkhachhang');
        
        $customerss = Thanhtoankhachhang::join('chiphi', 'chiphi.idkhachhang', '=', 'thanhtoankhachhang.idkhachhang')
        ->select( 'thanhtoankhachhang.idkhachhang', DB::raw(' SUM(DISTINCT chiphi.saugiam) as tongsaugiam'))

       
        ->groupBy('thanhtoankhachhang.idkhachhang');
     
        $shares = $customers->merge($customerss);
   
         return $shares->toJson();
    }
}
