<?php
  
namespace App\Imports;
  
use App\Khachhang;
use Maatwebsite\Excel\Concerns\ToModel;
  
class UsersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Khachhang([
            'hoten' => $row[0],
            'gioitinh' => 1,
            'ngaysinh' => $row[5],
            'diachi' => $row[6],
            'dienthoai' => $row[2],
            'tiensubenh' => [],
            'gioithieu' => "chưa có ghi chú",
            'khuvuc' => "Bình Dương",
            'dichvudieutri' => [],
            'nguongioithieu' => [],
            'anhdaidien' => "nonuser.jpg",
            'truocmatbefore' => "nonuser.jpg",
            'hamtrenbefore' => "nonuser.jpg",
            'hamduoibefore' => "nonuser.jpg",
            'truocmatafter' => "nonuser.jpg",
            'hamtrenafter' => "nonuser.jpg",
            'hamduoiafter' => "nonuser.jpg",
            'danhgia' => "Chưa có đánh giá",
            'sosao' => 0,
            'bacsidieutri' => 1,
            'trangthai' => 1,
            'chinhanh' => 1,
            'masale' => 0,
            'nguoncongty' => 0
        ]);
    }
}