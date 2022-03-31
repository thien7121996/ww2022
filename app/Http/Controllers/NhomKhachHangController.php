<?php

namespace App\Http\Controllers;
use App\Nhomkhachhang;
use Illuminate\Http\Request;

class NhomKhachHangController extends Controller
{
    public function index()
    {
        $nhomkhachhang = Nhomkhachhang::all();
                            

        return $nhomkhachhang->toJson();
    }
	 public function store(Request $request)
    {
  $validatedData = $request->validate([
            'nhomnguoi' => 'required',
          ]);
  
          $nhomkhachhang = Nhomkhachhang::create([
            'nhomnguoi' => $validatedData['nhomnguoi'],
        
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $nhomkhachhang = Nhomkhachhang::find($id);
        $nhomkhachhang->nhomnguoi = $request->get('nhomnguoi');
     
        $nhomkhachhang->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $nhomkhachhang = Nhomkhachhang::find($id);
      $nhomkhachhang->delete();

      return response()->json('Successfully Deleted');
    }
    public function tennhomkhachhang($id)
    {
      $nhomkhachhang = Nhomkhachhang::where('id',$id)->first();

      return  $nhomkhachhang['nhomnguoi'];
    }
}
