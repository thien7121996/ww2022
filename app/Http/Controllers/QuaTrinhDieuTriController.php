<?php

namespace App\Http\Controllers;
use App\Quatrinhdieutri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuaTrinhDieuTriController extends Controller
{
    public function index()
    {
        $quatrinhdieutri = Quatrinhdieutri::all();
                            

        return $quatrinhdieutri->toJson();
    }
    public function store(Request $request)
    {
         $validatedData = $request->validate([
            'idkhachhang' => 'required',
            'ngaydieutri' => 'required',
            'rang' => 'required',
            'soluong' => 'required',
            'dieutridichvu' => 'required',
            'ghichu' => 'required',
            'idbacsi' => 'required',
            'congvieclabo' =>'required',
            'congvieccungcap' => 'required',
            'chiphi' => 'required',
            'giamgia' => 'required',
            'loaigiamgia' => 'required',
            'trangthai' => 'required',
            'idphieudieuchi' => 'required'
          ]);
  
          $quatrinhdieutri = Quatrinhdieutri::create([
            'idkhachhang' => $validatedData['idkhachhang'],
            'ngaydieutri' => $validatedData['ngaydieutri'],
            'rang' => $validatedData['rang'],
            'soluong' => $validatedData['soluong'],
            'dieutridichvu' => $validatedData['dieutridichvu'],
            'ghichu' => $validatedData['ghichu'],
            'idbacsi' => $validatedData['idbacsi'],
            'congvieclabo' => $validatedData['congvieclabo'],
            'congvieccungcap' => $validatedData['congvieccungcap'],
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
        $quatrinhdieutri = Quatrinhdieutri::find($id);
        $quatrinhdieutri->idkhachhang = $request->get('idkhachhang');
        $quatrinhdieutri->ngaylapkehoach = $request->get('ngaylapkehoach');
        $quatrinhdieutri->rang = $request->get('rang');
        $quatrinhdieutri->soluong = $request->get('soluong');
        $quatrinhdieutri->dieutridichvu = $request->get('dieutridichvu');
        $quatrinhdieutri->ghichu = $request->get('ghichu');
        $quatrinhdieutri->idbacsi = $request->get('idbacsi');
        $quatrinhdieutri->congvieclabo = $request->get('congvieclabo');
        $quatrinhdieutri->congvieccungcap = $request->get('congvieccungcap');
        $quatrinhdieutri->chiphi = $request->get('chiphi');
        $quatrinhdieutri->giamgia = $request->get('giamgia');
        $quatrinhdieutri->loaigiamgia = $request->get('loaigiamgia');
        $quatrinhdieutri->trangthai = $request->get('trangthai');
        $quatrinhdieutri->idphieudieuchi = $request->get('idphieudieuchi');
        $quatrinhdieutri->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
        $quatrinhdieutri = Quatrinhdieutri::find($id);
        $quatrinhdieutri->delete();

      return response()->json('Successfully Deleted');
    }
    public function indexkhachhang($id){
        $quatrinhdieutri = DB::table('quatrinhdieutri')->where("idphieudieuchi",'=',$id)->get();
        return $quatrinhdieutri->toJson();
    }
   
   
       
}
