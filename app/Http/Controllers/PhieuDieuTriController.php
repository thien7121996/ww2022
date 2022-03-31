<?php

namespace App\Http\Controllers;
use App\Phieudieutri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PhieuDieuTriController extends Controller
{
    public function index()
    {
        $phieudieutri = Phieudieutri::all();
                            

        return $phieudieutri->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'idkhachhang' => 'required',
        'ngaylapphieu' => 'required',
        'chandoan' => 'required',
        'trangthai' => 'required'
          ]);
  
          $phieudieutri = Phieudieutri::create([
            'idkhachhang' => $validatedData['idkhachhang'],
            'ngaylapphieu' => $validatedData['ngaylapphieu'],
            'chandoan' => $validatedData['chandoan'],
            'trangthai' => $validatedData['trangthai']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $phieudieutri = Phieudieutri::find($id);
        $phieudieutri->idkhachhang = $request->get('idkhachhang');
        $phieudieutri->ngaylapphieu = $request->get('ngaylapphieu');
        $phieudieutri->chandoan = $request->get('chandoan');
        $phieudieutri->trangthai = $request->get('trangthai');
        $phieudieutri->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $phieudieutri = Phieudieutri::find($id);
      $phieudieutri->delete();

      return response()->json('Successfully Deleted');
    }
    public function indexkhachhang($id){
      $phieudieutri = DB::table('phieudieutri')->where("idkhachhang",'=',$id)->get();
      return $phieudieutri->toJson();
  }
  public function show($id){
    $phieudieutri = DB::table('phieudieutri')->where("id",'=',$id)->get();
    return $phieudieutri->toJson();
}

public function indexphieutheolich($id)
{
  $phieudieutri = DB::table('phieudieutri')->where("ngaylapphieu",'=',$id)->get();
    return $phieudieutri->toJson();
}

    
}
