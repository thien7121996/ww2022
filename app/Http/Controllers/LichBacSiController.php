<?php

namespace App\Http\Controllers;
use App\Lichbacsi;
use Illuminate\Http\Request;


class LichBacSiController extends Controller
{
    public function index()
    {
        $lichbacsi = Lichbacsi::all();
        			

        return $lichbacsi->toJson();
    }
	
    public function store(Request $request)
    {
  if($request->ghichu=="")
  {
	  $ghichu="Nghỉ ốm";
  }
  else
  {
	  $ghichu=$request->ghichu;
  }
		$ngayArray = explode('T', $request->start);
          $lichbacsi = Lichbacsi::create([
            'idbacsi' => $request->idbacsi,
			'ngayoff' => $ngayArray[0]."T09:00:00.000Z",
            'ghichu' => $ghichu,
            'trangthai' => 1,
			
			
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $lichbacsi = Lichbacsi::find($id);
		if($request->ghichu=="")
  {
	  $ghichu="Nghỉ ốm";
  }
  else
  {
	  $ghichu=$request->ghichu;
  }
		$lichbacsi->ghichu = $ghichu;
		$lichbacsi->trangthai = 1;
        $lichbacsi->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $lichbacsi = Lichbacsi::find($id);
      $lichbacsi->delete();

      return response()->json('Successfully Deleted');
    }
    public function show($id)
    {
      $lichbacsi = Lichbacsi::where('idbacsi',$id)->get();
      return $lichbacsi;
    }
	public function lichnghibacsitheongay(Request $request,$id)
    {
	  $arrayNgay = explode("/", $request->ngay);
      $lichbacsi = Lichbacsi::where('idbacsi',$id)->where('ngayoff','LIKE','2022-'.$arrayNgay[1].'-'.$arrayNgay[0].'%')->get();
      return $lichbacsi;
    }
    public function chitietlichbacsi($id)
    {
      $lichbacsi = Lichbacsi::where('id',$id)->get();
      return $lichbacsi[0];
    }
}
