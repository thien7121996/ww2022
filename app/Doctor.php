<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $table = 'doctor';
    protected $fillable = ['ten', 'ngaysinh', 'gioitinh', 'email', 'dienthoai', 'anhdaidien', 'mota'];

  
}
