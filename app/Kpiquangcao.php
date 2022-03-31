<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kpiquangcao extends Model
{
    protected $table = 'kpiquangcao';
    protected $fillable = ['chiphimarketing','chuyendoi','sodienthoai','khachdatlich','khachden','khachlam','doanhthu','thucnhan'];
}
