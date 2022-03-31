<?php

namespace App\Http\Controllers;
use App\Dungcuvatlieu;
use Illuminate\Http\Request;

class DungCuVatLieuController extends Controller
{
    public function index()
    {
        $dungcu = Dungcuvatlieu::all();
                            

        return $dungcu->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',
            'dongia' => 'required',
         

          ]);
  
          $dungcu = Dungcuvatlieu::create([
            'ten' => $validatedData['ten'],
            'dongia' => $validatedData['dongia'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $dungcu = Dungcuvatlieu::find($id);
        $dungcu->ten = $request->get('ten');
        $dungcu->dongia = $request->get('dongia');
        $dungcu->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $dungcu = Dungcuvatlieu::find($id);
      $dungcu->delete();

      return response()->json('Successfully Deleted');
    }
}
