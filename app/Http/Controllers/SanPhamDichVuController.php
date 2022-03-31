<?php

namespace App\Http\Controllers;
use App\Sanphamdichvu;
use Illuminate\Http\Request;

class SanPhamDichVuController extends Controller
{
    public function index()
    {
        $sanpham = Sanphamdichvu::all();
                            

        return $sanpham->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',
            'sotien' => 'required',
            'baohanh' => 'required',
            'donvitinh' => 'required',
            'idcha' => 'required'
         

          ]);
  
          $sanpham = Sanphamdichvu::create([
            'ten' => $validatedData['ten'],
            'sotien' => $validatedData['sotien'],
            'baohanh' => $validatedData['baohanh'],
            'donvitinh' => $validatedData['donvitinh'],
            'idcha' => $validatedData['idcha'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $sanpham = Sanphamdichvu::find($id);
        $sanpham->ten = $request->get('ten');
        $sanpham->sotien = $request->get('sotien');
        $sanpham->baohanh = $request->get('baohanh');
        $sanpham->donvitinh = $request->get('donvitinh');
        $sanpham->idcha = $request->get('idcha');
        $sanpham->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $sanpham = Sanphamdichvu::find($id);
      $sanpham->delete();

      return response()->json('Successfully Deleted');
    }
    public function sanphamdichvutheoid($id)
    {
      
      $sanpham = Sanphamdichvu::find($id);
      

      return $sanpham->toJson();
    }
    public function sanphamdichvutheonguoidung(Request $request)
    {   
        
        $array = explode(',', $request->get('sanphamdichvu'));
        $sanpham = Sanphamdichvu::select('id','ten')
             ->whereIn('id',$array)
             ->get();
        return $sanpham->toJson();
    }
}