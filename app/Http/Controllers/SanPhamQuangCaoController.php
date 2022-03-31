<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sanphamquangcao;
use Illuminate\Support\Facades\DB;
class SanPhamQuangCaoController extends Controller
{
    public function getsanphamquangcao()
    {
        $sanphamquangcao = Sanphamquangcao::all();
        return $sanphamquangcao->toJson();
    }
    public function themsanphamquangcao(Request $request)
    {
         $validatedData = $request->validate([
            'tensanpham' => 'required',
          ]);
  
          $sanphamquangcao = Sanphamquangcao::create([
            'tensanpham' => $validatedData['tensanpham'],
          ]);
     
      return response()->json('Project created!');
    }
    public function capnhatsanphamquangcao(Request $request, $id)
    {
        $sanphamquangcao = Sanphamquangcao::find($id);
        $sanphamquangcao->tensanpham = $request->get('tensanpham');
        $sanphamquangcao->save();

        return response()->json('Successfully Updated');
    }
    public function xoasanphamquangcao($id)
    {
      
        $sanphamquangcao = Sanphamquangcao::find($id);
        $sanphamquangcao->delete();

      return response()->json('Successfully Deleted');
    }
    public function getsanphamquangcaotheoid($id){
        $sanphamquangcao = Sanphamquangcao::where("id",'=',$id)->get();
        return $sanphamquangcao->toJson();
    }
}
