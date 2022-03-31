<?php

namespace App\Http\Controllers;
use App\Nguongioithieu;
use Illuminate\Http\Request;

class NguonGioiThieuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nguongioithieu = Nguongioithieu::all();
                            

        return $nguongioithieu->toJson();
    }

     public function store(Request $request)
    {
  $validatedData = $request->validate([
            'nguon' => 'required',
            'phantram' => 'required',
          ]);
  
          $nguongioithieu = Nguongioithieu::create([
            'nguon' => $validatedData['nguon'],
            'phantram' => $validatedData['phantram'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $nguongioithieu = Nguongioithieu::find($id);
        $nguongioithieu->nguon = $request->get('nguon');
        $nguongioithieu->phantram = $request->get('phantram');
        $nguongioithieu->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $nguongioithieu = Nguongioithieu::find($id);
      $nguongioithieu->delete();

      return response()->json('Successfully Deleted');
    }
    public function xemchitiet($id)
    {
      
  
      $nguongioithieu = Nguongioithieu::where('id',$id)->first();
      return $nguongioithieu->toJson();

     
    }
}
