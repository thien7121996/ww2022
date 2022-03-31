<?php

namespace App\Http\Controllers;
use App\Chandoancacloai;
use Illuminate\Http\Request;

class ChanDoanCacLoaiController extends Controller
{
    public function index()
    {
        $chandoan = Chandoancacloai::all();
                            

        return $chandoan->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',

          ]);
  
          $chandoan = Chandoancacloai::create([
            'ten' => $validatedData['ten'],
        
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $chandoan = Chandoancacloai::find($id);
        $chandoan->ten = $request->get('ten');
     
        $chandoan->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $chandoan = Chandoancacloai::find($id);
      $chandoan->delete();

      return response()->json('Successfully Deleted');
    }
   
}
