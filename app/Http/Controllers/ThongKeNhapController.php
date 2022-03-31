<?php

namespace App\Http\Controllers;
use App\Thongkenhap;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ThongKeNhapController extends Controller
{
    public function index()
    {
        $thongkenhap = Thongkenhap::all();
                            

        return $thongkenhap->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
        'ngay' => 'required',
        'hen' => 'required',
        'giao' => 'required',
        'tendungcu' => 'required',
        'congty' => 'required',
        'sl' => 'required',
        'dongia' => 'required',
        'phikhac' => 'required',
        'ghichuphikhac' => 'required',
        'tongcong' => 'required',
        'datra' => 'required',
        'ghichu' => 'required'
    
          ]);
  
          $thongkenhap = Thongkenhap::create([
            'ngay' => $validatedData['ngay'],
            'hen' => $validatedData['hen'],
            'giao' => $validatedData['giao'],
            'tendungcu' => $validatedData['tendungcu'],
            'congty' => $validatedData['congty'],
            'sl' => $validatedData['sl'],
            'dongia' => $validatedData['dongia'],
            'phikhac' => $validatedData['phikhac'],
            'ghichuphikhac' => $validatedData['ghichuphikhac'],
            'tongcong' => $validatedData['tongcong'],
            'datra' => $validatedData['datra'],
            'ghichu' => $validatedData['ghichu'],
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $thongkenhap = Thongkenhap::find($id);
        $thongkenhap->ngay = $request->get('ngay');
        $thongkenhap->hen = $request->get('hen');
        $thongkenhap->giao = $request->get('giao');
        $thongkenhap->tendungcu = $request->get('tendungcu');
        $thongkenhap->congty = $request->get('congty');
        $thongkenhap->sl = $request->get('sl');
        $thongkenhap->dongia = $request->get('dongia');
        $thongkenhap->phikhac = $request->get('phikhac');
        $thongkenhap->ghichuphikhac = $request->get('ghichuphikhac');
        $thongkenhap->tongcong = $request->get('tongcong');
        $thongkenhap->datra = $request->get('datra');
        $thongkenhap->ghichu = $request->get('ghichu');
        $thongkenhap->save();

        return response()->json('Successfully Updated');
    }
    public function destroy($id)
    {
      
      $thongkenhap = Thongkenhap::find($id);
      $thongkenhap->delete();

      return response()->json('Successfully Deleted');
    }
    public function loctheongay(Request $request)
    {
    $datestart=$request->get('ngayhen');
    $dateend=$request->get('ngaygiao');
    $thongkenhap = DB::table('thongkenhap')->where('hen', '>=', $datestart)
                     ->where('giao', '<=',$dateend)
                     ->get();
    return $thongkenhap->toJson();
    }
    public function locdungcu(Request $request)
    {
    $giatridungcu=$request->get('giatridungcu');
    
    $thongkenhap = DB::table('thongkenhap')->where('tendungcu', 'LIKE', $giatridungcu)->get();
    return $thongkenhap->toJson();
    }
    public function tongcong()
    {

      $thongkenhap = DB::table('thongkenhap')->sum('tongcong');
    return $thongkenhap;
    }
    public function datra()
    {

      $thongkenhap = DB::table('thongkenhap')->sum('datra');
    return $thongkenhap;
    }
    public function conlai()
    {

      $thongkenhap = DB::table('thongkenhap')->select(DB::raw('(SUM(tongcong)) - (SUM(datra)) as conlai'))->get();
    return $thongkenhap;
    }
    public function show($id)
    {
      $thongkenhap = Thongkenhap::find($id);

      return $thongkenhap->toJson();
    }
}
