<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Loaiquangcao;
use Illuminate\Support\Facades\DB;
class LoaiQuangCaoController extends Controller
{
    public function getloaiquangcao()
    {
        $loaiquangcao = Loaiquangcao::all();
        return $loaiquangcao->toJson();
    }
    public function themloaiquangcao(Request $request)
    {
         $validatedData = $request->validate([
            'loaiquangcao' => 'required',
          ]);
  
          $loaiquangcao = Loaiquangcao::create([
            'loaiquangcao' => $validatedData['loaiquangcao'],
          ]);
     
      return response()->json('Project created!');
    }
    public function capnhatloaiquangcao(Request $request, $id)
    {
        $loaiquangcao = Loaiquangcao::find($id);
        $loaiquangcao->loaiquangcao = $request->get('loaiquangcao');
        $loaiquangcao->save();

        return response()->json('Successfully Updated');
    }
    public function xoaloaiquangcao($id)
    {
      
        $loaiquangcao = Loaiquangcao::find($id);
        $loaiquangcao->delete();

      return response()->json('Successfully Deleted');
    }
    public function getloaiquangcaotheoid($id){
        $loaiquangcao = Loaiquangcao::where("id",'=',$id)->get();
        return $loaiquangcao->toJson();
    }
}
