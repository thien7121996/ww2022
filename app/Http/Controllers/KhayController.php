<?php

namespace App\Http\Controllers;
use App\Khay;
use Illuminate\Http\Request;


class KhayController extends Controller
{
    public function index()
    {
        $khay = Khay::all();
        			

        return $khay->toJson();
    }
	
    public function store(Request $request)
    {
  
		
          $khay = Khay::create([
            'sokhay' => $request->sokhay,
			'chinhanh' => $request->chinhanh,
            'ngayyeucau' => date('Y-m-d', strtotime($request->ngayyeucau)),
            'ngaynhan' => date('Y-m-d', strtotime($request->ngaynhan)),
			'ngaygiao' => date('Y-m-d', strtotime($request->ngaygiao)),
			'khachhang' => $request->khachhang,
			'bacsi' => $request->bacsi,
			'ghichu' => $request->ghichu,
			'trangthai' => $request->trangthai
			
			
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $khay = Khay::find($id);
		$khay->sokhay = $request->sokhay;
		$khay->chinhanh = $request->chinhanh;
        $khay->ngayyeucau = date('Y-m-d', strtotime($request->ngayyeucau));
        $khay->ngaynhan = date('Y-m-d', strtotime($request->ngaynhan));
        $khay->ngaygiao = date('Y-m-d', strtotime($request->ngaygiao));
        $khay->khachhang = $request->khachhang;
        $khay->bacsi = $request->bacsi;
		$khay->ghichu = $request->ghichu;
		$khay->trangthai = $request->trangthai;
        $khay->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $khay = Khay::find($id);
      $khay->delete();

      return response()->json('Successfully Deleted');
    }
    public function show($id)
    {
      $khay = Khay::find($id);
      return $khay->toJson();
    }
     public function danhsachkhaytheokhachhang($id)
    {
      $khay = Khay::with('khachhangs')->with('chinhanhs')->with('bacsis')->where('khachhang',$id)->get();
      return $khay->toJson();
    }
}
