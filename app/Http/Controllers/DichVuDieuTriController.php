<?php

namespace App\Http\Controllers;
use App\Dichvu;
use Illuminate\Http\Request;

class DichVuDieuTriController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dichvu = Dichvu::all();
                            

        return $dichvu->toJson();
    }

     public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',

          ]);
  
          $dichvu = Dichvu::create([
            'ten' => $validatedData['ten'],
        
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $dichvu = Dichvu::find($id);
        $dichvu->ten = $request->get('ten');
     
        $dichvu->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $dichvu = Dichvu::find($id);
      $dichvu->delete();

      return response()->json('Successfully Deleted');
    }
    public function xemchitiet($id)
    {
      
  
      $dichvu = Dichvu::where('id',$id)->first();
      return $dichvu->toJson();

     
    }
    public function dichvutheonguoidung(Request $request)
    {   
        
        $array = explode(',', $request->get('dichvu'));
        $sanpham = Dichvu::select('id','ten')
             ->whereIn('id',$array)
             ->get();
        return $sanpham->toJson();
    }
}
