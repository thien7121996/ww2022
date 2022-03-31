<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quatrinhdieutri extends Model
{
    protected $table = 'quatrinhdieutri';
    protected $fillable = ['idkhachhang', 'ngaydieutri', 'rang', 'soluong', 'dieutridichvu', 'ghichu', 'idbacsi', 'congvieclabo', 'congvieccungcap', 'chiphi', 'giamgia', 'loaigiamgia', 'trangthai', 'idphieudieuchi'];
}
