<?php

namespace App\Http\Controllers;
use App\Labocongty;
use Illuminate\Http\Request;

class LaboCongTyController extends Controller
{
    public function index()
    {
        $labocongty = Labocongty::all();
                            

        return $labocongty->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'ten' => 'required',
            'diachi' => 'required',
            'dienthoai' => 'required',
            'email' => 'required',

          ]);
  
          $labocongty = Labocongty::create([
            'ten' => $validatedData['ten'],
            'diachi' => $validatedData['diachi'],
            'dienthoai' => $validatedData['dienthoai'],
            'email' => $validatedData['email']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $labocongty = Labocongty::find($id);
        $labocongty->ten = $request->get('ten');
        $labocongty->diachi = $request->get('diachi');
        $labocongty->dienthoai = $request->get('dienthoai');
        $labocongty->email = $request->get('email');
        $labocongty->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $labocongty = Labocongty::find($id);
      $labocongty->delete();

      return response()->json('Successfully Deleted');
    }
    public function chitietlabocongty($id)
    {
      $labocongty = Labocongty::where('id',$id)->first();

      return $labocongty['ten'];
    }
}
