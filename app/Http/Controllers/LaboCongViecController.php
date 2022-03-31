<?php

namespace App\Http\Controllers;
use App\Labocongviec;
use Illuminate\Http\Request;

class LaboCongViecController extends Controller
{
    public function index()
    {
        $labocongviec = Labocongviec::all();
                            

        return $labocongviec->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'tencongviec' => 'required',
            'idcongty' => 'required',
            'donvitinh' => 'required',
            'dongia' => 'required',
            'baohanh' => 'required',
            
          ]);
  
          $labocongviec = Labocongviec::create([
            'tencongviec' => $validatedData['tencongviec'],
            'idcongty' => $validatedData['idcongty'],
            'donvitinh' => $validatedData['donvitinh'],
            'dongia' => $validatedData['dongia'],
            'baohanh' => $validatedData['baohanh'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $labocongviec = Labocongviec::find($id);
        $labocongviec->tencongviec = $request->get('tencongviec');
        $labocongviec->idcongty = $request->get('idcongty');
        $labocongviec->donvitinh = $request->get('donvitinh');
        $labocongviec->dongia = $request->get('dongia');
        $labocongviec->baohanh = $request->get('baohanh');
        $labocongviec->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $labocongviec = Labocongviec::find($id);
      $labocongviec->delete();

      return response()->json('Successfully Deleted');
    }
    public function chitietlabocongviec($id)
    {
      $labocongty = Labocongviec::where('id',$id)->first();

      return $labocongty->toJson();
    }
}
