<?php

namespace App\Http\Controllers;
use App\Chuongtrinhkhuyenmai;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ChuongTrinhKhuyenMaiController extends Controller
{
    public function index()
    {
        $chuongtrinh = Chuongtrinhkhuyenmai::all();
                            

        return $chuongtrinh->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'tenchuongtrinh' => 'required',
            'duocgiam' => 'required',
            'donvi' => 'required',
            'ngayapdung' => 'required',
            'denngay' => 'required',
            'nhomthanhvien' => 'required',

          ]);
  
          $chuongtrinh = Chuongtrinhkhuyenmai::create([
            'tenchuongtrinh' => $validatedData['tenchuongtrinh'],
            'duocgiam' => $validatedData['duocgiam'],
            'donvi' => $validatedData['donvi'],
            'ngayapdung' => $validatedData['ngayapdung'],
            'denngay' => $validatedData['denngay'],
            'nhomthanhvien' => $validatedData['nhomthanhvien'],
        
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $chuongtrinh = Chuongtrinhkhuyenmai::find($id);
        $chuongtrinh->tenchuongtrinh = $request->get('tenchuongtrinh');
        $chuongtrinh->duocgiam = $request->get('duocgiam');
        $chuongtrinh->donvi = $request->get('donvi');
        $chuongtrinh->ngayapdung = $request->get('ngayapdung');
        $chuongtrinh->denngay = $request->get('denngay');
        $chuongtrinh->nhomthanhvien = $request->get('nhomthanhvien');
        $chuongtrinh->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $chuongtrinh = Chuongtrinhkhuyenmai::find($id);
      $chuongtrinh->delete();

      return response()->json('Successfully Deleted');
    }
    public function show($id)
    {
      
      $chuongtrinh = Chuongtrinhkhuyenmai::find($id);
    

      return $chuongtrinh;
    }
}
