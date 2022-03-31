<?php

namespace App\Http\Controllers;
use App\Giaoviec;
use Illuminate\Http\Request;


class GiaoViecController extends Controller
{
    public function index()
    {
        $giaoviec = Giaoviec::all();
        for($i=0;$i<count($giaoviec);$i++)
		{
			$thoigianketthuc = $giaoviec[$i]["thoigianketthuc"];
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianketthuc); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime1 - $datetime2)/86400);
			if($giaoviec[$i]["trangthaihoanthanh"]==2)
			{
				$giaoviec[$i]["khoangcachngay"]=$days;
			}
			else
			{
				$giaoviec[$i]["khoangcachngay"]=404;
			}
			
		}			

        return $giaoviec->toJson();
    }
	public function danhsachviecgiao($id)
    {
        $giaoviec = Giaoviec::where('nguoigiao',$id)->get();
        for($i=0;$i<count($giaoviec);$i++)
		{
			$thoigianketthuc = $giaoviec[$i]["thoigianketthuc"];
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianketthuc); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime1 - $datetime2)/86400);
			if($giaoviec[$i]["trangthaihoanthanh"]==2)
			{
				$giaoviec[$i]["khoangcachngay"]=$days;
			}
			else
			{
				$giaoviec[$i]["khoangcachngay"]=404;
			}
			
		}			

        return $giaoviec->toJson();
    }
	public function danhsachviecnhan($id)
    {
        $giaoviec = Giaoviec::where('nguoinhan',$id)->get();
        for($i=0;$i<count($giaoviec);$i++)
		{
			$thoigianketthuc = $giaoviec[$i]["thoigianketthuc"];
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianketthuc); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime1 - $datetime2)/86400);
			if($giaoviec[$i]["trangthaihoanthanh"]==2)
			{
				$giaoviec[$i]["khoangcachngay"]=$days;
			}
			else
			{
				$giaoviec[$i]["khoangcachngay"]=404;
			}
			
		}			

        return $giaoviec->toJson();
    }
	public function danhsachviectheodoi($id)
    {
        $giaoviec = Giaoviec::where('theodoi',$id)->get();
        for($i=0;$i<count($giaoviec);$i++)
		{
			$thoigianketthuc = $giaoviec[$i]["thoigianketthuc"];
			$thoigianhientai = date('Y-m-d H:i:s');
			$datetime1 = strtotime($thoigianketthuc); // convert to timestamps
			$datetime2 = strtotime($thoigianhientai); // convert to timestamps
			$days = (int)(($datetime1 - $datetime2)/86400);
			if($giaoviec[$i]["trangthaihoanthanh"]==2)
			{
				$giaoviec[$i]["khoangcachngay"]=$days;
			}
			else
			{
				$giaoviec[$i]["khoangcachngay"]=404;
			}
			
		}			

        return $giaoviec->toJson();
    }
    public function store(Request $request)
    {
  
		
          $giaoviec = Giaoviec::create([
            'nguoigiao' => $request->nguoigiao,
            'nguoinhan' => $request->nguoinhan,
            'theodoi' => $request->theodoi,
            'congviec' => $request->congviec,
            'ghichugiao' => $request->ghichugiao,
            'linkcongviecgiao' => $request->linkcongviecgiao,
			'thoigiangiao' => date('Y-m-d', strtotime($request->thoigiangiao)),
            'thoigianketthuc' => date('Y-m-d', strtotime($request->thoigianketthuc)),
			'trangthaigiao' => $request->trangthaigiao,
			'trangthaihoanthanh' => $request->trangthaihoanthanh,
			'ketqua' => $request->ketqua,
			'linkcongviechoanthanh' => $request->linkcongviechoanthanh,
			'ghichuhoanthanh' => $request->ghichuhoanthanh,
			'thoigianhoanthanh' => $request->thoigianhoanthanh
			
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $giaoviec = Giaoviec::find($id);
		$giaoviec->nguoigiao = $request->nguoigiao;
        $giaoviec->nguoinhan = $request->nguoinhan;
        $giaoviec->theodoi = $request->theodoi;
        $giaoviec->congviec = $request->congviec;
        $giaoviec->ghichugiao = $request->ghichugiao;
        $giaoviec->linkcongviecgiao = $request->linkcongviecgiao;
		$giaoviec->thoigiangiao = date('Y-m-d', strtotime($request->thoigiangiao));
        $giaoviec->thoigianketthuc = date('Y-m-d', strtotime($request->thoigianketthuc));
		$giaoviec->trangthaigiao = $request->trangthaigiao;
		$giaoviec->trangthaihoanthanh = $request->trangthaihoanthanh;
		$giaoviec->ketqua = $request->ketqua;
		$giaoviec->linkcongviechoanthanh = $request->linkcongviechoanthanh;
		$giaoviec->ghichuhoanthanh = $request->ghichuhoanthanh;
		$giaoviec->thoigianhoanthanh = $request->thoigianhoanthanh;
        $giaoviec->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $giaoviec = Giaoviec::find($id);
      $giaoviec->delete();

      return response()->json('Successfully Deleted');
    }
    public function show($id)
    {
      $giaoviec = Giaoviec::find($id);
      return $giaoviec->toJson();
    }
    
}
