<?php

namespace App\Http\Controllers;
use App\Ketquadieutri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class KetQuaDieuTriController extends Controller
{
    public function index()
    {
        $ketquadieutri = Ketquadieutri::all();
                            

        return $ketquadieutri->toJson();
    }
    public function store(Request $request)
    {
         $validatedData = $request->validate([
            'idkhachhang' => 'required',
            'ngaylapkehoach' => 'required',
            'rang' => 'required',
            'soluong' => 'required',
            'dieutridichvu' => 'required',
            'ghichu' => 'required',
            'idbacsi' => 'required',
            'chiphi' => 'required',
            'giamgia' => 'required',
            'loaigiamgia' => 'required',
            'trangthai' => 'required',
            'idphieudieuchi' => 'required'
          ]);
  
          $ketquadieutri = Ketquadieutri::create([
            'idkhachhang' => $validatedData['idkhachhang'],
            'ngaylapkehoach' => $validatedData['ngaylapkehoach'],
            'rang' => $validatedData['rang'],
            'soluong' => $validatedData['soluong'],
            'dieutridichvu' => $validatedData['dieutridichvu'],
            'ghichu' => $validatedData['ghichu'],
            'idbacsi' => $validatedData['idbacsi'],
            'chiphi' => $validatedData['chiphi'],
            'giamgia' => $validatedData['giamgia'],
            'loaigiamgia' => $validatedData['loaigiamgia'],
            'trangthai' => $validatedData['trangthai'],
            'idphieudieuchi' => $validatedData['idphieudieuchi']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $ketquadieutri = Ketquadieutri::find($id);
        $ketquadieutri->idkhachhang = $request->get('idkhachhang');
        $ketquadieutri->ngaylapkehoach = $request->get('ngaylapkehoach');
        $ketquadieutri->rang = $request->get('rang');
        $ketquadieutri->soluong = $request->get('soluong');
        $ketquadieutri->dieutridichvu = $request->get('dieutridichvu');
        $ketquadieutri->ghichu = $request->get('ghichu');
        $ketquadieutri->idbacsi = $request->get('idbacsi');
        $ketquadieutri->chiphi = $request->get('chiphi');
        $ketquadieutri->giamgia = $request->get('giamgia');
        $ketquadieutri->loaigiamgia = $request->get('loaigiamgia');
        $ketquadieutri->trangthai = $request->get('trangthai');
        $ketquadieutri->idphieudieuchi = $request->get('idphieudieuchi');
        $ketquadieutri->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
        $ketquadieutri = Ketquadieutri::find($id);
        $ketquadieutri->delete();

      return response()->json('Successfully Deleted');
    }
    public function indexkhachhang($id){
        $ketquadieutri = DB::table('kehoachdieutri')->where("idphieudieuchi",'=',$id)->get();
        return $ketquadieutri->toJson();
    }
    public function indexketqua($id){
      $ketquadieutri = DB::table('kehoachdieutri')->where("id",'=',$id)->get();
      return $ketquadieutri->toJson();
  }
    public function loctheongay(Request $request)
    {
   
    }
    public function tinhtong()
    {
       
    }
}
