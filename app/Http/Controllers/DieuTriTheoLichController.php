<?php

namespace App\Http\Controllers;
use App\Dieutritheolich;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Lichsuchinhsua;
use App\Thoigianbieu;
class DieuTriTheoLichController extends Controller
{
    public function index($id)
    {
       
        $dieutritheolich = Dieutritheolich::with('lichhens')->join('dieutri', 'dieutritheolich.dieutri', '=', 'dieutri.id')->join('lichhen', 'dieutritheolich.idlich', '=', 'lichhen.id')->join('doctor', 'dieutritheolich.bacsi', '=', 'doctor.id')->with('chinhanhs')->select("dieutritheolich.*","dieutri.ten as tendieutri","doctor.ten as tenbacsi","lichhen.giohen as giohen","lichhen.start as start")->where("dieutritheolich.idkhammoi",'=',$id)->get();
        for($i=0;$i<count($dieutritheolich);$i++)
        {
          $tongdoanvan=[];
          $paragraphs = explode("\n", $dieutritheolich[$i]->luuy);
          
          foreach($paragraphs as $pr)
          {
            $tongdoanvan[]=$pr;
          }
          $dieutritheolich[$i]["ghichutext"]=$tongdoanvan;
		  $giokt = date('H:i', strtotime($dieutritheolich[$i]["lichhens"]->giohen . ' + 1 hours'));
		  if($dieutritheolich[$i]["lichhens"]->gioketthuc!=null)
			{
			$gioketthuc=$dieutritheolich[$i]["lichhens"]->gioketthuc;
			}
			else
			{
			$gioketthuc=$giokt;
			}
			 $dieutritheolich[$i]["gioketthuc"]=$gioketthuc;
			 $dieutritheolich[$i]["giohen"]=$dieutritheolich[$i]["lichhens"]->giohen;
        }               

        return $dieutritheolich->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ngay' => 'required',
            'idlich' => 'required',
            'dieutri' => 'required',
            'bacsi' => 'required',
            'trangthai' => 'required',
            'luuy' => 'required',
            'idkhammoi' => 'required',
            'idkhachhang' => 'required',
            'chinhanh' => 'required',
			'moicu' => 'required'
          ]);
  
          $dieutritheolich = Dieutritheolich::create([
            'ngay' => $validatedData['ngay'],
            'idlich' => $validatedData['idlich'],
            'dieutri' => $validatedData['dieutri'],
            'bacsi' => $validatedData['bacsi'],
            'trangthai' => $validatedData['trangthai'],
            'luuy' => $validatedData['luuy'],
            'idkhammoi' => $validatedData['idkhammoi'],
            'idkhachhang' => $validatedData['idkhachhang'],
            'chinhanh' => $validatedData['chinhanh'],
			'moicu' => $validatedData['moicu']
          ]);
          $lichsuchinhsua = Lichsuchinhsua::create([
            'noidungchinhsua' => "Tạo điều trị cho khách hàng",
            'idkhachhang' => $validatedData['idkhachhang'],
            'userchinhsua' => $request->cookie('userkhname')
          ]);  
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $dieutritheolich = Dieutritheolich::find($id);
        $dieutritheolich->ngay = $request->get('ngay');
        $dieutritheolich->idlich = $request->get('idlich');
        $dieutritheolich->dieutri = $request->get('dieutri');
        $dieutritheolich->bacsi = $request->get('bacsi');
        $dieutritheolich->trangthai = $request->get('trangthai');
        $dieutritheolich->luuy = $request->get('luuy');
        $dieutritheolich->idkhammoi = $request->get('idkhammoi');
        $dieutritheolich->idkhachhang = $request->get('idkhachhang');
        $dieutritheolich->chinhanh = $request->get('chinhanh');
		$dieutritheolich->moicu = $request->get('moicu');
        $dieutritheolich->save();
        $lichsuchinhsua = Lichsuchinhsua::create([
          'noidungchinhsua' => "Cập nhật điều trị cho khách hàng",
          'idkhachhang' => $request->get('idkhachhang'),
          'userchinhsua' => $request->cookie('userkhname')
        ]);  
        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $dieutritheolich = Dieutritheolich::find($id);
      $lichhen = Thoigianbieu::find($dieutritheolich->idlich);
      $dieutritheolich->delete();
      $lichhen->delete();
      return response()->json('Successfully Deleted');
    }
    public function chitietdieutritheolich($id)
    {
      $dieutritheolich = Dieutritheolich::with('lichhens')->join('lichhen', 'dieutritheolich.idlich', '=', 'lichhen.id')->where('dieutritheolich.id',$id)->select("dieutritheolich.*","lichhen.start as ngayhen","lichhen.giohen as giohen")->first();
		
          
          
        
		  $giokt = date('H:i', strtotime($dieutritheolich["lichhens"]->giohen . ' + 1 hours'));
		  if($dieutritheolich["lichhens"]->gioketthuc!=null)
			{
			$gioketthuc=$dieutritheolich["lichhens"]->gioketthuc;
			}
			else
			{
			$gioketthuc=$giokt;
			}
			 $dieutritheolich["gioketthuc"]=$gioketthuc;
			 $dieutritheolich["giohen"]=$dieutritheolich["lichhens"]->giohen;
      
      return $dieutritheolich->toJson();
    }
	 public function viewdieutritheolich($id)
    {
      $dieutritheolich = Dieutritheolich::with('chinhanhs')->with('khachhangs')->with('dichvus')->with('bacsis')->with('lichhens')->where('id',$id)->first();

      return $dieutritheolich->toJson();
    }
	 public function xoalichhensai()
    {
      $dieutritheolich = Dieutritheolich::with('lichhens')->whereHas('lichhens', function($q){
    $q->where('start', 'LIKE', '%1970%');
})->get();
		for($i=0;$i<count($dieutritheolich);$i++)
		{
			$dieutri = Dieutritheolich::find($dieutritheolich[$i]->id);
			$lichhen = Thoigianbieu::find($dieutritheolich[$i]->idlich);
			$dieutri->delete();
			$lichhen->delete();
		  
		}
      return $dieutritheolich;
    }
    public function laysoanh($id)
    {
      $dieutritheolich = Dieutritheolich::join('anhdieutri', 'anhdieutri.iddieutri', '=', 'dieutritheolich.id')->select( DB::raw(' count(anhdieutri.iddieutri) as soanh'))->where("anhdieutri.iddieutri",'=',$id)->get();
      return $dieutritheolich->toJson();
    }
}
