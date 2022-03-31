<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chinhanh;
use Illuminate\Support\Facades\DB;

class ChiNhanhController extends Controller
{
    public function getchinhanh()
    {
        $chinhanh = Chinhanh::all();
        return $chinhanh->toJson();
    }
    public function themchinhanh(Request $request)
    {
         $validatedData = $request->validate([
            'tenchinhanh' => 'required',
            'diachi' => 'required'
          ]);
  
          $chinhanh = Chinhanh::create([
            'tenchinhanh' => $request->tenchinhanh,
            'diachi' => $request->diachi
            
          ]);
        
      return response()->json('Project created!');
    }
    public function capnhatchinhanh(Request $request, $id)
    {
     
        $chinhanh = Chinhanh::find($id);
        if($request->get('tenchinhanh') !== NULL)
        {
          $chinhanh->tenchinhanh = $request->get('tenchinhanh');
        }
        if($request->get('diachi') !== NULL)
        {
          $chinhanh->diachi = $request->get('diachi');
        }
       
      
    
        $chinhanh->save();
        
        return response()->json('Successfully Updated');
    }
    public function xoachinhanh($id)
    {
      
        $chinhanh = Chinhanh::find($id);
        $chinhanh->delete();

      return response()->json('Successfully Deleted');
    }
    public function getchinhanhtheoid($id){
      $chinhanh = DB::table('chinhanh')->where("id",'=',$id)->get();
      return $chinhanh->toJson();
  }

    
}
