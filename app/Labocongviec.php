<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Labocongviec extends Model
{
    protected $table = 'labocongviec';
    protected $fillable = ['tencongviec','idcongty','donvitinh','dongia','baohanh'];
}
