<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kpiquangcao;
class KPIQuangCaoController extends Controller
{
    public function index()
    {
        $kpiquangcao = Kpiquangcao::all();
                            

        return $kpiquangcao->toJson();
    }
    public function store(Request $request)
    {
  $validatedData = $request->validate([
            'chiphimarketing' => 'required',
            'chuyendoi' => 'required',
            'sodienthoai' => 'required',
            'khachdatlich' => 'required',
            'khachden' => 'required',
            'khachlam' => 'required',
            'doanhthu' => 'required',
            'thucnhan' => 'required',
          ]);
  
          $kpiquangcao = Kpiquangcao::create([
            'chiphimarketing' => $validatedData['chiphimarketing'],
            'chuyendoi' => $validatedData['chuyendoi'],
            'sodienthoai' => $validatedData['sodienthoai'],
            'khachdatlich' => $validatedData['khachdatlich'],
            'khachden' => $validatedData['khachden'],
            'khachlam' => $validatedData['khachlam'],
            'doanhthu' => $validatedData['doanhthu'],
            'thucnhan' => $validatedData['thucnhan']
          ]);
     
      return response()->json('Project created!');
    }
    public function update(Request $request, $id)
    {
        $kpiquangcao = Kpiquangcao::find($id);
        $kpiquangcao->chiphimarketing = $request->get('chiphimarketing');
        $kpiquangcao->chuyendoi = $request->get('chuyendoi');
        $kpiquangcao->sodienthoai = $request->get('sodienthoai');
        $kpiquangcao->khachdatlich = $request->get('khachdatlich');
        $kpiquangcao->khachden = $request->get('khachden');
        $kpiquangcao->khachlam = $request->get('khachlam');
        $kpiquangcao->doanhthu = $request->get('doanhthu');
        $kpiquangcao->thucnhan = $request->get('thucnhan');
        $kpiquangcao->save();

        return response()->json('Successfully Updated');
    }
}
