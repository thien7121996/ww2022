<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chuongtrinhkhuyenmai extends Model
{
    protected $table = 'chuongtrinhkhuyenmai';
    protected $fillable = ['tenchuongtrinh', 'duocgiam', 'donvi', 'ngayapdung', 'denngay', 'nhomthanhvien'];
}
