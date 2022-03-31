<?php

namespace App\Http\Controllers;
use App\Thuocduocpham;
use Illuminate\Http\Request;

class ThuocDuocPhamController extends Controller
{
    public function index()
    {
        $thuoc = Thuocduocpham::all();
                            

        return $thuoc->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',
            'lieuluong' => 'required',
            'huongdansudung' => 'required',
            'dongia' => 'required'
         

          ]);
  
          $thuoc = Thuocduocpham::create([
            'ten' => $validatedData['ten'],
            'lieuluong' => $validatedData['lieuluong'],
            'huongdansudung' => $validatedData['huongdansudung'],
            'dongia' => $validatedData['dongia'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $thuoc = Thuocduocpham::find($id);
        $thuoc->ten = $request->get('ten');
        $thuoc->lieuluong = $request->get('lieuluong');
        $thuoc->huongdansudung = $request->get('huongdansudung');
        $thuoc->dongia = $request->get('dongia');
        $thuoc->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $thuoc = Thuocduocpham::find($id);
      $thuoc->delete();

      return response()->json('Successfully Deleted');
    }
   
    public function gettenthuoc($id)
    {
      $thuoc = Thuocduocpham::find($id);
      $tenthuoc = $thuoc->ten;
      return $tenthuoc;
    }

}
