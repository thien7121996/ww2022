<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quangcao;
use Illuminate\Support\Facades\DB;
use App\Sanphamquangcao;
use App\Loaiquangcao;
class QuangcaoController extends Controller
{
    public function getquangcao()
    {
        $quangcao = Quangcao::join("danhmucquangcao","danhmucquangcao.id","=","quangcao.loaiquangcao")
        ->join("sanpham","sanpham.id","=","quangcao.sanphamquangcao")->select("quangcao.*",DB::raw('((click/hienthi)*100) AS soctr'),DB::raw('((1000*sotienchay)/hienthi) AS socpm'),DB::raw('(comment+tinnhan+chat+sodienthoai) AS sotuongtac'),"danhmucquangcao.loaiquangcao as tenloaiquangcao","sanpham.tensanpham as tensanphamquangcao")->get();
        return $quangcao->toJson();
    }
    public function themquangcao(Request $request)
    {
         $validatedData = $request->validate([
            'ngaychay' => 'required',
            'loaiquangcao' => 'required',
            'sanphamquangcao' => 'required',
          ]);
  
          $quangcao = Quangcao::create([
            'ngaychay' => date('Y-m-d', strtotime($request->ngaychay)),
            'sotienchay' => $request->sotienchay,
            'click' => $request->click,
            'hienthi' => $request->hienthi,
            'sochuyendoi' => 0,
            'ctr' => 0,
            'comment' => $request->comment,
            'tinnhan' => $request->tinnhan,
            'chat' => $request->chat,
            'tuongtac' => 0,
            'khachdatlich' => 0,
            'khachden' => 0,
            'khachlam' => 0,
            'loaiquangcao' => $request->loaiquangcao,
            'sanphamquangcao' => $request->sanphamquangcao,
            'trangthai' => 1,
          ]);
     
      return response()->json('Project created!');
    }
    public function capnhatquangcao(Request $request, $id)
    {
        $quangcao = Quangcao::find($id);
        if($request->get('ngaychay') !== NULL)
        {
          $quangcao->ngaychay = $request->get('ngaychay');
        }
        if($request->get('sotienchay') !== NULL)
        {
          $quangcao->sotienchay = $request->get('sotienchay');
        }
        if($request->get('click') !== NULL)
        {
          $quangcao->click = $request->get('click');
        }
        if($request->get('hienthi') !== NULL)
        {
          $quangcao->hienthi = $request->get('hienthi');
        }
        if($request->get('sochuyendoi') !== NULL)
        {
          $quangcao->sochuyendoi = $request->get('sochuyendoi');
        }
        if($request->get('loaiquangcao') !== NULL)
        {
          $quangcao->loaiquangcao = $request->get('loaiquangcao');
        }
        if($request->get('sanphamquangcao') !== NULL)
        {
          $quangcao->sanphamquangcao = $request->get('sanphamquangcao');
        }
        if($request->get('ctr') !== NULL)
        {
          $quangcao->ctr = $request->get('ctr');
        }
        if($request->get('comment') !== NULL)
        {
          $quangcao->comment = $request->get('comment');
        }
        if($request->get('tinnhan') !== NULL)
        {
          $quangcao->tinnhan = $request->get('tinnhan');
        }
        if($request->get('chat') !== NULL)
        {
          $quangcao->chat = $request->get('chat');
        }
        if($request->get('tuongtac') !== NULL)
        {
          $quangcao->tuongtac = $request->get('tuongtac');
        }
      
    
        $quangcao->save();

        return response()->json('Successfully Updated');
    }
    public function xoaquangcao($id)
    {
      
        $quangcao = Quangcao::find($id);
        $quangcao->delete();

      return response()->json('Successfully Deleted');
    }
    public function getquangcaotheoid($id){
        $quangcao = DB::table('quangcao')->where("id",'=',$id)->get();
        return $quangcao->toJson();
    }
    public function bieudochiphi(){
      
      $quangcao = DB::table('quangcao as w')
      ->select(array(DB::Raw('sum(w.sotienchay) as tongchiphi'),DB::Raw('sum(w.sodienthoai) as tongsodienthoai'),DB::Raw('sum(w.sochuyendoi) as sochuyendoi'),DB::Raw('DATE(w.ngaychay) as day'),DB::Raw('sum(w.comment) as socomment'),DB::Raw('sum(w.tinnhan) as sotinnhan'),DB::Raw('sum(w.sodienthoai) as sodienthoai'),DB::Raw('sum(w.chat) as sochat')))
      ->groupBy('day')
      ->orderBy('day')
      ->get();
      $thongkethanhtoan = DB::table('thanhtoankhachhang as w')
      ->select(array(DB::Raw('sum(w.tongtien) as tongtientrongngay'),DB::Raw('DATE(w.updated_at) as day')))
      ->groupBy('day')
      ->orderBy('day')
      ->get();
      $thongketong = [];
     
      
     
      foreach($quangcao as $qc)
      {
          foreach($thongkethanhtoan as $tk)
          {
            
            if(strcmp($tk->day, $qc->day) == 0)
            {
              $khachdatao= DB::table('khachhang')->where("created_at","like",$tk->day."%")->count();
              $khachdathen=DB::table('lichhen')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')->select( DB::raw('count(*) as trangthaikhachden, dieutritheolich.trangthai'),"lichhen.start")->where("lichhen.start","like",$tk->day)->where('dieutritheolich.trangthai',"=", "1")->orderBy('lichhen.start')->groupBy('dieutritheolich.trangthai')->groupBy('lichhen.start')->get();
              $khachdalam= DB::table('lichhen')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')->select( DB::raw('count(*) as trangthaikhachden, dieutritheolich.trangthai'),"lichhen.start")->where("lichhen.start","like",$tk->day)->where('dieutritheolich.trangthai',"=", "4")->orderBy('lichhen.start')->groupBy('dieutritheolich.trangthai')->groupBy('lichhen.start')->get();
              $khachdaden= DB::table('lichhen')->join('dieutritheolich', 'dieutritheolich.idlich', '=', 'lichhen.id')->select( DB::raw('count(*) as trangthaikhachden, dieutritheolich.trangthai'),"lichhen.start")->where("lichhen.start","like",$tk->day)->where('dieutritheolich.trangthai',"=", "3")->orderBy('lichhen.start')->groupBy('dieutritheolich.trangthai')->groupBy('lichhen.start')->get();
              if(!empty($khachdathen[0]))
              {
                  foreach($khachdathen as $llv)
                  {
                    $arrne["sokhachdathen"]=$llv->trangthaikhachden;
                  }
              }
              else
              {
                $arrne["sokhachdathen"]=0;
              }
              if(!empty($khachdalam[0]))
              {
                foreach($khachdalam as $kdl)
                {
                  $arrne["sokhachdalam"]=$kdl->trangthaikhachden;
                }
              }
              else
              {
                $arrne["sokhachdalam"]=0;
              }
              if(!empty($khachdaden[0]))
              {
                foreach($khachdaden as $kkd)
                {
                  $arrne["sokhachdaden"]=$kkd->trangthaikhachden;
                }
              }
              else
              {
                $arrne["sokhachdaden"]=0;
              }
              if($khachdatao!="")
              {
               
                  $arrne["khachdatao"]=$khachdatao;
              
              }
              else
              {
                $arrne["khachdatao"]=0;
              }
              $dayArray = explode('-', $qc->day);
              $arrne["day"]=$dayArray[2]."-".$dayArray[1]."-".$dayArray[0];
              $arrne["chiphi"]=$qc->tongchiphi;
              $arrne["doanhthu"]=$tk->tongtientrongngay;
              $arrne["sodienthoai"]=$qc->tongsodienthoai;
              $arrne["chuyendoi"]=$qc->socomment+$qc->sotinnhan+$qc->sochat+$qc->sodienthoai;
              array_push( $thongketong, $arrne);
              
            }
          }
      }
      return $thongketong;
  }
    
}
